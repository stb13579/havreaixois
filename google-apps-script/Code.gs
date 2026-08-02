/**
 * Le Havre Aixois - Contact Form Handler
 * Handles both short-inquiry and full-inquiry forms
 *
 * Setup Instructions:
 * 1. Create (or open) the Google Sheet you want inquiries logged to.
 * 2. In that Sheet: Extensions > Apps Script. This BINDS the script to the
 *    sheet, which logToSheet() below requires (it uses getActiveSpreadsheet(),
 *    which only resolves for a bound script - a standalone project created
 *    at script.google.com will fail with a null spreadsheet at runtime).
 * 3. Copy this entire file into the script editor (replacing the boilerplate).
 * 4. Update the RECIPIENT_EMAIL / CC_EMAIL constants below with your email(s).
 *    The "Inquiries" tab (SHEET_NAME) is created automatically on first run.
 * 5. Deploy as Web App (Deploy > New deployment > Web app)
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and add it to your .env.local as CONTACT_ENDPOINT
 *    (server-only var, read by app/api/contact/route.ts - do not prefix with NEXT_PUBLIC_)
 */

// ============================================
// CONFIGURATION - UPDATE THIS!
// ============================================
const RECIPIENT_EMAIL = "shaun.tyler.brown@gmail.com"; // ⬅️ CHANGE THIS TO YOUR EMAIL
const CC_EMAIL = "aixbnb13100@gmail.com"; // ⬅️ Optional secondary recipient, leave "" to disable
const SHEET_NAME = "Inquiries";

// ============================================
// MAIN HANDLERS
// ============================================

/**
 * Handle POST requests from contact forms
 */
