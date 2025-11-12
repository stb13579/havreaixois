# Contact Form Consent Checkbox Implementation Guide

## Overview
This document provides the exact changes needed to add GDPR-compliant consent checkboxes to both contact forms in `components/Landing.tsx`.

## Required Changes

### 1. Dictionary Updates

#### English heroForm (around line 36-47)
Add these three lines BEFORE the closing brace of heroForm:
```typescript
heroForm: {
  title: "Check Availability",
  desc: "Tell us your dates — we'll reply within a few hours.",
  name: "Name",
  email: "Email",
  arrival: "Arrival",
  departure: "Departure",
  message: "Message (optional)",
  send: "Send Inquiry",
  successTitle: "Thank you!",
  successDesc: "We received your request and will reply soon.",
  // ADD THESE THREE LINES:
  consentLabel: "I agree to the processing of my personal data as described in the",
  consentLink: "Privacy Policy",
  consentRequired: "You must accept the privacy policy to submit this form.",
},
```

#### French heroForm (around line 140-151)
Add these three lines BEFORE the closing brace of heroForm:
```typescript
heroForm: {
  title: "Vérifier la disponibilité",
  desc: "Indiquez vos dates — réponse sous quelques heures.",
  name: "Nom",
  email: "Email",
  arrival: "Arrivée",
  departure: "Départ",
  message: "Message (facultatif)",
  send: "Envoyer la demande",
  successTitle: "Merci !",
  successDesc: "Nous avons bien reçu votre demande et répondrons vite.",
  // ADD THESE THREE LINES:
  consentLabel: "J'accepte le traitement de mes données personnelles tel que décrit dans la",
  consentLink: "Politique de confidentialité",
  consentRequired: "Vous devez accepter la politique de confidentialité pour soumettre ce formulaire.",
},
```

#### English form (around line 117-129)
Add these three lines BEFORE the closing brace of form:
```typescript
form: {
  name: "Name",
  email: "Email",
  dates: "Dates",
  datesPlaceholder: "e.g., 12–17 Oct",
  guests: "Number of Guests",
  message: "Message",
  submit: "Send Inquiry",
  note: "We'll reply to your inquiry as soon as possible.",
  success: "Thanks for your message!",
  error: "There was a problem sending your message.",
  // ADD THESE THREE LINES:
  consentLabel: "I agree to the processing of my personal data as described in the",
  consentLink: "Privacy Policy",
  consentRequired: "You must accept the privacy policy to submit this form.",
},
```

#### French form (around line 220-232)
Add these three lines BEFORE the closing brace of form:
```typescript
form: {
  name: "Nom",
  email: "Email",
  dates: "Dates",
  datesPlaceholder: "ex. 12–17 oct",
  guests: "Nombre de Voyageurs",
  message: "Message",
  submit: "Envoyer la demande",
  note: "Nous vous répondrons rapidement.",
  success: "Merci pour votre message !",
  error: "Une erreur est survenue lors de l'envoi.",
  // ADD THESE THREE LINES:
  consentLabel: "J'accepte le traitement de mes données personnelles tel que décrit dans la",
  consentLink: "Politique de confidentialité",
  consentRequired: "Vous devez accepter la politique de confidentialité pour soumettre ce formulaire.",
},
```

### 2. Short Inquiry Form Component (Hero Form)

#### Add state for consent
Find the `ShortInquiryForm` function (around line 524) and add this state:
```typescript
function ShortInquiryForm({ copy, locale }: { copy: HeroFormCopy; locale: Lang }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [consent, setConsent] = useState(false); // ADD THIS LINE
```

#### Update submit handler
Modify the handleSubmit function to check consent:
```typescript
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  
  // ADD THESE LINES:
  if (!consent) {
    alert(copy.consentRequired);
    return;
  }
  
  setStatus("loading");
  // ... rest of the function
```

#### Add checkbox UI before submit button
Find the textarea in the form (around line 605) and add this AFTER the textarea and BEFORE the button:
```typescript
      <textarea
        name="message"
        rows={2}
        placeholder={copy.message}
        aria-label={copy.message}
        className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200"
      />
      
      {/* ADD THIS ENTIRE BLOCK: */}
      <div className="mt-3 flex items-start gap-2">
        <input
          type="checkbox"
          id="hero-consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-2 focus:ring-rose-200"
          required
        />
        <label htmlFor="hero-consent" className="text-xs text-slate-600">
          {copy.consentLabel}{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-rose-600 underline decoration-dotted underline-offset-2 hover:text-rose-700">
            {copy.consentLink}
          </a>
          .
        </label>
      </div>
      
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-100 transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "…" : copy.send}
      </button>
```

