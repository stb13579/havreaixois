# Google Apps Script Setup for Contact Forms

This guide explains how to set up Google Apps Script to handle both contact forms on the Le Havre Aixois website.

## Overview

Both forms on the website now use Google Apps Script:
1. **Short Inquiry Form** (Hero section) - Quick availability check with dates
2. **Full Inquiry Form** (Contact section) - Detailed inquiry with date range picker

## Google Apps Script Code

Copy and paste this code into your Google Apps Script project:

```javascript
/**
 * Le Havre Aixois - Contact Form Handler
 * Handles both short-inquiry and full-inquiry forms
 */

// Configure your email address here
const RECIPIENT_EMAIL = "contact@havreaixois.com"; // Change this to your email
const SHEET_NAME = "Inquiries";

/**
 * Handle POST requests from contact forms
 */
function doPost(e) {
  try {
    const params = e.parameter;
    const formType = params.formType || "unknown";
    
    // Log the inquiry to Google Sheet
    logToSheet(params, formType);
    
    // Send email notification
    sendEmailNotification(params, formType);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Thank you for your inquiry!" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error("Error processing form:", error);
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput("Contact form handler is running. Use POST to submit inquiries.")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Log inquiry to Google Sheet
 */
function logToSheet(params, formType) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Timestamp",
      "Form Type",
      "Name",
      "Email",
      "Dates/Arrival",
      "Departure",
      "Guests",
      "Message",
      "Locale"
    ]);
  }
  
  const timestamp = new Date();
  
  // Handle different form types
  if (formType === "short-inquiry") {
    sheet.appendRow([
      timestamp,
      formType,
      params.name || "",
      params.email || "",
      params.arrival || "",
      params.departure || "",
      "N/A",
      params.message || "",
      params.locale || "en"
    ]);
  } else if (formType === "full-inquiry") {
    sheet.appendRow([
      timestamp,
      formType,
      params.name || "",
      params.email || "",
      params.dates || "",
      "N/A",
      params.guests || "",
      params.message || "",
      "N/A"
    ]);
  } else {
    // Generic fallback
    sheet.appendRow([
      timestamp,
      formType,
      params.name || "",
      params.email || "",
      params.dates || params.arrival || "",
      params.departure || "",
      params.guests || "",
      params.message || "",
      params.locale || ""
    ]);
  }
}

/**
 * Send email notification
 */
function sendEmailNotification(params, formType) {
  let subject = "";
  let body = "";
  
  if (formType === "short-inquiry") {
    subject = `New Quick Inquiry from ${params.name}`;
    body = `
You have received a new quick inquiry from Le Havre Aixois website:

Form Type: Short Inquiry (Hero Form)
Name: ${params.name}
Email: ${params.email}
Arrival Date: ${params.arrival}
Departure Date: ${params.departure}
Message: ${params.message || "No message provided"}
Language: ${params.locale || "en"}

Submitted: ${new Date().toLocaleString()}

---
Reply to this inquiry by responding to: ${params.email}
    `.trim();
    
  } else if (formType === "full-inquiry") {
    subject = `New Detailed Inquiry from ${params.name}`;
    body = `
You have received a new detailed inquiry from Le Havre Aixois website:

Form Type: Full Inquiry (Contact Form)
Name: ${params.name}
Email: ${params.email}
Dates: ${params.dates}
Number of Guests: ${params.guests}
Message: ${params.message || "No message provided"}

Submitted: ${new Date().toLocaleString()}

---
Reply to this inquiry by responding to: ${params.email}
    `.trim();
    
  } else {
    subject = `New Contact Form Submission from ${params.name}`;
    body = `
You have received a new contact form submission:

Form Type: ${formType}
Name: ${params.name}
Email: ${params.email}
${params.dates ? `Dates: ${params.dates}` : ""}
${params.arrival ? `Arrival: ${params.arrival}` : ""}
${params.departure ? `Departure: ${params.departure}` : ""}
${params.guests ? `Guests: ${params.guests}` : ""}
Message: ${params.message || "No message provided"}

Submitted: ${new Date().toLocaleString()}

---
Reply to this inquiry by responding to: ${params.email}
    `.trim();
  }
  
  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: subject,
    body: body,
    replyTo: params.email
  });
}

/**
 * Test function - run this to test the setup
 */
function testFormSubmission() {
  const testParams = {
    parameter: {
      formType: "short-inquiry",
      name: "Test User",
      email: "test@example.com",
      arrival: "2025-12-01",
      departure: "2025-12-05",
      message: "This is a test inquiry",
      locale: "en"
    }
  };
  
  const result = doPost(testParams);
  Logger.log(result.getContent());
}
```

