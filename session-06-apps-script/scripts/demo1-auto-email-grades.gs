/**
 * Demo 1: Auto-Email Grades
 *
 * Reads student grade data from the active Google Sheet and sends
 * personalised email notifications to each student with their results
 * and a performance-based message.
 *
 * Sheet structure expected:
 *   A: Student ID | B: Student Name | C: Email | D: Module
 *   E: CA Score   | F: Exam Score   | G: Final Grade | H: Status
 *
 * The script also writes the send status back to column H.
 *
 * ── HOW TO RUN ──────────────────────────────────────────────
 * 1. Open your Google Sheet with the student data
 * 2. Rename the tab to "Student Grades" (case-sensitive, with space)
 *    — OR — change the SHEET_NAME constant below to match your tab
 * 3. IMPORTANT: Replace the fake @mymail.sp.edu.sg addresses in the
 *    Email column with a real address you control (e.g., your own)
 *    BEFORE running. Otherwise emails will bounce silently.
 * 4. Extensions → Apps Script (open from the sheet, not standalone)
 * 5. Paste this code, save, then run sendGradeEmails()
 * 6. Check View → Execution log for diagnostic output
 * 7. Reload the spreadsheet to see the new "Grade Tools" menu
 */


// ── Configuration ──────────────────────────────────────────────
var SHEET_NAME = "Student Grades";   // Must exactly match your tab name
var DRY_RUN = false;                  // true = log what would happen, don't send
var TEST_MODE_REDIRECT = "";          // If set, ALL emails go to this address
                                       // (useful for demos — put your own email)


function sendGradeEmails() {
  Logger.log("=== sendGradeEmails started ===");

  // Get the active spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    var msg = "ERROR: No active spreadsheet. Are you running this from a standalone "
            + "script editor? Open the sheet and use Extensions > Apps Script instead.";
    Logger.log(msg);
    return;
  }
  Logger.log("Active spreadsheet: " + ss.getName());

  // Log all available tab names to help diagnose tab name mismatches
  var allSheets = ss.getSheets();
  var sheetNames = allSheets.map(function(s) { return s.getName(); });
  Logger.log("Available tabs: [" + sheetNames.join(", ") + "]");

  // Try to find the target sheet
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    var errorMsg = "ERROR: Sheet '" + SHEET_NAME + "' not found.\n"
                 + "Available tabs: " + sheetNames.join(", ") + "\n"
                 + "Fix: rename your tab to exactly '" + SHEET_NAME + "' "
                 + "OR change the SHEET_NAME constant at the top of this script.";
    Logger.log(errorMsg);
    try {
      SpreadsheetApp.getUi().alert(errorMsg);
    } catch (e) {
      // UI not available (running from standalone editor)
      Logger.log("(UI alert unavailable — check this log instead)");
    }
    return;
  }
  Logger.log("Found sheet: " + SHEET_NAME);

  // Get data
  var data = sheet.getDataRange().getValues();
  Logger.log("Total rows in sheet (including header): " + data.length);

  if (data.length < 2) {
    Logger.log("ERROR: Sheet has no data rows. Only header found.");
    return;
  }

  // Log the header row to verify column layout
  Logger.log("Header row: " + JSON.stringify(data[0]));

  var emailCount = 0;
  var errorCount = 0;
  var skippedCount = 0;

  // Process each student row
  for (var i = 1; i < data.length; i++) {
    var rowNum = i + 1; // 1-indexed sheet row number for logging
    var studentId   = data[i][0];
    var studentName = data[i][1];
    var email       = data[i][2];
    var module      = data[i][3];
    var caScore     = data[i][4];
    var examScore   = data[i][5];
    var finalGrade  = data[i][6];
    var status      = data[i][7];

    Logger.log("Row " + rowNum + ": " + studentName + " | " + email + " | grade=" + finalGrade + " | status='" + status + "'");

    // Skip rows already marked "Sent"
    if (status === "Sent") {
      Logger.log("  → SKIPPED (already sent)");
      skippedCount++;
      continue;
    }

    // Skip rows with missing data
    // Note: use == null and !== '' instead of !value to correctly handle grade of 0
    if (!email || !studentName || finalGrade == null || finalGrade === "") {
      Logger.log("  → SKIPPED (missing data)");
      sheet.getRange(rowNum, 8).setValue("Skipped - missing data");
      skippedCount++;
      continue;
    }

    // Build the email
    var recipient = TEST_MODE_REDIRECT || email;
    var performanceMessage = getPerformanceMessage(finalGrade, studentName);
    var subject = module + " — Your Grade Results";
    var body = "Dear " + studentName.split(" ")[0] + ",\n\n"
      + "Here are your results for " + module + ":\n\n"
      + "   CA Score:      " + caScore + " / 100\n"
      + "   Exam Score:    " + examScore + " / 100\n"
      + "   Final Grade:   " + finalGrade + " / 100\n\n"
      + performanceMessage + "\n\n"
      + "If you have any questions about your grades, please book a consultation slot.\n\n"
      + "Best regards,\n"
      + "School of Mathematical Sciences and Analytics";

    if (TEST_MODE_REDIRECT) {
      body = "[TEST MODE — originally addressed to " + email + "]\n\n" + body;
    }

    // Send (or simulate) the email
    if (DRY_RUN) {
      Logger.log("  → DRY RUN: would send to " + recipient);
      sheet.getRange(rowNum, 8).setValue("Would send (dry run)");
      emailCount++;
    } else {
      try {
        GmailApp.sendEmail(recipient, subject, body);
        sheet.getRange(rowNum, 8).setValue("Sent");
        Logger.log("  → SENT to " + recipient);
        emailCount++;
      } catch (error) {
        sheet.getRange(rowNum, 8).setValue("Error: " + error.message);
        Logger.log("  → ERROR: " + error.message);
        errorCount++;
      }
    }
  }

  // Summary
  var summary = "=== Done ===\n"
              + "Emails sent: " + emailCount + "\n"
              + "Skipped: " + skippedCount + "\n"
              + "Errors: " + errorCount;
  Logger.log(summary);

  try {
    SpreadsheetApp.getUi().alert(summary);
  } catch (e) {
    Logger.log("(UI alert unavailable — results above)");
  }
}


/**
 * Returns a personalised performance message based on the final grade.
 */
function getPerformanceMessage(grade, name) {
  var firstName = name.split(" ")[0];
  if (grade >= 80) {
    return "Excellent work, " + firstName
      + "! You've demonstrated a strong understanding of the material. Keep it up!";
  } else if (grade >= 60) {
    return "Good effort, " + firstName
      + ". You're on the right track. Review the areas where you lost marks to strengthen your understanding.";
  } else if (grade >= 50) {
    return "You've passed, " + firstName
      + ", but there's room for improvement. I recommend attending consultation sessions and reviewing the tutorial questions.";
  } else {
    return "Hi " + firstName
      + ", your grade is below the passing mark. Please book a consultation session so we can discuss a study plan together. Support is available — don't hesitate to reach out.";
  }
}


/**
 * Clears the Status column so you can re-run the script.
 * Useful during demos when you want to reset and send again.
 */
function resetStatusColumn() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    Logger.log("Sheet '" + SHEET_NAME + "' not found");
    return;
  }
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  sheet.getRange(2, 8, lastRow - 1, 1).clearContent();
  Logger.log("Cleared Status column from row 2 to " + lastRow);
}


/**
 * Adds a custom menu to the spreadsheet UI when it opens.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Grade Tools")
    .addItem("Send Grade Emails", "sendGradeEmails")
    .addSeparator()
    .addItem("Reset Status Column", "resetStatusColumn")
    .addToUi();
}
