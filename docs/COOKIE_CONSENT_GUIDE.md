# Cookie Consent Implementation Guide

## Overview

This project now includes GDPR-compliant cookie consent management using `vanilla-cookieconsent`. The implementation blocks analytics scripts until users provide explicit consent.

## How It Works

### 1. Cookie Consent Banner
- **First Visit**: Users see a cookie consent banner at the bottom of the page
- **Languages**: Automatically shows English or French based on browser settings
- **Options**: 
  - "Accept All" - Enables all cookies including analytics
  - "Reject All" - Only necessary cookies (none currently)
  - "Manage Preferences" - Opens detailed settings modal

### 2. Analytics Blocking
Analytics scripts are blocked by default using:
- `type="text/plain"` - Prevents scripts from executing
- `data-category="analytics"` - Links scripts to cookie consent category

When users accept analytics:
- `vanilla-cookieconsent` automatically changes `type` to `text/javascript`
- Scripts load and execute
- User preferences are saved in a cookie for 182 days

### 3. Consent Persistence
- User choices are stored in `cc_cookie`
- Consent persists across sessions (6 months)
- Users can change preferences anytime via the banner button

## Files Added/Modified

### New Files
1. **`lib/consent-config.ts`**
   - Configuration for cookie consent modal
   - English and French translations
   - Cookie categories and descriptions

2. **`components/CookieConsent.tsx`**
   - Client-side component that initializes consent
   - Helper functions to check consent status
   - Must be client component (`"use client"`)

3. **`app/cookie-consent.css`**
   - Custom styling matching site design
   - Rose color scheme to match Le Havre Aixois branding
   - Responsive design for mobile/desktop

### Modified Files
1. **`app/layout.tsx`**
   - Added `CookieConsentBanner` component
   - Modified analytics scripts with consent attributes
   - Added IP anonymization to Google Analytics

2. **`lib/analytics.ts`**
   - Added `hasAnalyticsConsent()` function
   - All tracking functions now check consent before executing
   - No tracking events sent without user permission

## Testing the Implementation

### Local Testing
1. Start dev server: `npm run dev`
2. Open browser to `http://localhost:3001`
3. Open DevTools Console and Network tab
4. Clear cookies and reload page

### What to Check
✅ **Banner appears on first visit**
✅ **No GA requests in Network tab before consent**
✅ **After clicking "Accept All":**
   - Banner disappears
   - Google Analytics scripts load
   - `cc_cookie` appears in Application > Cookies

✅ **After clicking "Reject All":**
   - Banner disappears
   - No analytics scripts load
   - Only `cc_cookie` present (with empty categories)

✅ **Language switching:**
   - Change browser language to French
   - Clear cookies and reload
   - Banner should appear in French

### Manage Preferences
- Click "Manage Preferences" in banner
- Toggle individual cookie categories
- View cookie details table
- Save preferences

## Cookie Categories

### Necessary (Always Enabled)
Currently no necessary cookies are set by the site itself. The only necessary cookie is:
- `cc_cookie` - Stores user consent preferences

### Analytics (Requires Consent)
When enabled, these cookies/services are active:
- **Google Analytics 4** (`_ga`, `_gid`)
  - Purpose: Track visitor behavior and conversions
  - Retention: 2 years (_ga), 24 hours (_gid)
  - With IP anonymization enabled

## Programmatic Access

### Check Consent Status
```typescript
import { hasConsent } from '@/components/CookieConsent';

if (hasConsent('analytics')) {
  // User has accepted analytics cookies
  trackEvent();
}
```

### Show Preferences Modal
```typescript
import { showPreferences } from '@/components/CookieConsent';

// Add a "Cookie Settings" link in footer
<button onClick={showPreferences}>
  Cookie Settings
</button>
```

## Customization

### Change Colors
Edit `app/cookie-consent.css`:
```css
:root {
  --cc-btn-primary-bg: #e11d48; /* Your primary color */
  --cc-btn-primary-hover-bg: #be123c; /* Hover state */
}
```

### Modify Text
Edit `lib/consent-config.ts`:
- Change modal titles and descriptions
- Add/remove cookie categories
- Update cookie table information

### Add New Cookie Categories
1. Add category in `consent-config.ts`:
```typescript
categories: {
  necessary: { ... },
  analytics: { ... },
  marketing: {  // New category
    enabled: false,
    autoClear: { ... }
  }
}
```

2. Update scripts with new category:
```tsx
<script data-category="marketing" type="text/plain" ... />
```

## GDPR Compliance Checklist

- ✅ Cookie consent banner implemented
- ✅ Analytics blocked until consent
- ✅ User can reject all cookies
- ✅ Consent preferences saved
- ✅ IP anonymization enabled
- ✅ Cookie details disclosed
- ⚠️ **Still needed**: Privacy Policy page (next step)
- ⚠️ **Still needed**: Cookie Policy page (can link to preferences)

## Next Steps

1. **Create Privacy Policy** - Add page explaining data processing
2. **Add Footer Links** - Link to Privacy Policy and Cookie Settings
3. **Test in Production** - Verify on live site after deployment
4. **Monitor Consent Rate** - Check how many users accept cookies

## Resources

- [vanilla-cookieconsent Documentation](https://github.com/orestbida/cookieconsent)
- [GDPR Official Text](https://gdpr-info.eu/)
- [Google Analytics GDPR Guide](https://support.google.com/analytics/answer/9019185)
- [French CNIL Guidelines](https://www.cnil.fr/en/cookies-and-other-trackers)

## Troubleshooting

### Banner doesn't appear
- Check browser console for errors
- Verify `CookieConsentBanner` is in layout.tsx
- Clear cookies and reload

### Analytics still blocked after accepting
- Check Network tab for script errors
- Verify GA_MEASUREMENT_ID is set in .env.local
- Check browser console for gtag errors

### Styles look wrong
- Verify cookie-consent.css is imported
- Check for CSS conflicts with globals.css
- Inspect element to see applied styles

### Multiple languages not working
- Browser language detection is automatic
- Test by changing browser language settings
- French requires `fr` or `fr-FR` locale
