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
 */

function sendGradeEmails() {
  // Get the active spreadsheet and sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Student Grades");

  if (!sheet) {
    SpreadsheetApp.getUi().alert("Sheet 'Student Grades' not found. Please rename your sheet.");
    return;
  }

  // Get all data starting from row 2 (skip header)
  var data = sheet.getDataRange().getValues();
  var header = data[0];
  var emailCount = 0;
  var errorCount = 0;

  // Process each student row (skip header at index 0)
  for (var i = 1; i < data.length; i++) {
    var studentId   = data[i][0];
    var studentName = data[i][1];
    var email       = data[i][2];
    var module      = data[i][3];
    var caScore     = data[i][4];
    var examScore   = data[i][5];
    var finalGrade  = data[i][6];

    // Skip rows that have already been emailed
    if (data[i][7] === "Sent") {
      continue;
    }

    // Skip rows with missing data
    if (!email || !studentName || !finalGrade) {
      sheet.getRange(i + 1, 8).setValue("Skipped - missing data");
      continue;
    }

    // Determine performance tier and message
    var performanceMessage = getPerformanceMessage(finalGrade, studentName);

    // Build the email body
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

    // Send the email
    try {
      GmailApp.sendEmail(email, subject, body);
      sheet.getRange(i + 1, 8).setValue("Sent");
      emailCount++;
    } catch (error) {
      sheet.getRange(i + 1, 8).setValue("Error: " + error.message);
      errorCount++;
    }
  }

  // Show summary
  SpreadsheetApp.getUi().alert(
    "Done!\n\n"
    + "Emails sent: " + emailCount + "\n"
    + "Errors: " + errorCount
  );
}


/**
 * Returns a personalised performance message based on the final grade.
 */
function getPerformanceMessage(grade, name) {
  if (grade >= 80) {
    return "Excellent work, " + name.split(" ")[0]
      + "! You've demonstrated a strong understanding of the material. Keep it up!";
  } else if (grade >= 60) {
    return "Good effort, " + name.split(" ")[0]
      + ". You're on the right track. Review the areas where you lost marks to strengthen your understanding.";
  } else if (grade >= 50) {
    return "You've passed, " + name.split(" ")[0]
      + ", but there's room for improvement. I recommend attending consultation sessions and reviewing the tutorial questions.";
  } else {
    return "Hi " + name.split(" ")[0]
      + ", your grade is below the passing mark. Please book a consultation session so we can discuss a study plan together. Support is available — don't hesitate to reach out.";
  }
}


/**
 * Adds a custom menu to the spreadsheet UI when it opens.
 * This lets the instructor run the script from a menu button
 * instead of the script editor.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Grade Tools")
    .addItem("Send Grade Emails", "sendGradeEmails")
    .addToUi();
}
