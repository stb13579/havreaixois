/**
 * Geolocation utilities for determining visitor location
 * Used for GDPR compliance - only show cookie consent to EU/EEA visitors
 */

// List of EU/EEA country codes that require GDPR cookie consent
// EU27 + EEA (Iceland, Liechtenstein, Norway) + UK (still following GDPR)
export const EU_EEA_COUNTRIES = new Set([
  // EU Member States
  'AT', // Austria
  'BE', // Belgium
  'BG', // Bulgaria
  'HR', // Croatia
  'CY', // Cyprus
  'CZ', // Czech Republic
  'DK', // Denmark
  'EE', // Estonia
  'FI', // Finland
  'FR', // France
  'DE', // Germany
  'GR', // Greece
  'HU', // Hungary
  'IE', // Ireland
  'IT', // Italy
  'LV', // Latvia
  'LT', // Lithuania
  'LU', // Luxembourg
  'MT', // Malta
  'NL', // Netherlands
  'PL', // Poland
  'PT', // Portugal
  'RO', // Romania
  'SK', // Slovakia
  'SI', // Slovenia
  'ES', // Spain
  'SE', // Sweden
  
  // EEA (non-EU)
  'IS', // Iceland
  'LI', // Liechtenstein
  'NO', // Norway
  
  // UK (still following GDPR via UK GDPR)
  'GB', // United Kingdom
]);

/**
 * Gets the visitor's IP address from request headers
 */
function getIPAddress(headers: Headers): string | null {
  // Railway edge might add the real client IP at the end of x-forwarded-for chain
  const forwardedFor = headers.get('x-forwarded-for');
  
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    // Use the first IP (original client) not the last (proxy)
    const clientIP = ips[0];
    console.log(`[Geofencing] x-forwarded-for chain: ${forwardedFor} → using: ${clientIP}`);
    return clientIP;
  }
  
  // Fallback to other headers
  const ip = 
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') ||
    null;
  
  console.log(`[Geofencing] IP from headers: ${ip}`);
  return ip;
}

/**
 * Fetches country code from IP using ip-api.com (free tier: 45 requests/minute, no daily limit)
 * Falls back to ipapi.co if needed (free tier: 30,000 requests/month but easier to hit limits)
 */
async function getCountryFromIP(ip: string): Promise<string | null> {
  try {
    // Try ip-api.com first (no daily limit, just rate limit)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
      signal: AbortSignal.timeout(3000), // 3 second timeout
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.countryCode) {
        console.log(`[Geofencing] ip-api.com: ${ip} → ${data.countryCode}`);
        return data.countryCode;
      }
    }
    
    // Fallback to ipapi.co
    const fallbackResponse = await fetch(`https://ipapi.co/${ip}/country/`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(3000),
    });
    
    if (fallbackResponse.ok) {
      const country = await fallbackResponse.text();
      const countryCode = country.trim();
      if (countryCode && countryCode.length === 2) {
        console.log(`[Geofencing] ipapi.co: ${ip} → ${countryCode}`);
        return countryCode;
      }
    }
    
    console.warn(`[Geofencing] Both APIs failed for IP: ${ip}`);
    return null;
  } catch (error) {
    console.error('[Geofencing] Error fetching country from IP:', error);
    return null;
  }
}

/**
 * Determines if a visitor is from an EU/EEA country requiring GDPR consent
 * 
 * Since Railway doesn't provide geolocation headers, we use the visitor's IP
 * to determine their country via a free geolocation API.
 * 
 * @param headers - Next.js headers object or Web Headers
 * @returns Promise<boolean> - true if visitor is from EU/EEA, false otherwise
 */
export async function isEUVisitor(headers: Headers): Promise<boolean> {
  // First try header-based country detection (in case Railway adds it in the future)
  const headerCountry = 
    headers.get('cf-ipcountry') || 
    headers.get('x-vercel-ip-country') ||
    headers.get('cloudfront-viewer-country') ||
    headers.get('x-country-code');
  
  if (headerCountry) {
    const isEU = EU_EEA_COUNTRIES.has(headerCountry.toUpperCase());
    console.log(`[Geofencing] Header-based: ${headerCountry.toUpperCase()} - ${isEU ? 'EU' : 'Non-EU'}`);
    return isEU;
  }
  
  // Get IP address from headers
  const ip = getIPAddress(headers);
  
  if (!ip) {
    console.warn('[Geofencing] No IP detected - defaulting to showing cookie banner');
    return true; // Default to showing banner for safety
  }
  
  // Skip geolocation for localhost/private IPs
  if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip === '::1') {
    console.log('[Geofencing] Localhost detected - showing cookie banner for testing');
    return true;
  }
  
  // Fetch country from IP
  const countryCode = await getCountryFromIP(ip);
  
  if (!countryCode) {
    console.warn('[Geofencing] Could not determine country - defaulting to showing cookie banner');
    return true; // Default to showing banner for safety
  }
  
  // Check if country code is in EU/EEA list
  const isEU = EU_EEA_COUNTRIES.has(countryCode.toUpperCase());
  
  // Log for monitoring
  console.log(`[Geofencing] IP ${ip} → ${countryCode.toUpperCase()} - ${isEU ? 'EU (show banner)' : 'Non-EU (skip banner)'}`);
  
  return isEU;
}

/**
 * Gets the visitor's country code from request headers
 * Useful for debugging and analytics
 * 
 * @param headers - Next.js headers object or Web Headers
 * @returns ISO 3166-1 alpha-2 country code or null
 */
export function getCountryCode(headers: Headers): string | null {
  const countryCode = 
    headers.get('cf-ipcountry') || 
    headers.get('x-vercel-ip-country') ||
    headers.get('cloudfront-viewer-country') ||
    headers.get('x-country-code');
  
  return countryCode ? countryCode.toUpperCase() : null;
}
