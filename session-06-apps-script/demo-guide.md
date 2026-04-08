# Session 6: Apps Script Generation with Gemini — Demo Guide

**Duration:** 45 min (30 min demos + 15 min hands-on exercise)
**Instructor materials:** This guide, sample data CSVs, reference scripts

---

## Pre-Session Setup (do this before the workshop)

### 1. Prepare the Demo Spreadsheet

1. Create a new Google Sheet named **"Apps Script Demo — Grade Notifications"**
2. Import `sample-data/student-grades.csv` into a sheet tab named **"Student Grades"**
3. Verify columns: Student ID | Student Name | Email | Module | CA Score | Exam Score | Final Grade | Status
4. Leave the **Status** column (H) empty — the script will populate it

### 2. Prepare the Demo Form & Response Sheet

1. Create a new Google Form named **"Student Feedback Form"** with these fields:
   - Student Name (Short answer)
   - Student ID (Short answer)
   - Module (Dropdown: ST0001 Statistics I)
   - Feedback Category (Dropdown: Pace of Lectures, Tutorial Quality, Additional Support, Assessment, Other)
   - Comments (Paragraph)
   - Rating (1-5) (Linear scale)
2. Link the form responses to a new Google Sheet named **"Apps Script Demo — Feedback Processor"**
3. Pre-populate a few test responses using `sample-data/feedback-form-responses.csv` or submit through the form manually

### 3. Open Gemini

