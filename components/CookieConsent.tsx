"use client";

import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import { cookieConsentConfig } from '@/lib/consent-config';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import '@/app/cookie-consent.css';

/**
 * Cookie Consent Banner Component
 * 
 * This component initializes the GDPR-compliant cookie consent banner.
 * It must be used in a client component because it requires browser APIs.
 */
export default function CookieConsentBanner() {
  useEffect(() => {
    // Initialize cookie consent
    CookieConsent.run(cookieConsentConfig);

    // Cleanup on unmount
    return () => {
      // vanilla-cookieconsent doesn't provide a cleanup method
      // but the library handles its own cleanup internally
    };
  }, []);

  return null; // This component doesn't render anything visible
}

/**
 * Helper function to check if user has accepted a specific cookie category
 */
export function hasConsent(category: 'necessary' | 'analytics'): boolean {
  if (typeof window === 'undefined') return false;
  
  const cookie = CookieConsent.getCookie();
  return cookie?.categories?.includes(category) || false;
}

/**
 * Helper function to show the preferences modal programmatically
 */
export function showPreferences(): void {
  if (typeof window !== 'undefined') {
    CookieConsent.showPreferences();
  }
}