## Setup Instructions

### Step 1: Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Click "+ New project"
3. Delete any default code
4. Paste the script code above
5. **Important**: Update the `RECIPIENT_EMAIL` constant with your actual email address
6. Click "Save" (💾 icon) and name your project "Le Havre Aixois Contact Forms"

### Step 2: Create Google Sheet (Optional but Recommended)

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Le Havre Aixois Inquiries"
4. Go back to your Google Apps Script project
5. Click the Settings (⚙️) icon on the left
6. Find "Script Properties" and add:
   - No properties needed - the script will auto-create the sheet

### Step 3: Link Sheet to Script

1. In your Google Apps Script project, go to "Resources" or "Settings"
2. Click "Project settings"
3. Copy the Script ID
4. Open your Google Sheet
5. Go to "Extensions" > "Apps Script"
6. This will create or open a script project linked to the sheet
7. Replace the code with the script above
8. Save

### Step 4: Deploy as Web App

1. In Google Apps Script, click "Deploy" > "New deployment"
2. Click the gear icon (⚙️) next to "Select type"
3. Select "Web app"
4. Configure deployment:
   - **Description**: "Contact Form Handler v1"
   - **Execute as**: Me (your Google account)
   - **Who has access**: Anyone
5. Click "Deploy"
6. Review permissions and click "Authorize access"
7. Select your Google account
8. Click "Advanced" then "Go to [Project name] (unsafe)" if warned
9. Click "Allow"
10. **Copy the Web App URL** - it will look like:
    ```
    https://script.google.com/macros/s/AKfycby.../exec
    ```

### Step 5: Update Environment Variables

1. In your project root, update `.env.local` (or create it):
   ```bash
   NEXT_PUBLIC_CONTACT_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

2. Replace `YOUR_SCRIPT_ID` with the URL you copied in Step 4

3. If deploying to production (Railway, Vercel, etc.), add the same environment variable there

### Step 6: Test the Setup

1. In Google Apps Script, run the `testFormSubmission` function:
   - Select `testFormSubmission` from the function dropdown
   - Click "Run" (▶️)
   - Check for any errors in the "Execution log"

2. Check your email for the test notification

3. Check your Google Sheet - it should have a new row with the test data

4. Test from your website:
   - Run your development server: `npm run dev`
   - Fill out either contact form
   - Submit and verify you receive an email
   - Check the Google Sheet for the logged inquiry

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
1. Check that the Web App URL is correct in your `.env.local`
2. Verify the Web App is deployed and accessible
3. Check browser console for CORS errors
4. Ensure "Who has access" is set to "Anyone" in deployment settings

### Not receiving emails
1. Verify `RECIPIENT_EMAIL` is correct in the script
2. Check your spam/junk folder
3. View the Apps Script execution logs for errors:
   - In Apps Script, go to "Executions" (clock icon)
   - Click on recent executions to see details

### Sheet not updating
1. Verify the script is linked to a Google Sheet
2. Check that the sheet has proper permissions
3. Run `testFormSubmission` to debug

### CORS Issues
Google Apps Script should handle CORS automatically, but if you experience issues:
1. Make sure the Web App is deployed with "Who has access: Anyone"
2. Redeploy the Web App after any changes
3. Clear browser cache and try again

## Updating the Script

When you make changes to the script:

1. Save the changes in Google Apps Script
2. Click "Deploy" > "Manage deployments"
3. Click "Edit" (pencil icon) next to your current deployment
4. Create new version or update description
5. Click "Deploy"

Note: The Web App URL stays the same, so you don't need to update environment variables.

## Security Notes

- The script only accepts POST requests with form data
- All submissions are logged with timestamps
- Email addresses are validated by the browser before submission
- Consider adding additional validation in the script if needed
- The script runs under your Google account but is accessible to anyone (for form submissions)

## Data Privacy

- All inquiry data is stored in your private Google Sheet
- Only you (the Google account owner) can access the sheet and script
- Consider Google Workspace's data retention policies
- Add a link to your privacy policy on the website (already implemented)

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
- Test using the `testFormSubmission` function in the script

---

**Note**: The endpoint URL in `.env.example` should be updated with your actual deployed Web App URL once you complete the setup.
