// Google Analytics 4 Event Tracking Utilities
// ============================================
// Use these functions to track user interactions with booking CTAs

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
 * Track when a user clicks a booking platform link
 */
export const trackBookingClick = (platform: 'airbnb' | 'vrbo' | 'direct') => {
  if (typeof window !== 'undefined' && window.gtag) {
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
  if (typeof window !== 'undefined' && window.gtag) {
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
  if (typeof window !== 'undefined' && window.gtag) {
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
  if (typeof window !== 'undefined' && window.gtag) {
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
  if (typeof window !== 'undefined' && window.gtag) {
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
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'Engagement',
      event_label: `${percentage}%`,
      value: percentage,
    });
  }
};