function doPost(e) {
  try {
    if (!e || (!e.postData && !e.parameter)) {
      // Happens if you click "Run" in the editor instead of sending a real request.
      return ContentService
        .createTextOutput(JSON.stringify({
          result: "error",
          message: "No postData. Deploy as a Web App and POST to its URL."
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const contentType = ((e.postData && e.postData.type) || "").toLowerCase();
    const params = contentType.includes("application/json")
      ? JSON.parse(e.postData.contents || "{}")
      : e.parameter || {};
    const formType = params.formType || "unknown";
    
    // Log the inquiry to Google Sheet
    logToSheet(params, formType);
    
    // Send email notification
    sendEmailNotification(params, formType);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "success", 
        message: "Thank you for your inquiry!" 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error("Error processing form:", error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "error", 
        message: error.toString() 
      }))
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

// ============================================
// LOGGING TO GOOGLE SHEET
// ============================================

/**
 * Prevent spreadsheet formula injection: Sheets treats any cell value
 * starting with =, +, -, @, or a tab/CR as a formula. Prefixing with a
 * single quote forces it to be stored as plain text.
 */
function sanitizeForSheet(value) {
  const str = String(value == null ? "" : value);
  return /^[=+\-@\t\r]/.test(str) ? "'" + str : str;
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
    // Add header row
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
    // Format header row
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#f3f4f6");
    sheet.setFrozenRows(1);
  }
  
  const timestamp = new Date();
  
  // Handle different form types
  if (formType === "short-inquiry") {
    // Hero form: arrival, departure, optional message
    sheet.appendRow([
      timestamp,
      "Short Inquiry",
      sanitizeForSheet(params.name || ""),
      sanitizeForSheet(params.email || ""),
      sanitizeForSheet(params.arrival || ""),
      sanitizeForSheet(params.departure || ""),
      "N/A",
      sanitizeForSheet(params.message || "(no message)"),
      sanitizeForSheet(params.locale || "en")
    ]);
  } else if (formType === "full-inquiry") {
    // Contact form: date range, guests, message
    sheet.appendRow([
      timestamp,
      "Full Inquiry",
      sanitizeForSheet(params.name || ""),
      sanitizeForSheet(params.email || ""),
      sanitizeForSheet(params.dates || ""),
      "N/A",
      sanitizeForSheet(params.guests || ""),
      sanitizeForSheet(params.message || "(no message)"),
      "N/A"
    ]);
  } else {
    // Generic fallback for any other form type
    sheet.appendRow([
      timestamp,
      sanitizeForSheet(formType),
      sanitizeForSheet(params.name || ""),
      sanitizeForSheet(params.email || ""),
      sanitizeForSheet(params.dates || params.arrival || ""),
      sanitizeForSheet(params.departure || ""),
      sanitizeForSheet(params.guests || ""),
      sanitizeForSheet(params.message || ""),
      sanitizeForSheet(params.locale || "")
    ]);
  }
  
  // Auto-resize columns for readability
  sheet.autoResizeColumns(1, 9);
}

// ============================================
// EMAIL NOTIFICATIONS
// ============================================

/**
 * Send email notification to property owner
 */
function sendEmailNotification(params, formType) {
  let subject = "";
  let body = "";
  
  if (formType === "short-inquiry") {
    // Quick availability check from hero form
    subject = `🏡 Quick Inquiry: ${params.name} (${params.arrival} to ${params.departure})`;
    body = `
New quick inquiry from Le Havre Aixois website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 FORM TYPE: Short Inquiry (Hero Form)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Guest Information:
   Name: ${params.name}
   Email: ${params.email}
   Language: ${params.locale === "fr" ? "French 🇫🇷" : "English 🇬🇧"}

📅 Travel Dates:
   Arrival: ${params.arrival}
   Departure: ${params.departure}

💬 Message:
   ${params.message || "(No message provided)"}

🕐 Submitted: ${new Date().toLocaleString("en-US", { 
      dateStyle: "full", 
      timeStyle: "short",
      timeZone: "Europe/Paris"
    })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply directly to: ${params.email}
    `.trim();
    
  } else if (formType === "full-inquiry") {
    // Detailed inquiry from contact form
    subject = `🏡 Detailed Inquiry: ${params.name} (${params.guests} ${params.guests === "1" ? "guest" : "guests"})`;
    body = `
New detailed inquiry from Le Havre Aixois website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 FORM TYPE: Full Inquiry (Contact Form)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Guest Information:
   Name: ${params.name}
   Email: ${params.email}

📅 Travel Details:
   Dates: ${params.dates}
   Number of Guests: ${params.guests}

💬 Message:
   ${params.message || "(No message provided)"}

🕐 Submitted: ${new Date().toLocaleString("en-US", { 
      dateStyle: "full", 
      timeStyle: "short",
      timeZone: "Europe/Paris"
    })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply directly to: ${params.email}
    `.trim();
    
  } else {
    // Generic form submission
    subject = `🏡 Contact Form: ${params.name}`;
    body = `
New contact form submission from Le Havre Aixois website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 FORM TYPE: ${formType}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Contact Information:
   Name: ${params.name}
   Email: ${params.email}

${params.dates ? `📅 Dates: ${params.dates}` : ""}
${params.arrival ? `📅 Arrival: ${params.arrival}` : ""}
${params.departure ? `📅 Departure: ${params.departure}` : ""}
${params.guests ? `👥 Guests: ${params.guests}` : ""}

💬 Message:
   ${params.message || "(No message provided)"}

🕐 Submitted: ${new Date().toLocaleString("en-US", { 
      dateStyle: "full", 
      timeStyle: "short",
      timeZone: "Europe/Paris"
    })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply directly to: ${params.email}
    `.trim();
  }
  
  // Send email
  const mailOptions = {
    to: RECIPIENT_EMAIL,
    subject: subject,
    body: body,
    replyTo: params.email,
    name: "Le Havre Aixois - Inquiries"
  };
  if (CC_EMAIL) mailOptions.cc = CC_EMAIL;
  MailApp.sendEmail(mailOptions);
}

// ============================================
// TEST FUNCTIONS
// ============================================

/**
 * Test function for short inquiry form
 * Run this in Apps Script to test the setup
 */
function testShortInquiry() {
  const testParams = {
    parameter: {
      formType: "short-inquiry",
      name: "Test User",
      email: "test@example.com",
      arrival: "2025-12-01",
      departure: "2025-12-05",
      message: "This is a test inquiry from the hero form",
      locale: "en"
    }
  };
  
  const result = doPost(testParams);
  Logger.log("Short inquiry test result:");
  Logger.log(result.getContent());
}

/**
 * Test function for full inquiry form
 * Run this in Apps Script to test the setup
 */
function testFullInquiry() {
  const testParams = {
    parameter: {
      formType: "full-inquiry",
      name: "Test Guest",
      email: "guest@example.com",
      dates: "2025-12-01 - 2025-12-10",
      guests: "4",
      message: "We are a family of 4 interested in booking your beautiful property."
    }
  };
  
  const result = doPost(testParams);
  Logger.log("Full inquiry test result:");
  Logger.log(result.getContent());
}

/**
 * Clear all test data from the sheet
 * Use this to clean up after testing
 */
function clearTestData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    Logger.log("No sheet found with name: " + SHEET_NAME);
    return;
  }
  
  // Delete all rows except the header
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
    Logger.log("Cleared " + (lastRow - 1) + " test rows");
  } else {
    Logger.log("No data to clear");
  }
}