### 3. Full Inquiry Form Component (Contact Form)

#### Add state for consent
Find the `InquiryForm` function (around line 767) and add this state:
```typescript
function InquiryForm({ t }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [consent, setConsent] = useState(false); // ADD THIS LINE
```

#### Update onSubmit function
Modify the onSubmit function to check consent:
```typescript
async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  
  // ADD THESE LINES:
  if (!consent) {
    alert(t.form.consentRequired);
    return;
  }
  
  setStatus("loading");
  // ... rest of the function
```

#### Add checkbox UI before submit button
Find the message textarea (around line 873) and add this AFTER the textarea div and BEFORE the button:
```typescript
        <div className="grid gap-2">
          <label className="text-sm text-slate-600">{t.form.message}</label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>
        
        {/* ADD THIS ENTIRE BLOCK: */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="contact-consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-2 focus:ring-rose-200"
            required
          />
          <label htmlFor="contact-consent" className="text-sm text-slate-600">
            {t.form.consentLabel}{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-rose-600 underline decoration-dotted underline-offset-2 hover:text-rose-700">
              {t.form.consentLink}
            </a>
            .
          </label>
        </div>
        
        <button type="submit" className="mt-1 rounded-xl bg-rose-600 px-5 py-2 text-white shadow hover:bg-rose-700">
          {status === "loading" ? "..." : t.form.submit}
        </button>
```

## Implementation Steps

1. **Backup the file first**:
   ```bash
   cp components/Landing.tsx components/Landing.tsx.backup
   ```

2. **Open `components/Landing.tsx` in your editor**

3. **Make dictionary changes** (sections 1.1 through 1.4 above)

4. **Add consent state to ShortInquiryForm** (section 2.1)

5. **Add consent validation to ShortInquiryForm submit** (section 2.2)

6. **Add consent checkbox UI to ShortInquiryForm** (section 2.3)

7. **Add consent state to InquiryForm** (section 3.1)

8. **Add consent validation to InquiryForm submit** (section 3.2)

9. **Add consent checkbox UI to InquiryForm** (section 3.3)

10. **Build and test**:
    ```bash
    npm run build
    npm run dev
    # Test both forms - ensure checkbox is required
    ```

## What This Achieves

### GDPR Compliance (Art. 13 & Art. 6(1)(a))
✅ **Explicit consent** - Users must actively check the box
✅ **Clear information** - Links to privacy policy
✅ **Cannot submit without consent** - Form validation prevents submission
✅ **Visible and accessible** - Not pre-checked (prohibited under GDPR)
✅ **Bilingual** - English and French versions

### User Experience
✅ **Clear labeling** - Users know what they're consenting to
✅ **Easy access to details** - Link opens privacy policy in new tab
✅ **Error feedback** - Alert if they try to submit without consent
✅ **Consistent design** - Matches site's rose color scheme
✅ **Accessible** - Proper label/input association

## Testing Checklist

- [ ] Hero form shows consent checkbox
- [ ] Contact form shows consent checkbox  
- [ ] Both checkboxes are NOT pre-checked
- [ ] Cannot submit hero form without checking
- [ ] Cannot submit contact form without checking
- [ ] Privacy policy link works (opens in new tab)
- [ ] Alert message appears in correct language
- [ ] Forms still submit successfully when consent given
- [ ] Mobile view looks correct
- [ ] French translations display correctly

## Summary

These changes add explicit consent checkboxes to both inquiry forms, satisfying GDPR Article 6(1)(a) requirements for lawful processing based on consent, and Article 13 transparency requirements by linking to the privacy policy where data processing is explained in detail.

The checkbox is:
- **Required** (cannot submit without it)
- **Not pre-ticked** (GDPR requirement)
- **Clearly labeled** (explains what user is consenting to)
- **Linked to privacy policy** (provides detailed information)
- **Bilingual** (English and French)
- **Accessible** (proper HTML semantics)

---

**Status**: Ready to implement
**Estimated time**: 15-20 minutes
**Risk level**: Low (non-breaking changes, easy to test)
