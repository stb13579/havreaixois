# Quick Setup Guide - Google Apps Script for Both Contact Forms

## ✅ What's Done

Both contact forms on your website now use Google Apps Script:

1. **Short Inquiry Form** (Hero section) - Quick availability check
2. **Full Inquiry Form** (Contact section) - Detailed inquiry

## 📋 Setup Steps

### 1. Deploy Google Apps Script

1. Go to **[script.google.com](https://script.google.com)**
2. Click **"+ New project"**
3. Copy the entire contents of `/google-apps-script/Code.gs` file
4. Paste into the script editor
5. **Update line 17**: Change `RECIPIENT_EMAIL` to your email address
6. Click **"Save"** (💾 icon)
7. Name it: **"Le Havre Aixois Contact Forms"**

### 2. Deploy as Web App

1. Click **"Deploy"** → **"New deployment"**
2. Click the ⚙️ icon next to "Select type"
3. Select **"Web app"**
4. Configure:
   - Description: `Contact Form Handler v1`
   - Execute as: **Me** (your email)
   - Who has access: **Anyone**
5. Click **"Deploy"**
6. Authorize the app when prompted
7. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

### 3. Update Environment Variable

Create or update `.env.local` in your project root:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the URL from step 2.

### 4. Test It

```bash
# Start development server
npm run dev

# Open http://localhost:3000
# Fill out either form and submit
# Check your email and Google Sheet
```

## 📊 Google Sheet (Auto-Created)

The script automatically creates a sheet named "Inquiries" with columns:
- Timestamp
- Form Type (Short Inquiry / Full Inquiry)
- Name
- Email
- Dates/Arrival
- Departure
- Guests
- Message
- Locale

## 🧪 Testing in Apps Script

Before deploying, test the script:

1. In Apps Script editor, select function: `testShortInquiry`
2. Click **Run** (▶️)
3. Check execution log
4. Check your email
5. Repeat with `testFullInquiry`

## 🚀 Production Deployment

When deploying to Railway/Vercel/etc., add the environment variable:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## 📝 What Changed

### Before
- Hero form: Used Netlify Forms
- Contact form: Used Google Apps Script

### After
- Hero form: Uses Google Apps Script ✅
- Contact form: Uses Google Apps Script ✅

### Benefits
- Single unified system
- All inquiries in one Google Sheet
- Better email notifications
- Easier to maintain

## 🔧 Form Details

### Short Inquiry Form (Hero)
Sends:
- name, email, arrival, departure, message, locale
- formType: "short-inquiry"

### Full Inquiry Form (Contact)
Sends:
- name, email, dates, guests, message
- formType: "full-inquiry"

## 🐛 Troubleshooting

**No emails arriving?**
- Check spam folder
- Verify `RECIPIENT_EMAIL` in the script
- Check Apps Script execution logs

**Form not submitting?**
- Check browser console for errors
- Verify Web App URL in `.env.local`
- Ensure deployment "Who has access" = "Anyone"

**Sheet not updating?**
- Link the script to a Google Sheet first
- Run test functions to debug

## 📚 Files Created/Modified

- ✅ `/components/Landing.tsx` - Updated both forms
- ✅ `/google-apps-script/Code.gs` - Complete script
- ✅ `/docs/GOOGLE_APPS_SCRIPT.md` - Detailed documentation
- ✅ This file - Quick reference

---

**Need help?** See `/docs/GOOGLE_APPS_SCRIPT.md` for detailed instructions.
