# Privacy Policy Content Guide

## Overview
The privacy policy page structure has been created at `/app/privacy/page.tsx`. This guide will help you fill in the required content for GDPR compliance.

## Where to Add Your Content
Edit the file: `/app/privacy/page.tsx`

Replace the placeholder sections with your actual privacy policy content.

## Required Sections for GDPR Compliance

### 1. Data Controller Information
**What to include:**
- Your full name or company name
- Physical address (if applicable)
- Contact email address
- Phone number (optional)

**Example:**
```
Le Havre Aixois is operated by [Your Name/Company]
Contact: contact@lehavreaixois.com
Address: [Your address]
```

### 2. What Data We Collect
**List all data you collect:**
- **Contact Form Data:** Name, email, arrival/departure dates, number of guests, message
- **Analytics Data:** IP address (anonymized), pages visited, device type, browser, referrer URL
- **Cookies:** `_ga`, `_gid` (Google Analytics), `cc_cookie` (consent preferences)

### 3. Legal Basis for Processing (GDPR Article 6)
**For each type of data, specify the legal basis:**
- **Contact Forms:** Consent + Performance of a contract (responding to booking inquiries)
- **Analytics:** Consent (users can opt-out via cookie banner)
- **Consent Cookie:** Legitimate interest (required to remember consent choices)

### 4. Purpose of Data Processing
**Why you collect each type:**
- **Contact information:** To respond to booking inquiries and manage reservations
- **Analytics data:** To understand website traffic and improve user experience
- **Cookies:** To remember user preferences and track website performance

### 5. Data Recipients (Third Parties)
**Who you share data with:**
- **Google LLC** - Google Analytics for website analytics (USA)
- **[Your hosting provider]** - Railway/Netlify/Vercel for website hosting
- **Google Apps Script** - For contact form submissions (if still using)
- **Airbnb/VRBO** - If users book through those platforms

### 6. International Data Transfers
**Important for US-based services:**
```
Some of our service providers (Google Analytics) are located in the United States.
We rely on Google's Standard Contractual Clauses approved by the European Commission
to ensure adequate protection of your personal data.
```

### 7. Data Retention Periods
**How long you keep data:**
- **Contact form submissions:** 2 years from last contact or until you request deletion
- **Google Analytics data:** 14 months (configurable in GA settings)
- **Consent cookies:** 6 months
- **Email communications:** Duration of business relationship + legal retention period

### 8. Your Rights (GDPR Articles 15-22)
**List all user rights:**
- **Right to Access:** Request a copy of your personal data
- **Right to Rectification:** Correct inaccurate data
- **Right to Erasure:** Request deletion of your data
- **Right to Restrict Processing:** Limit how we use your data
- **Right to Data Portability:** Receive your data in a machine-readable format
- **Right to Object:** Object to processing based on legitimate interests
- **Right to Withdraw Consent:** Change cookie preferences anytime
- **Right to Lodge a Complaint:** File complaint with CNIL (France) or your local DPA

**How to exercise rights:**
```
To exercise any of these rights, please contact us at:
Email: contact@lehavreaixois.com
We will respond within 30 days of receiving your request.
```

### 9. Cookies Section
**Detail your cookies:**

**Necessary Cookies:**
- `cc_cookie` - Stores your cookie consent preferences (6 months)

**Analytics Cookies (Requires Consent):**
- `_ga` - Distinguishes users for Google Analytics (2 years)
- `_gid` - Distinguishes users for Google Analytics (24 hours)

**How to manage cookies:**
```
You can change your cookie preferences at any time by clicking "Cookie Settings"
in the footer of our website, or by clearing your browser cookies.
```

### 10. Security Measures
**Briefly describe security:**
```
We implement appropriate technical and organizational measures to protect your
personal data, including HTTPS encryption, secure hosting, and limited access
to personal data.
```

### 11. Changes to Privacy Policy
```
We may update this privacy policy from time to time. We will notify you of any
changes by posting the new policy on this page and updating the "Last Updated" date.
```

### 12. Contact Information
```
If you have any questions about this privacy policy or our data practices,
please contact us at:

Email: contact@lehavreaixois.com
Address: [Your address if applicable]

For questions about data protection in France, you can also contact the CNIL:
https://www.cnil.fr/en/home
```

## French Translation
You should provide a French version of your privacy policy since:
- Your property is in France
- You target French visitors
- GDPR requires information in the user's language

Consider creating `/app/privacy/fr/page.tsx` or adding a language toggle.

## GDPR-Specific Requirements for France (CNIL)

### Must Include:
1. ✅ Identity of data controller
2. ✅ Purpose of processing
3. ✅ Legal basis for processing
4. ✅ Recipients of data
5. ✅ Data retention periods
6. ✅ User rights and how to exercise them
7. ✅ Right to lodge complaint with CNIL
8. ✅ Information about automated decision-making (if applicable - you don't have any)

## Resources

### Privacy Policy Generators (Use with caution, customize for your needs):
- https://www.freeprivacypolicy.com/
- https://www.privacypolicygenerator.info/
- https://www.iubenda.com/en/privacy-and-cookie-policy-generator

### CNIL Resources (French Data Protection Authority):
- https://www.cnil.fr/en/home
- CNIL model privacy policy: https://www.cnil.fr/en/sheet-ndeg13-privacy-policy

### GDPR Articles:
- Article 13 (Information to be provided): https://gdpr-info.eu/art-13-gdpr/
- Article 14 (Information to be provided): https://gdpr-info.eu/art-14-gdpr/

## Quick Checklist Before Publishing

- [ ] All placeholder text replaced
- [ ] Your actual contact information included
- [ ] All data collection accurately described
- [ ] Legal basis specified for each type of processing
- [ ] User rights clearly explained with contact method
- [ ] Data retention periods specified
- [ ] Third-party services listed (Google Analytics, hosting, etc.)
- [ ] Cookie information matches what's in consent banner
- [ ] CNIL contact information included
- [ ] "Last Updated" date is current
- [ ] Reviewed by legal counsel (recommended)

## Testing Your Privacy Policy

After adding content:
1. Visit http://localhost:3001/privacy
2. Check all links work
3. Read through as a user - is it clear?
4. Verify footer link works from home page
5. Check cookie consent modal links to privacy policy
6. Test on mobile devices

---

**Note:** This is guidance only. For legal advice specific to your situation, 
consult with a lawyer specializing in GDPR compliance and French data protection law.
