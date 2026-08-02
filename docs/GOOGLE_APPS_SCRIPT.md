# Google Apps Script Setup for Contact Forms

This guide explains how to set up Google Apps Script to handle both contact forms on the Le Havre Aixois website.

## Overview

Both forms on the website submit through the same pipeline:

1. **Short Inquiry Form** (Hero section) - Quick availability check with dates
2. **Full Inquiry Form** (Contact section) - Detailed inquiry with date range picker

Neither form calls Google Apps Script directly from the browser. Both `fetch()` the site's own `/api/contact` route (`app/api/contact/route.ts`), which forwards the request to Apps Script **server-to-server**. This is not a stylistic choice — see [CORS Issues](#cors-issues) below for why calling Apps Script directly from the browser cannot work.

## Google Apps Script Code

The script itself lives in this repo at [`google-apps-script/Code.gs`](../google-apps-script/Code.gs) — copy that file's contents into the Apps Script editor rather than retyping it here, so this doc can't drift out of sync with the actual script again. It currently:

- Accepts either `application/x-www-form-urlencoded` or `application/json` POST bodies
- Logs every inquiry to an "Inquiries" sheet tab (auto-created on first run), sanitizing values so a submission starting with `=`, `+`, `-`, or `@` can't execute as a spreadsheet formula
- Emails `RECIPIENT_EMAIL` (and `CC_EMAIL`, if set) a formatted notification with `replyTo` set to the guest's address
- Exposes `testShortInquiry()`, `testFullInquiry()`, and `clearTestData()` for testing from the Apps Script editor

Before deploying, update the `RECIPIENT_EMAIL` / `CC_EMAIL` constants near the top of the file with your own address(es).

## Setup Instructions

### Step 1: Create the Sheet and bind the script to it

The script's sheet-logging uses `SpreadsheetApp.getActiveSpreadsheet()`, which only resolves when the script is **bound** to a specific Sheet. Creating a standalone project at script.google.com instead will fail at runtime with a null spreadsheet — every submission would error out. So:

