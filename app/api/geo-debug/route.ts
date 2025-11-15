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
  
  // Extract IP to test API directly
  const ip = headers.get('x-real-ip') || headers.get('x-forwarded-for')?.split(',')[0].trim();
  
  // Test API calls directly
  let apiTest = {
    ip,
    ipapiResult: null as any,
    ipApiResult: null as any,
  };
  
  if (ip) {
    try {
      // Test ipapi.co
      const ipapiResponse = await fetch(`https://ipapi.co/${ip}/json/`, {
        signal: AbortSignal.timeout(3000),
      });
      apiTest.ipapiResult = {
        status: ipapiResponse.status,
        ok: ipapiResponse.ok,
        data: ipapiResponse.ok ? await ipapiResponse.json() : await ipapiResponse.text(),
      };
    } catch (e: any) {
      apiTest.ipapiResult = { error: e.message };
    }
    
    try {
      // Test ip-api.com
      const ipApiResponse = await fetch(`http://ip-api.com/json/${ip}`, {
        signal: AbortSignal.timeout(3000),
      });
      apiTest.ipApiResult = {
        status: ipApiResponse.status,
        ok: ipApiResponse.ok,
        data: ipApiResponse.ok ? await ipApiResponse.json() : await ipApiResponse.text(),
      };
    } catch (e: any) {
      apiTest.ipApiResult = { error: e.message };
    }
  }
  
  const countryCode = getCountryCode(headers);
  const isEU = await isEUVisitor(headers);
  
  return NextResponse.json({
    geolocation: {
      detectedCountry: countryCode,
      isEUVisitor: isEU,
      showCookieBanner: isEU,
    },
    apiTest,
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
