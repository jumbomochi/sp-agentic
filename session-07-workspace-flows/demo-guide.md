# Session 7: Workspace Studio Flows — Demo Guide

**Duration:** 45 min (25 min demo/walkthrough + 20 min hands-on exercise)
**Instructor materials:** This guide, test email templates (`sample-documents/test-emails.md`), slide deck

---

## Pre-Session Setup (do this before the workshop)

### 1. Verify Workspace Studio Access

1. Open [https://studio.workspace.google.com/](https://studio.workspace.google.com/) in a browser signed in with the workshop Google Workspace account.
2. Verify the Discover page loads and shows:
   - A "Describe a task for Gemini" input field
   - A `+` button in the left sidebar (tooltip: "New flow")
   - A "My flows" tab in the left sidebar
3. If the page does not load or shows an access-denied error, the Workspace admin needs to enable Workspace Studio for the account. Admin Console → Apps → Google Workspace → Gemini → Studio → Enable.

### 2. Prepare Gmail label and Chat notification target

1. In Gmail, create a new label:
   - Settings → See all settings → Labels → **Create new label**
   - Label name: **`Urgent-Student`** (exact spelling — the flow references this string)
2. Verify you can receive a `Notify me in Chat` message:
   - Open Google Chat
   - Either use a DM-with-self space, or create a dedicated **`Workshop Test`** space
   - Note the space name — you'll select it as the target in Step E of the live build

### 3. Build and disable a backup flow

Build the complete Intelligent Inbox Triage flow once in advance (follow the Live Build section below), then disable it. Name it **`Intelligent Inbox Triage (backup)`**. Keep it disabled until needed as a fallback if the live build breaks.

### 4. Prepare test emails

Open `sample-documents/test-emails.md` and keep it accessible during the demo. Two templates are needed for the live walkthrough:

- **Test Email #1 — Urgent student** (for the main trigger)
- **Test Email #2 — Positive feedback** (for the iteration beat)

Have these ready to send from your phone or a second browser account. Sending from a different device makes the "live fire" feel more authentic — participants see the email arrive as an external event rather than something you typed into the same tab.

### 5. Verify `Check if` semantics (one-time investigation)

On a throwaway flow, add a `Check if` step and click through its configuration to determine:

- Does it branch (then/else paths), or does it act as a gate (halt flow if false)?
- Does it support structured field matching on the previous step's output, or only substring matching?

Note the answers — you'll need them when configuring Step D of the live build. If the answer is "substring matching only", the instructions below already accommodate that; if structured matching is available, use it for cleaner configuration.

---

## Demo Flow

### Opening Context (3 min) — No screen share needed

**Key talking points:**

> "In Session 6, you just watched Gemini write Apps Script for you — JavaScript code that runs in the background and automates your grading workflow. That's powerful, but it's still code: you have to read it, trust it, paste it, authorise it, and debug it when something goes wrong."
>
> "In this session, we're going to build the same kind of automation — but without a single line of code. And with AI as a first-class step inside the pipeline, not something you have to call from an API."
>
> "The product is called **Workspace Studio Flows** — it lives at `studio.workspace.google.com`. If you've ever used Microsoft Power Automate with Copilot steps, Zapier, or IFTTT, this will feel instantly familiar: triggers, actions, visual builder. The difference is that Workspace Studio is native to Google Workspace, so it sees your Gmail, Sheets, Drive, Docs, Chat, Meet, and Calendar without any connectors or auth headaches."

**For Copilot Studio / Power Automate users:**

> "Workspace Studio Flows are conceptually equivalent to Power Automate with built-in Copilot steps. Both are visual, event-driven, no-code, cross-app within their ecosystems — and both let you treat AI as one configurable step inside a larger pipeline."

---

### Gems / Apps Script / Flows — Comparison (2 min)

Display this table on screen (or on a slide):

| | **Gems** | **Apps Script (Session 6)** | **Workspace Studio Flows (Session 7)** |
|---|---|---|---|
| **What it is** | A custom prompt for chat | Code that runs on events or schedules | A visual, event-driven pipeline with AI steps |
| **How you build it** | Describe a persona and instructions | Ask Gemini to write JavaScript for you | Drag and configure steps in a visual builder |
| **Where AI lives** | The entire experience *is* the AI | External — you call the API if you need AI inside a script | Built-in `Ask Gemini` step you drop into the flow |
| **Triggered by** | You, manually, in chat | Menu clicks, time schedules, form submits | Gmail, Chat, Sheets, Drive, Forms, Meet, Calendar events, or schedules |
| **Best for** | Custom reasoning on ad-hoc queries | Complex logic, unusual integrations, full control | Cross-app automation where AI reasoning is one step among many |

> "These three tools aren't competing — they cover different territories. Use Gems when you want custom chat. Use Apps Script when you need full control over complex logic. Use Flows when you want to glue apps together with some AI reasoning in the middle, without writing code."

---

### Show the Problem First (3 min)

**Goal:** Make the audience *feel* the problem before showing the solution.

1. Switch to Gmail and show your (or a demo account's) inbox.
2. Scroll through a few recent emails. Point out the mix: urgent student emails, admin notifications, newsletters, personal emails.

> "Look at this. Every one of these emails gets the same treatment — a notification, a bold subject line, a spot in my inbox. But they're not all the same. A student emailing at midnight because they're failing a module is not the same as a weekly newsletter from the staff bulletin."
>
> "I could spend an hour every morning triaging this manually. Or I could write an Apps Script that parses subject lines with regex and applies labels — but what counts as 'urgent' isn't something regex can decide. It requires judgement."
>
> "What if Gemini triaged every incoming email for me — read it, decided what it was about, and pinged me in Chat only for the urgent ones? No code. No API keys. Just a visual flow with Gemini as one of the steps. Let me show you."

Switch to `studio.workspace.google.com`.

---

### Live Build: Intelligent Inbox Triage (13 min)

**What participants will see:** A complete 5-node flow built from scratch in Workspace Studio. When the instructor sends themselves an email, the flow fires, classifies the email using Gemini, and pings Chat for urgent ones.

**The flow at a glance:**

```
[Trigger]  When I get an email  (filtered: subject contains "[DEMO]")
    ↓
[Step 1]   Ask Gemini            (classify + extract — custom prompt)
    ↓
[Step 2]   Check if              (classification == "URGENT_STUDENT")
    ↓
[Step 3]   Notify me in Chat     (formatted summary with extracted fields)
    ↓
[Step 4]   Add labels            (apply "Urgent-Student" label)
```

#### Step A: Create the flow (1 min)

1. At `studio.workspace.google.com`, click the **`+`** button in the top-left sidebar (tooltip: "New flow").
2. You land on an empty flow canvas with a "Choose a starter" prompt on the right.
3. At the top of the canvas, click the "Untitled flow" name field and rename to: **`Intelligent Inbox Triage`**.

#### Step B: Configure the trigger (2 min)

1. In the "Choose a starter" panel, select **`When I get an email`**.
2. In the trigger configuration:
   - Set **Subject contains:** `[DEMO]`
   - Leave other filters blank

> "This filter matters a lot. Without it, this flow would fire on *every single email* I receive during the next 45 minutes of workshop, and I'd get a Chat notification for every newsletter and spam that lands. In production, you'd filter by label, by sender, or by a specific mailing address. For a live demo, the `[DEMO]` subject prefix is the safest filter."

#### Step C: Add the `Ask Gemini` step (5 min) — the star of the demo

1. Under **Actions**, click **`Choose a step`**.
2. In the "Add step" panel, click the top card: **`Ask Gemini`** (under "Write, reason, and transform content with AI").
3. In the prompt field, type (or paste) the following. Where you see `{{email subject}}`, `{{email sender}}`, `{{email body}}`, use Workspace Studio's variable picker to insert the trigger's fields — don't type the `{{...}}` literally.

    ```
    You are an email triage assistant for a Singapore Polytechnic lecturer.

    Classify this email into exactly ONE of these categories:
    - URGENT_STUDENT: a student needs help now (missed assessment,
      struggling with material, extension request, personal difficulty)
    - ADMIN_REQUEST: a routine admin task (forms, approvals, room bookings)
    - NEWSLETTER: a mailing list, marketing, or promotional email
    - OTHER: anything else, including positive messages and thank-yous

    Then extract:
    - The sender's name
    - A one-sentence summary of what they actually want
    - Any dates or deadlines mentioned in the email

    Respond in EXACTLY this format, one field per line:
    CATEGORY: <one of URGENT_STUDENT, ADMIN_REQUEST, NEWSLETTER, OTHER>
    SENDER: <name>
    SUMMARY: <one sentence>
    DATES: <comma-separated dates, or the word "none">

    EMAIL TO TRIAGE:
    Subject: {{email subject}}
    From: {{email sender}}
    Body: {{email body}}
    ```

4. **Narration while typing** (slow down for this — it's the most important teaching moment in the whole session):

> "Notice the structure of this prompt. I'm telling Gemini what *role* it's playing — an email triage assistant for a lecturer."
>
> "I'm giving it a closed set of categories — four, and only four. Gemini classifies much better when the options are explicit and limited. 'Tell me what this email is about' is a terrible prompt. 'Pick one of these four' is a great one."
>
> "I'm asking for a rigid output format. Every field on its own line. Exact labels. That's because the next step has to *read* this output programmatically — if the format drifts, the next step breaks."
>
> "This is exactly the same prompt-engineering discipline from Session 2 Gems and Session 3 `=AI()` cells — same skill, different surface."

#### Step D: Add the `Check if` branching (2 min)

1. Under Actions, click **`Choose a step`** → scroll to **Tools** → select **`Check if`**.
2. Configure the condition: *previous step output contains `CATEGORY: URGENT_STUDENT`*.
   - If the UI exposes structured field matching, compare the `CATEGORY` field to `URGENT_STUDENT` directly.
   - If only substring matching is available, use the exact substring `CATEGORY: URGENT_STUDENT`.

> "This is a no-code `if` statement. The next two actions only run when Gemini's classification is urgent — everything else silently falls off the end of the flow. No Chat pings. No labels. Just dropped."

#### Step E: Add `Notify me in Chat` (2 min)

1. Under Actions (inside the `Check if` then branch), click **`Choose a step`** → scroll to **Chat** → select **`Notify me in Chat`**.
2. Set the target to your pre-prepared Chat space (DM-with-self or the dedicated `Workshop Test` space from pre-session setup).
3. For the message body, use the variable picker to insert the `SENDER`, `SUMMARY`, `DATES`, and `email subject` fields where shown:

    ```
    🚨 Urgent student email

    From: {{Ask Gemini output: SENDER}}
    Summary: {{Ask Gemini output: SUMMARY}}
    Dates: {{Ask Gemini output: DATES}}

    Original subject: {{email subject}}
    ```

#### Step F: Add `Add labels` (1 min)

1. Under Actions, click **`Choose a step`** → scroll to **Gmail** → select **`Add labels`**.
2. **Target email:** the email from the trigger (should be auto-selected)
3. **Label:** `Urgent-Student` (the label you created in pre-session setup)

#### Step G: Save and enable (30 sec)

1. Click **Save** (top-right).
2. Toggle the flow to **Enabled** (if there is an enable switch).

---

### Trigger the demo live (2 min)

1. Pull out your phone. Open the workshop email account.
2. Compose a new message to yourself with:
   - **Subject:** `[DEMO] Can I get an extension on CA Test 2?`
   - **Body:** paste Test Email #1 from `sample-documents/test-emails.md`
3. Send.
4. Switch the shared screen to Google Chat. Wait 10–30 seconds.
5. **The flow fires.** A `🚨 Urgent student email` notification appears with the extracted sender, summary, and dates.
6. Switch to Gmail. Show the email with the `Urgent-Student` label applied.

**Payoff line:**

> "That's it. Five steps, one prompt, one filter. No code, no API keys, no deployment. And it composes AI reasoning *into* the automation — not just around it. The `Ask Gemini` step is where the judgement lives. The rest is plumbing."

---

### Iterate on the Flow (2 min)

**Goal:** Show participants that flows are refinable, just like Gems.

1. Frame it: *"Let me show you how you'd tighten this if Gemini misclassified something."*
2. Send the second test email (Test Email #2 — "Positive feedback"):
   - **Subject:** `[DEMO] Thanks for the tutorial yesterday!`
   - **Body:** paste Test Email #2 from `sample-documents/test-emails.md`
3. **Expected behavior:** Gemini classifies as `OTHER` → `Check if` does not fire → no Chat ping. Show this as correct. If Workspace Studio has an execution history tab, open it to show the flow ran but the branch was skipped.
4. **Fallback if Gemini misclassifies** (as `URGENT_STUDENT`):
   - Open the `Ask Gemini` step
   - Add this line to the prompt: *"Positive feedback and thank-you messages are OTHER, not URGENT_STUDENT — even when they mention a student's name."*
   - Save
   - Resend the test email
   - Show the corrected classification
5. Teaching point:

> "You iterate on the prompt, not on code. There's no JavaScript to debug, no try/catch to rewrite. You talk to Gemini, adjust its instructions, save, and try again. Same conversational refinement loop as Gems — just embedded inside an automation."

---

### Transition to Hands-On (2 min)

Recap the pattern:

> "You've seen one flow — but the pattern generalises:
>
> 1. **A trigger** — something that happens (email, schedule, form submit, file edit)
> 2. **An AI step** — where judgement happens (`Ask Gemini` with a custom prompt, or a pre-built AI skill like `Recap`, `Extract`, `Summarize`, `Decide`)
> 3. **Actions** — what the flow does next (Chat, Sheets, Tasks, Gmail, Docs)
>
> With 13 triggers and 20+ actions, you can build an enormous variety of automations from that pattern. Now it's your turn."

---

## Hands-On Exercise (20 min)

### Instructions for Participants

Choose **one** scenario based on your comfort level. All three build a flow that composes an AI step with at least one action. Success means your flow fires (either on trigger or via test run) and produces visible output somewhere (Chat, Gmail, Tasks, or a Sheet).

---

### Scenario A — Beginner: Morning Inbox Digest

**Recommended for:** anyone who has never used a no-code automation builder before.

**Goal:** Get a daily summary of your unread emails posted to Google Chat at 8 AM, without opening Gmail.

**Flow shape:**

```
On a schedule (daily, 8:00 AM)
    ↓
Recap unread emails       (pre-built AI skill)
    ↓
Notify me in Chat         (post the recap)
```

**Steps:**

1. Open `studio.workspace.google.com` → click **`+`** → name: `Morning Inbox Digest`
2. **Starter:** `On a schedule` → daily at 8:00 AM. *For the workshop, temporarily set the interval to the smallest supported unit (e.g., every 15 min) so you can verify without waiting a whole day. Remember to change it back to daily before leaving, or the flow will keep pinging you.*
3. **Add step:** `Recap unread emails` (under AI skills) — accept the default configuration
4. **Add step:** `Notify me in Chat` → target your own DM space, body:

    ```
    Good morning. Here's your inbox recap: {{recap output}}
    ```

5. Save + Enable
6. Wait for the schedule to fire, or use a test-run button if Workspace Studio exposes one

**Why it's beginner-friendly:** Uses a canned AI skill — no prompt writing. Only three nodes.

**Success criteria:** A Chat message appears containing a summary of your unread emails, grouped by priority.

---

### Scenario B — Intermediate: Email-to-Task Extractor

**Recommended for:** participants comfortable writing a short Gemini prompt from scratch.

**Goal:** When an email arrives mentioning a deadline or action item, automatically create a Google Task.

**Flow shape:**

```
When I get an email  (filtered: label is "inbox")
    ↓
Ask Gemini            (extract action items and deadlines)
    ↓
Check if              (did Gemini find an action item?)
    ↓
Create a task         (title + due date from Gemini output)
    ↓
Notify me in Chat     (confirmation)
```

**Starter Ask Gemini prompt:**

```
Look at this email and decide whether it contains an action item
the recipient needs to do, along with a deadline.

Respond in this exact format:
HAS_ACTION: YES or NO
ACTION: <one-sentence task description, or "none">
DEADLINE: <date in YYYY-MM-DD format, or "none">

Email:
Subject: {{email subject}}
Body: {{email body}}
```

**Configuration:**

- **Check if** condition: output contains `HAS_ACTION: YES`
- **Create a task:** title from the `ACTION` field, due date from the `DEADLINE` field
- **Notify me in Chat:**

    ```
    ✅ Task created from email: {{ACTION}} (due {{DEADLINE}})
    ```

**Success criteria:** Send yourself an email with a subject like "Please submit grades by Friday 2026-05-15" — a Google Task appears with that title and due date, and a confirmation pings in Chat. (Test Email #5 in `sample-documents/test-emails.md` is a ready-made test case.)

---

### Scenario C — Advanced: Student Query Router

**Recommended for:** participants who finished the demo early or want a real student-support workflow.

**Goal:** When a student emails you (identified by subject prefix), classify the query type using Gemini and route it differently depending on the category. Log every query to a tracking sheet.

**Flow shape:**

```
When I get an email  (filtered: subject contains "[ST0001]")
    ↓
Ask Gemini            (classify: content-question / admin-question /
                       urgent / positive-feedback)
    ↓
Check if              (category == "urgent") → Notify + Draft reply
    ↓
Check if              (category == "content-question") → Notify teaching space
    ↓
Add a row             (log query type and timestamp to tracking sheet)
```

**Starter Ask Gemini prompt:**

```
Classify this email from a student into exactly one category:
- urgent: missed assessment, extension request, personal difficulty
- content-question: asking about module material or exam topics
- admin-question: asking about schedule, venue, policies
- positive-feedback: thanks or positive comments

Respond with only one word: urgent, content-question,
admin-question, or positive-feedback.

Email:
Subject: {{email subject}}
Body: {{email body}}
```

**Configuration:**

- Chain `Check if` nodes (or use branching if supported) for at least two of the four categories with different `Notify me in Chat` + `Draft a reply` actions
- Create a tracking Google Sheet in advance with columns: `Timestamp | Sender | Category | Subject`
- Final step: `Add a row` to the tracking sheet with the classification result

**Success criteria:** Send yourself 2–3 test emails with `[ST0001]` in the subject and different query types. Each lands in the correct Chat space, gets a draft reply where applicable, and appears as a new row in the tracking sheet.

---

### Fallback — Bring Your Own Use Case

If none of the scenarios match a real workflow you have in mind, freeform-describe your use case in the **`Describe a task for Gemini`** field on the Workspace Studio landing page and see what starter flow it proposes. The instructor will circulate to help.

---

### Instructor Notes for Exercise Facilitation

- **Most common issue:** Trigger filter is too broad — the flow fires on every email during the workshop and ping-storms the participant. Show them how to narrow the filter (subject contains, specific label, specific sender) or temporarily disable the flow.
- **Second most common:** `Ask Gemini` output format drifts between runs → the downstream `Check if` stops matching. Fix: loosen the condition to substring matching, or tighten the prompt with "respond with ONLY the word X".
- **Third most common:** Participant can't find where previous step variables are exposed in the next step's configuration. UI-specific muscle — demonstrate the variable picker on a volunteer's screen if multiple people get stuck.
- **Running out of time:** Anyone still building at the 15-min mark should test-trigger their flow even if incomplete. *A* working flow beats a perfect-but-untested one.
- **Finished early:** Challenge them to add a second branch to their `Check if`, or try the pre-built AI skills (`Extract`, `Decide`, `Summarize`) as alternative brains.

---

## Key Takeaways to Reinforce

After the exercise, briefly recap before moving to Session 8:

1. **Flows = no-code automation with AI as a first-class step** — not just a glued-together chain of app calls, but a pipeline where Gemini can do real reasoning inline
2. **Three-part pattern** — Trigger → AI step → Action(s). This pattern generalises to dozens of real workflows.
3. **Prompt engineering still matters** — the `Ask Gemini` step is only as good as the prompt you write for it. Same discipline as Session 2 (Gems) and Session 3 (`=AI()` cells).
4. **The no-code counterpart to Session 6** — code-based automation (Apps Script) and no-code automation (Flows) are two tools for the same job. Code wins on complex logic and full control. No-code wins on speed, visibility, and AI composition.
5. **Bridge to Session 8** — *"The `Ask Gemini` step you just used is a black box here — Google owns the prompt construction, the model choice, the parameters. In the next sessions, you'll take that black box apart and control the prompt, the model, the grounding, and the parameters yourself."*

---

## File Inventory

```
session-07-workspace-flows/
├── demo-guide.md                    ← This file (instructor guide)
└── sample-documents/
    └── test-emails.md               ← Test email templates for demo and exercises
```

**Important:** The instructor flow (`Intelligent Inbox Triage`) is built live during the demo. A pre-built backup copy (`Intelligent Inbox Triage (backup)`) should exist in the instructor's Workspace Studio account as a fallback if the live build encounters issues during delivery.