- Open [gemini.google.com](https://gemini.google.com) in a separate browser tab
- Ensure you're logged in with the workshop Google Workspace account

---

## Demo Flow

### Opening Context (5 min) — No screen share needed

**Key talking points:**

> "This morning you used Gemini to help you write emails, create documents, and analyse data in Sheets. Those are all things you do *inside* Google Workspace apps."
>
> "But what about the repetitive tasks that span across apps? Sending 30 personalised grade emails. Processing every form response. Creating calendar events from a spreadsheet. That's where **Google Apps Script** comes in."
>
> "Apps Script is a JavaScript-based automation platform built into Google Workspace. You don't need to install anything — it's already there in every Sheet, Doc, and Form you create."
>
> "The best part? **You don't need to know how to code.** You can use Gemini to generate the scripts for you. Let me show you."

---

### Demo 1: Auto-Email Grades (12 min)

**What participants will see:** A complete workflow from prompting Gemini → getting a script → pasting it into the script editor → running it → seeing emails sent and status updated in the sheet.

#### Step 1: Show the data (1 min)

Switch to the **"Apps Script Demo — Grade Notifications"** spreadsheet. Walk through the data:

> "Here's a typical grade sheet — 12 students, their CA and exam scores, and their final grades. Column H is empty — that's where we'll track which students have been emailed."

#### Step 2: Prompt Gemini live (3 min)

Switch to Gemini. Type this prompt (or paste it — but typing feels more authentic):

```
Act as a Google Apps Script developer. Write a script that:

- Reads student data from a Google Sheet tab named "Student Grades"
- The columns are: Student ID, Student Name, Email, Module, CA Score, Exam Score, Final Grade, Status
- For each student where Status is empty, send a personalised email with their grades
- Include a performance message: encouraging for scores above 80, supportive for below 50, and constructive for those in between
- Write "Sent" in the Status column after each email is sent
- Add a custom menu item called "Grade Tools" > "Send Grade Emails" so I can run it from the spreadsheet menu
- Include comments explaining each section
- Handle errors gracefully
```

**While Gemini generates**, narrate:

> "Notice the prompt structure — I'm telling Gemini the exact sheet name, the column layout, and exactly what I want it to do. The more specific you are, the better the output."

#### Step 3: Review the generated code (2 min)

Scroll through Gemini's output. Highlight:

- The `onOpen()` function that creates the custom menu
- The loop that processes each row
- The grade-tier logic for personalised messages
- The error handling with try/catch
- The status update that writes "Sent" back to the sheet

> "I didn't write any of this. Gemini understood my intent and produced working code. Let's test it."

**Instructor note:** If the generated code differs significantly from the reference script (`scripts/demo1-auto-email-grades.gs`), you can either use Gemini's output as-is (if it looks correct) or switch to the reference script. The reference script is tested and guaranteed to work.

#### Step 4: Paste into Apps Script Editor (3 min)

1. In the spreadsheet, go to **Extensions → Apps Script**
2. Delete the default `function myFunction() {}` code
3. Paste the generated code (or the reference script)
4. Click **Save** (💾 or Ctrl+S)
5. Name the project: "Grade Emailer"

> "Every Google Sheet has a script editor built in. Extensions → Apps Script. That's it — no setup, no installation."

#### Step 5: Run and authorise (2 min)

1. From the script editor, select `sendGradeEmails` in the function dropdown
2. Click **Run** ▶
3. Walk through the **authorisation flow**:
   - "Review permissions" → Select your account → "Advanced" → "Go to Grade Emailer (unsafe)" → "Allow"

> "The first time you run a script, Google asks you to authorise it. This is because the script needs permission to read your spreadsheet and send emails on your behalf. This is a one-time step."

4. Return to the spreadsheet — show the **Status column** now populated with "Sent"
5. Open Gmail — show the sent emails in the outbox

> "12 personalised emails, each with the student's name, their individual scores, and a message tailored to their performance — all sent in about 3 seconds."

#### Step 6: Show the custom menu (1 min)

1. Reload the spreadsheet (the `onOpen` function needs a fresh load)
2. Show the new **Grade Tools** menu in the menu bar
3. Click **Grade Tools → Send Grade Emails**

> "Now anyone who opens this spreadsheet can send grade emails with one click. No code knowledge needed to *use* the script — only to *create* it, and Gemini handled that."

---

### Demo 2: Form Response Processor (10 min)

**What participants will see:** A script that automatically fires when a form is submitted, logs the response to a summary tracker, sends an acknowledgement to the student, and alerts the lecturer for critical feedback.

#### Step 1: Show the form and existing responses (1 min)

Open the **"Apps Script Demo — Feedback Processor"** spreadsheet. Show the form responses tab.

> "This is a student feedback form linked to this sheet. Right now, responses just pile up here. Wouldn't it be useful if the system could automatically acknowledge the student, flag critical feedback, and create a clean summary for me?"

#### Step 2: Prompt Gemini live (3 min)

Switch to Gemini:

```
Act as a Google Apps Script developer. Write a script for a Google Sheet that is linked to a Google Form collecting student feedback.

The form has these fields: Student Name, Student ID, Module, Feedback Category, Comments, Rating (1-5).

When a form is submitted, the script should automatically:

1. Log the response to a new sheet tab called "Feedback Summary" with columns: Timestamp, Student Name, Student ID, Module, Category, Comments, Rating, Priority, Followed Up
2. Set Priority to "High" if rating is 2 or below, "Positive" if 4 or above, "Normal" otherwise
3. Colour-code the Priority cell: red background for High, green for Positive
4. Send an acknowledgement email to the student (construct email as studentid@mymail.sp.edu.sg)
5. If the rating is 2 or below, also send an alert email to the lecturer at lecturer@sp.edu.sg with the student's details and comments

Include:
- A setupTrigger() function that installs the form submit trigger
- A custom menu with "Set Up Form Trigger" option
- A configuration section at the top for easy customisation
- Comments explaining each section
- Error handling
```

**While generating**, highlight the prompt structure:

> "This is a more complex automation — it spans Forms, Sheets, and Gmail. Notice I'm describing the *workflow*, not the code. I'm telling Gemini what should happen at each step."

#### Step 3: Review and paste (2 min)

Review the output briefly, then paste into the script editor (Extensions → Apps Script from the Feedback Processor sheet).

**Instructor note:** If time is tight or the generated code has issues, switch to the reference script (`scripts/demo2-form-response-processor.gs`).

#### Step 4: Set up the trigger (1 min)

1. Run `setupTrigger()` from the script editor
2. Authorise when prompted
3. Show the confirmation alert

> "This is different from Demo 1. Instead of running manually, this script fires *automatically* every time a student submits the form. That's the power of triggers."

#### Step 5: Live test — submit a form response (3 min)

1. Open the Google Form in a new tab (or use the form preview link)
2. Submit a test response with a **low rating** (1 or 2):
   - Student Name: Test Student
   - Student ID: 2401099
   - Module: ST0001 Statistics I
   - Feedback Category: Additional Support
   - Comments: "I'm really struggling with the probability chapter and need extra help"
   - Rating: 1
3. Return to the spreadsheet — show the new **"Feedback Summary"** tab with the colour-coded row
4. Open Gmail — show both the student acknowledgement and the lecturer alert

> "The student gets an immediate acknowledgement. I get an alert because the rating was critical. And the Feedback Summary sheet gives me a clean, prioritised view of all feedback — no manual sorting needed."

---

### Transition to Hands-On (3 min)

Recap and frame the exercise:

> "You've now seen two patterns:
> 1. **Manual trigger** — a script you run from a menu button (grade emails)
> 2. **Automatic trigger** — a script that fires on an event like a form submission
>
> These two patterns cover most automation needs. Now it's your turn."

---

## Hands-On Exercise (15 min)

### Instructions for Participants

Choose **one** scenario based on your comfort level:

---

#### Option A: Beginner — Personalised Email Sender

**Goal:** Use Gemini to generate a script that sends a personalised email to each student in a Sheets list.

**Steps:**

1. Make a copy of the demo spreadsheet, or create a new sheet with columns: Name, Email, Subject, Message
2. Add 3–5 rows of sample data (use your own email for testing)
3. Open Gemini and write a prompt asking it to generate an Apps Script that:
   - Reads each row from your sheet
   - Sends an email to each person with a personalised subject and message
   - Marks each row as "Sent" after emailing
4. Copy the generated script into Extensions → Apps Script
5. Run the script and check your inbox

**Starter prompt if you're stuck:**

```
Act as a Google Apps Script developer. Write a script that reads
data from a Google Sheet with columns Name, Email, Subject, and
Message. For each row, send an email using the Email, Subject, and
Message values. After sending, write "Sent" in a new column E.
Add a custom menu item to run the script. Include comments.
```

**Success criteria:** You receive the test emails and see "Sent" in column E.

---

#### Option B: Intermediate — Form-Triggered Automation

**Goal:** Use Gemini to generate a script triggered by form submissions that logs responses and sends a summary email to you.

**Steps:**

1. Create a simple Google Form (e.g., "Workshop Feedback" with fields: Name, Session Rating 1-5, Comments)
2. Link the form to a new Google Sheet
3. Open Gemini and write a prompt asking it to generate an Apps Script that:
   - Fires automatically when the form is submitted
   - Logs the response to a "Summary" sheet tab with a priority flag
   - Sends you an email summary of the submission
   - Includes a `setupTrigger()` function
4. Paste the script, run `setupTrigger()`, then submit a test response through the form
5. Verify the Summary tab is populated and you received the email

**Starter prompt if you're stuck:**

```
Act as a Google Apps Script developer. Write a script for a Google
Sheet linked to a Google Form with fields: Name, Session Rating (1-5),
Comments. When a form is submitted, automatically:
1. Log the response to a "Summary" tab with columns: Timestamp, Name,
   Rating, Comments, Priority (High if rating <=2, Normal otherwise)
2. Send an email to me@example.com with the submission details
3. Colour the Priority cell red for High priority
Include a setupTrigger() function and a custom menu. Add comments.
```

**Success criteria:** Submitting the form automatically creates a row in the Summary tab and sends you an email.

---

### Instructor Notes for Exercise Facilitation

- **Circulate and help** with the authorisation flow — this is where most participants get stuck
- **Common issue:** "This app isn't verified" warning. Guide them through: Advanced → Go to [Project Name] (unsafe) → Allow
- **Common issue:** Script runs but no emails appear. Check: Is the email address correct? Check Spam folder. Is there a daily email quota limit?
- **For fast finishers:** Challenge them to add a time-based trigger (e.g., send a weekly digest) or add conditional formatting to the tracker sheet via script
- **If someone's script from Gemini doesn't work:** Debug together — this is a learning moment. Show how to read the error message in the Execution Log (View → Execution log) and ask Gemini to fix the error by pasting the error message

---

## Key Takeaways to Reinforce

After the exercise, briefly recap before moving to Session 7:

1. **You don't need to be a programmer** — Gemini generates the code; you describe the workflow
2. **Apps Script is already everywhere** — Extensions → Apps Script in any Sheet, Doc, or Form
3. **Two automation patterns** — manual (menu button) and automatic (triggers on events or schedules)
4. **Iterate with Gemini** — if the first script isn't perfect, paste the error back into Gemini and ask it to fix it
5. **This is the bridge** — from using Gemini *inside* apps (morning sessions) to building automations *across* apps (this session) to building full agents (next session)

---

## File Inventory

```
session-06-apps-script/
├── demo-guide.md                              ← This file (instructor guide)
├── sample-data/
│   ├── student-grades.csv                     ← Import into Demo 1 spreadsheet
│   ├── module-schedule.csv                    ← Reference data for exercises
│   └── feedback-form-responses.csv            ← Pre-populate Demo 2 form responses
└── scripts/
    ├── demo1-auto-email-grades.gs             ← Reference script for Demo 1
    └── demo2-form-response-processor.gs       ← Reference script for Demo 2
```

**Important:** The reference scripts in `scripts/` are fallbacks. The *intended* demo flow is to generate the code live with Gemini. Use the reference scripts if:
- Gemini produces code with errors and debugging would take too long
- Network issues prevent access to Gemini during the demo
- You want to pre-load the scripts to save time and focus on the walkthrough
