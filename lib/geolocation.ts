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
 * Determines if a visitor is from an EU/EEA country requiring GDPR consent
 * 
 * Railway provides geolocation through various possible headers depending on setup:
 * - CF-IPCountry (if using Cloudflare)
 * - X-Vercel-IP-Country (if using Vercel)
 * - CloudFront-Viewer-Country (if using AWS CloudFront)
 * 
 * @param headers - Next.js headers object or Web Headers
 * @returns true if visitor is from EU/EEA, false otherwise (defaults to false for safety)
 */
export function isEUVisitor(headers: Headers): boolean {
  // Try multiple possible header names
  const countryCode = 
    headers.get('cf-ipcountry') || 
    headers.get('x-vercel-ip-country') ||
    headers.get('cloudfront-viewer-country') ||
    headers.get('x-country-code');
  
  // Debug logging to verify geolocation is working
  if (process.env.NODE_ENV === 'development' || process.env.ENABLE_GEO_DEBUG === 'true') {
    console.log('[Geofencing Debug]', {
      countryCode,
      isEU: countryCode ? EU_EEA_COUNTRIES.has(countryCode.toUpperCase()) : 'unknown',
      availableHeaders: {
        'cf-ipcountry': headers.get('cf-ipcountry'),
        'x-vercel-ip-country': headers.get('x-vercel-ip-country'),
        'cloudfront-viewer-country': headers.get('cloudfront-viewer-country'),
        'x-country-code': headers.get('x-country-code'),
        'x-forwarded-for': headers.get('x-forwarded-for'),
      }
    });
  }
  
  if (!countryCode) {
    // If we can't determine location, show banner for safety (be GDPR compliant by default)
    console.warn('[Geofencing] No country code detected - defaulting to showing cookie banner');
    return true;
  }
  
  // Check if country code is in EU/EEA list
  const isEU = EU_EEA_COUNTRIES.has(countryCode.toUpperCase());
  
  // Log in production for monitoring (can be viewed in Railway logs)
  console.log(`[Geofencing] Visitor from ${countryCode.toUpperCase()} - ${isEU ? 'EU (show banner)' : 'Non-EU (skip banner)'}`);
  
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
