import { NextRequest, NextResponse } from 'next/server';
import { isEUVisitor, getCountryCode, EU_EEA_COUNTRIES } from '@/lib/geolocation';

/**
 * Debug endpoint to check geolocation headers
 * Visit: https://yourdomain.com/api/geo-debug
 */
export async function GET(request: NextRequest) {
  const headers = request.headers;
  
  // Collect all headers that might contain geo info
  const geoHeaders = {
    'cf-ipcountry': headers.get('cf-ipcountry'),
    'x-vercel-ip-country': headers.get('x-vercel-ip-country'),
    'cloudfront-viewer-country': headers.get('cloudfront-viewer-country'),
    'x-country-code': headers.get('x-country-code'),
    'x-forwarded-for': headers.get('x-forwarded-for'),
    'x-real-ip': headers.get('x-real-ip'),
    'true-client-ip': headers.get('true-client-ip'),
  };
  
  // Get all headers for complete debugging
  const allHeaders: Record<string, string> = {};
  headers.forEach((value, key) => {
    allHeaders[key] = value;
  });
  
  const countryCode = getCountryCode(headers);
  const isEU = await isEUVisitor(headers);
  
  return NextResponse.json({
    geolocation: {
      detectedCountry: countryCode,
      isEUVisitor: isEU,
      showCookieBanner: isEU,
    },
    geoHeaders,
    totalHeaderCount: Object.keys(allHeaders).length,
    allHeaders,
    euCountries: Array.from(EU_EEA_COUNTRIES).sort(),
  }, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
