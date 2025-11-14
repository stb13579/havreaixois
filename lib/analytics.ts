// Google Analytics 4 Event Tracking Utilities
// ============================================
// Use these functions to track user interactions with booking CTAs
// All tracking respects GDPR cookie consent preferences

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

/**
 * Check if analytics tracking is allowed based on cookie consent
 * For non-EU visitors (no banner shown), analytics is always allowed
 */
function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check if vanilla-cookieconsent cookie exists and has analytics consent
  try {
    const cookieName = 'cc_cookie';
    const cookies = document.cookie.split(';');
    const consentCookie = cookies.find(c => c.trim().startsWith(`${cookieName}=`));
    
    if (!consentCookie) {
      // No consent cookie means either:
      // 1. EU visitor who hasn't made a choice yet (return false - wait for consent)
      // 2. Non-EU visitor who never saw the banner (return true - track automatically)
      // We can check if gtag scripts are loaded with type="text/javascript" (non-EU)
      const gtagScript = document.getElementById('google-analytics');
      const isNonEU = gtagScript?.getAttribute('type') === 'text/javascript';
      return isNonEU;
    }
    
    const cookieValue = consentCookie.split('=')[1];
    const decoded = decodeURIComponent(cookieValue);
    const consentData = JSON.parse(decoded);
    
    return consentData?.categories?.includes('analytics') || false;
  } catch (e) {
    return false;
  }
}

/**
 * Track when a user clicks a booking platform link
 */
export const trackBookingClick = (platform: 'airbnb' | 'vrbo' | 'direct') => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('event', 'click_booking_link', {
      event_category: 'Booking',
      event_label: platform,
      value: platform === 'direct' ? 100 : 50, // Higher value for direct bookings
    });
  }
};

/**
 * Track when a user submits an inquiry form
 */
export const trackInquirySubmit = () => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('event', 'submit_inquiry', {
      event_category: 'Lead',
      event_label: 'Contact Form',
      value: 100,
    });
  }
};

/**
 * Track when a user views a specific section
 */
export const trackSectionView = (section: string) => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('event', 'view_section', {
      event_category: 'Engagement',
      event_label: section,
    });
  }
};

/**
 * Track when a user changes language
 */
export const trackLanguageChange = (language: 'en' | 'fr') => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('event', 'change_language', {
      event_category: 'Engagement',
      event_label: language,
    });
  }
};

/**
 * Track when a user opens the gallery/carousel
 */
export const trackGalleryView = (photoIndex?: number) => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('event', 'view_gallery', {
      event_category: 'Engagement',
      event_label: photoIndex !== undefined ? `Photo ${photoIndex}` : 'Gallery',
    });
  }
};

/**
 * Track scroll depth for engagement metrics
 */
export const trackScrollDepth = (percentage: 25 | 50 | 75 | 100) => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'Engagement',
      event_label: `${percentage}%`,
      value: percentage,
    });
  }
};

/**
 * Track when a user views the availability calendar
 */
export const trackCalendarView = (location: 'hero' | 'contact') => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('event', 'view_calendar', {
      event_category: 'Availability',
      event_label: location,
    });
  }
};

/**
 * Track when a user selects dates in the availability calendar
 */
export const trackDateSelection = (checkIn: string, checkOut: string, location: 'hero' | 'contact') => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    // Calculate number of nights
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    window.gtag('event', 'select_dates', {
      event_category: 'Availability',
      event_label: location,
      check_in: checkIn,
      check_out: checkOut,
      nights: nights,
      value: nights * 10, // Arbitrary value, adjust based on average nightly rate
    });
  }
};

/**
 * Track when a user navigates through calendar months
 */
export const trackCalendarNavigation = (direction: 'prev' | 'next', location: 'hero' | 'contact') => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('event', 'navigate_calendar', {
      event_category: 'Availability',
      event_label: `${location}_${direction}`,
    });
  }
};

/**
 * Track when a user attempts to select a blocked/booked date
 */
export const trackBlockedDateClick = (date: string, location: 'hero' | 'contact') => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('event', 'click_blocked_date', {
      event_category: 'Availability',
      event_label: location,
      blocked_date: date,
    });
  }
};
