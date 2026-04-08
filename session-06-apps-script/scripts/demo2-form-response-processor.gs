/**
 * Demo 2: Form Response Processor
 *
 * Triggered automatically when a student submits a Google Form.
 * It processes the response, logs it to a summary tracker sheet,
 * sends an acknowledgement email to the student, and sends a
 * digest email to the lecturer when critical feedback is received.
 *
 * Form fields expected:
 *   Student Name | Student ID | Module | Feedback Category | Comments | Rating (1-5)
 *
 * Setup:
 *   1. Create a Google Form with the fields above
 *   2. Link the form to this spreadsheet (Responses tab auto-created)
 *   3. Run setupTrigger() once to install the form submit trigger
 */


// ── Configuration ──────────────────────────────────────────────
var CONFIG = {
  lecturerEmail: "lecturer@sp.edu.sg",        // Change to actual email
  lecturerName: "Dr. Tan",
  summarySheetName: "Feedback Summary",
  criticalRatingThreshold: 2                   // Ratings at or below this trigger an alert
};


/**
 * Processes a form submission event.
 * This function is called automatically by the form submit trigger.
 */
function onFormSubmit(e) {
  var responses = e.namedValues;

  // Extract form fields
  var studentName = responses["Student Name"][0];
  var studentId   = responses["Student ID"][0];
  var module      = responses["Module"][0];
  var category    = responses["Feedback Category"][0];
  var comments    = responses["Comments"][0];
  var rating      = parseInt(responses["Rating (1-5)"][0]);
  var timestamp   = new Date();

  // Step 1: Log to the summary tracker sheet
  logToSummary(timestamp, studentName, studentId, module, category, comments, rating);

  // Step 2: Send acknowledgement to the student
  sendAcknowledgement(studentName, studentId, category);

  // Step 3: Alert lecturer if the rating is critical
  if (rating <= CONFIG.criticalRatingThreshold) {
    alertLecturer(studentName, studentId, module, category, comments, rating);
  }
}


/**
 * Logs the feedback to a summary tracker sheet.
 * Creates the sheet if it doesn't exist.
 */
function logToSummary(timestamp, name, id, module, category, comments, rating) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.summarySheetName);

  // Create the summary sheet with headers if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.summarySheetName);
    sheet.appendRow([
      "Timestamp", "Student Name", "Student ID", "Module",
      "Category", "Comments", "Rating", "Priority", "Followed Up"
    ]);
    // Format header row
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#f3f3f3");
    sheet.setFrozenRows(1);
  }

  // Determine priority based on rating
  var priority = "Normal";
  if (rating <= CONFIG.criticalRatingThreshold) {
    priority = "High";
  } else if (rating >= 4) {
    priority = "Positive";
  }

  // Append the feedback row
  sheet.appendRow([
    timestamp, name, id, module,
    category, comments, rating, priority, ""
  ]);

  // Colour-code the priority cell
  var lastRow = sheet.getLastRow();
  var priorityCell = sheet.getRange(lastRow, 8);
  if (priority === "High") {
    priorityCell.setBackground("#fce8e6").setFontColor("#c5221f");
  } else if (priority === "Positive") {
    priorityCell.setBackground("#e6f4ea").setFontColor("#137333");
  }
}


/**
 * Sends an acknowledgement email to the student.
 * Uses the student ID to construct the SP email address.
 */
function sendAcknowledgement(name, id, category) {
  // Construct student email from ID (SP convention)
  var email = id + "@mymail.sp.edu.sg";
  var firstName = name.split(" ")[0];

  var subject = "We received your feedback — thank you!";
  var body = "Dear " + firstName + ",\n\n"
    + "Thank you for submitting your feedback on \"" + category + "\".\n\n"
    + "Your input helps us improve the learning experience for everyone. "
    + "If your feedback requires follow-up, your lecturer will be in touch.\n\n"
    + "Best regards,\n"
    + "School of Mathematical Sciences and Analytics";

  try {
    GmailApp.sendEmail(email, subject, body);
  } catch (error) {
    Logger.log("Failed to send acknowledgement to " + email + ": " + error.message);
  }
}


/**
 * Sends an alert email to the lecturer when critical feedback is received.
 */
function alertLecturer(name, id, module, category, comments, rating) {
  var subject = "⚠ Critical Student Feedback — " + module;
  var body = "Hi " + CONFIG.lecturerName + ",\n\n"
    + "A student has submitted feedback that may require your attention:\n\n"
    + "   Student:   " + name + " (" + id + ")\n"
    + "   Module:    " + module + "\n"
    + "   Category:  " + category + "\n"
    + "   Rating:    " + rating + " / 5\n"
    + "   Comments:  " + comments + "\n\n"
    + "Please follow up at your earliest convenience. "
    + "The feedback has been logged in the \"" + CONFIG.summarySheetName + "\" sheet.\n\n"
    + "— Automated Feedback System";

  try {
    GmailApp.sendEmail(CONFIG.lecturerEmail, subject, body);
  } catch (error) {
    Logger.log("Failed to send lecturer alert: " + error.message);
  }
}


/**
 * Run this function ONCE to set up the form submission trigger.
 * After running, the onFormSubmit function will fire automatically
 * whenever a student submits the linked Google Form.
 */
function setupTrigger() {
  // Remove any existing triggers to avoid duplicates
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "onFormSubmit") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Create a new form submit trigger
  ScriptApp.newTrigger("onFormSubmit")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();

  SpreadsheetApp.getUi().alert(
    "Trigger installed!\n\n"
    + "The onFormSubmit function will now run automatically "
    + "whenever a student submits the linked form."
  );
}


/**
 * Adds a custom menu for setup and manual testing.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Feedback Tools")
    .addItem("Set Up Form Trigger", "setupTrigger")
    .addSeparator()
    .addItem("View Feedback Summary", "goToSummary")
    .addToUi();
}


/**
 * Navigates to the Feedback Summary sheet.
 */
function goToSummary() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.summarySheetName);
  if (sheet) {
    ss.setActiveSheet(sheet);
  } else {
    SpreadsheetApp.getUi().alert("No feedback has been processed yet.");
  }
}