1. Go to [Google Sheets](https://sheets.google.com) and create (or open) the spreadsheet you want inquiries logged to.
2. In that Sheet: **Extensions > Apps Script**. This opens a script project bound to the sheet — don't create a separate standalone project.
3. Delete the boilerplate `myFunction()` code.
4. Paste in the full contents of [`google-apps-script/Code.gs`](../google-apps-script/Code.gs).
5. Update `RECIPIENT_EMAIL` (and `CC_EMAIL`, if wanted) with your actual address(es).
6. Save (💾) and name the project, e.g. "Le Havre Aixois Contact Forms".

The "Inquiries" tab is created automatically the first time the script runs — no manual sheet setup needed.

### Step 2: Deploy as Web App

1. Click **Deploy > New deployment**.
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
3. Configure:
   - **Description**: "Contact Form Handler v1"
   - **Execute as**: Me (your Google account)
   - **Who has access**: Anyone
4. Click **Deploy**, then **Authorize access** and select your Google account (click "Advanced" > "Go to [project name] (unsafe)" if warned — this is expected for a script you wrote yourself).
5. Copy the Web App URL. It looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

### Step 3: Set the environment variable

This URL is a secret, not a public config value — anyone who has it can invoke the script directly (bypassing the website) under your Google account's mail-sending and sheet-write permissions. Set it as a **server-only** variable, without a `NEXT_PUBLIC_` prefix:

```bash
CONTACT_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

- Local dev: add it to `.env.local`.
- Production (Railway, etc.): add it as a runtime environment variable on the service. It's read at request time by `app/api/contact/route.ts`, not baked in at build time, so no build-arg wiring is needed.

### Step 4: Test the setup

1. In the Apps Script editor, select `testShortInquiry` (or `testFullInquiry`) from the function dropdown and click **Run** (▶️). Check the "Execution log" for errors.
2. Confirm you received the test email and a new row appeared in the "Inquiries" sheet tab.
3. Run `clearTestData()` to remove the test row when done.
4. Test end-to-end from the website: `npm run dev`, submit either form, and confirm the email/sheet update — this exercises the full path through `/api/contact`, not just the script in isolation.

## Form Field Mapping

### Short Inquiry Form (Hero)
- `name` - Guest name
- `email` - Guest email
- `arrival` - Arrival date (YYYY-MM-DD)
- `departure` - Departure date (YYYY-MM-DD)
- `message` - Optional message
- `locale` - Language (en/fr)
- `formType` - "short-inquiry"

### Full Inquiry Form (Contact)
- `name` - Guest name
- `email` - Guest email
- `dates` - Date range as text (e.g., "2025-12-01 - 2025-12-05")
- `guests` - Number of guests
- `message` - Inquiry message
- `formType` - "full-inquiry"

## Troubleshooting

### Form submissions not working
1. Check that `CONTACT_ENDPOINT` is set correctly wherever the app is running (local `.env.local`, or the Railway service's runtime variables).
2. Verify the Web App is deployed and accessible (visiting the URL directly should return "Contact form handler is running...").
3. Check the browser Network tab for the request to `/api/contact` (same-origin) and its response. If you instead see a request going to `script.google.com` directly from the browser, the proxy has been bypassed somewhere — that will fail with a CORS error (see below).
4. Ensure "Who has access" is set to "Anyone" in the deployment settings.

### Not receiving emails
1. Verify `RECIPIENT_EMAIL` (and `CC_EMAIL`) are correct in the script.
2. Check your spam/junk folder.
3. View the Apps Script execution logs for errors: **Executions** (clock icon) in the Apps Script editor.

### Sheet not updating
1. Confirm the script was created via **Extensions > Apps Script** from inside the target Sheet (not as a standalone project) — see Step 1.
2. Check the execution log for a `getActiveSpreadsheet` / null-spreadsheet error, which indicates the script isn't bound correctly.
3. Run `testShortInquiry()` to debug.

### CORS Issues

`ContentService` (what Apps Script web apps use to return a response) **never sends an `Access-Control-Allow-Origin` header, under any deployment configuration.** This isn't a misconfiguration to fix — it's a permanent limitation of Apps Script web apps. A browser calling the `/exec` URL directly with `fetch()` will always be blocked reading the response, regardless of "Who has access" settings, redeploying, or clearing cache.

This is why the site never calls Apps Script from the browser: `components/Landing.tsx` posts to the same-origin `/api/contact` route, and `app/api/contact/route.ts` makes the actual call to Apps Script server-to-server, where CORS doesn't apply. If you see a CORS error in the browser console referencing `script.google.com`, something is calling Apps Script directly instead of going through `/api/contact` — check for a stale build or a reverted change to `Landing.tsx` / `lib/config.ts`.

## Updating the Script

When you make changes to `Code.gs`:

1. Save the changes in Google Apps Script.
2. Click **Deploy > Manage deployments**.
3. Click **Edit** (pencil icon) next to your current deployment.
4. Select "New version" and click **Deploy**.

The Web App URL stays the same across versions, so `CONTACT_ENDPOINT` doesn't need to change. Editing the deployment in place (rather than creating a brand-new deployment) is what keeps the URL stable.

## Security Notes

- `CONTACT_ENDPOINT` is a server-only variable — it is never sent to the browser, so the Apps Script URL isn't discoverable from the public site.
- Sheet writes are sanitized to prevent a submitted value like `=IMPORTXML(...)` from executing as a formula when the sheet is opened.
- The script still runs under "Execute as: Me" with "Anyone" access, meaning anyone who does obtain the URL (e.g. from your own Apps Script deployment settings) can invoke it directly, bypassing rate limits or validation the website might add. Treat the URL as a secret.
- Consider adding your own validation (e.g. required-field checks) in the script if you want stronger guarantees than what the client sends.

## Data Privacy

- All inquiry data is stored in your private Google Sheet.
- Only you (the Google account owner) can access the sheet and script.
- Consider Google Workspace's data retention policies.
- Add a link to your privacy policy on the website (already implemented).

## Next Steps

After setting up:

1. ✅ Monitor the first few submissions to ensure everything works
2. ✅ Set up a folder in Gmail to organize inquiry emails
3. ✅ Consider creating email templates for common responses
4. ✅ Optionally add auto-responders for guests
5. ✅ Review the Google Sheet regularly for inquiry patterns

## Support

If you need help:
- Check the Google Apps Script documentation: https://developers.google.com/apps-script
- Review execution logs in Apps Script for detailed error messages
- Test using `testShortInquiry()` / `testFullInquiry()` in the script editor
