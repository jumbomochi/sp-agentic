# Session 7 Rescope: Workspace Studio Flows — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite Session 7 from "Workspace Studio Agents" (a grounded chatbot concept that doesn't exist in the product) to "Workspace Studio Flows" (no-code automation with Gemini as a first-class step), including all peripheral workshop materials.

**Architecture:** Three-commit sequence — (1) folder rename and sample cleanup, (2) new Session 7 content (demo guide rewrite + supporting assets), (3) peripheral file updates (agenda, course overview, wrap-up talking points). No code changes; this is a documentation rewrite. The slide deck `.pptx` is handled manually by the user using a generated checklist.

**Tech Stack:** Markdown, HTML, shell (`git mv`, `rm`). No test framework — verification is via grep, file-content checks, and visual inspection of rendered markdown.

**Reference spec:** `docs/superpowers/specs/2026-04-10-session-07-workspace-studio-flows-design.md`

---

## File Structure

Each file has one clear responsibility.

**Rename:**

- `session-07-workspace-agents/` → `session-07-workspace-flows/` — the entire session folder

**Delete:**

- `session-07-workspace-flows/sample-documents/ST0001-Module-FAQ.docx.md` — artefact of the old grounded-assistant concept; not used in the new flow-based session

**Create:**

- `session-07-workspace-flows/sample-documents/test-emails.md` — copy-pasteable email templates for the live demo trigger and hands-on exercises. Single responsibility: test data.
- `session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md` — mechanical migration checklist for manual PowerPoint edits. Single responsibility: migration runbook for the binary slide deck.

**Rewrite (overwrite existing file after rename):**

- `session-07-workspace-flows/demo-guide.md` — the instructor script for the new Session 7. Single responsibility: walkthrough script for the 45-minute session.

**Modify (line-targeted edits):**

- `agenda.md` — workshop-level agenda, 8 edits to Session 7 references
- `course-overview.html` — HTML landing page, 4 edits to Session 7 card
- `session-11-wrapup/talking-points.md` — wrap-up session, 4 edits to "Workspace Agent" references

**Manual (not touched by this plan):**

- `Workshop-Full-Day-Slides.pptx` — user handles in PowerPoint using `SLIDE-UPDATE-CHECKLIST.md`

---

## Commit Strategy

Three atomic commits, each reversible on its own:

1. **Commit 1 (Task 2):** `Rename session-07 folder to workspace-flows and remove old FAQ sample`
2. **Commit 2 (Tasks 3–5):** `Rewrite Session 7 demo guide for Workspace Studio Flows`
3. **Commit 3 (Tasks 6–8):** `Update workshop materials for Session 7 Flows rescope`

No push step — the user will push manually after reviewing all commits.

---

## Task 1: Pre-flight baseline

**Files:**
- Read-only scan of the repository

**Purpose:** Establish a baseline of all references that will need updating, so the final verification task has a known target. No changes in this task.

- [ ] **Step 1: Verify current working directory is the repo root**

Run:
```bash
pwd
```
Expected output: `/Users/huilianglui/GitHub/sp-agentic`

- [ ] **Step 2: Verify git status is clean**

Run:
```bash
git status
```
Expected output: `nothing to commit, working tree clean` (possibly with the ignorable `~$Workshop-Full-Day-Slides.pptx` lock file listed as untracked — that's fine)

If there are uncommitted changes, stop and ask the user whether to stash or commit them first.

- [ ] **Step 3: Grep for all references that must be updated**

Use the Grep tool with these patterns and save the findings as a baseline:

```
Pattern: Workspace Studio Agents
Pattern: Workspace Agent
Pattern: workspace-agents
Pattern: Stats Module Assistant
Pattern: Student Query Agent
```

Expected findings (baseline — the final verification will compare against these):

- `agenda.md` — lines 12, 131, 135, 137–142, 144, 220, 237, 265
- `course-overview.html` — lines 532, 534, 537, 643
- `session-07-workspace-agents/demo-guide.md` — pervasive (the file is fully rewritten, so we don't need a line count)
- `session-07-workspace-agents/sample-documents/ST0001-Module-FAQ.docx.md` — deleted entirely, so stragglers inside it don't matter
- `session-11-wrapup/talking-points.md` — lines 20, 33, 44, 68

Document any additional unexpected hits (e.g., references in `build-slides.py`, other session guides). Add them to Task 9's verification list.

- [ ] **Step 4: Verify the spec is accessible**

Run:
```bash
ls -la docs/superpowers/specs/2026-04-10-session-07-workspace-studio-flows-design.md
```
Expected: file exists.

**No commit in this task** — baseline only.

---

## Task 2: Rename folder and remove old FAQ sample

**Files:**
- Rename: `session-07-workspace-agents/` → `session-07-workspace-flows/`
- Delete: `session-07-workspace-flows/sample-documents/ST0001-Module-FAQ.docx.md`

- [ ] **Step 1: Rename the folder using `git mv`**

Run:
```bash
git mv session-07-workspace-agents session-07-workspace-flows
```
Expected: no output on success.

`git mv` preserves file history — do **not** use shell `mv` followed by `git add/rm`, that breaks history tracking.

- [ ] **Step 2: Verify the rename succeeded**

Run:
```bash
ls session-07-workspace-flows/
```
Expected output (order may vary):
```
demo-guide.md
sample-documents
```

And confirm the old path is gone:
```bash
ls session-07-workspace-agents/ 2>&1
```
Expected: `ls: session-07-workspace-agents/: No such file or directory`

- [ ] **Step 3: Delete the old FAQ sample document**

Run:
```bash
rm session-07-workspace-flows/sample-documents/ST0001-Module-FAQ.docx.md
```
Expected: no output on success.

- [ ] **Step 4: Verify the sample-documents folder is now empty**

Run:
```bash
ls session-07-workspace-flows/sample-documents/
```
Expected: empty output (the folder exists but has no files). If the folder is auto-removed when empty, that's also fine — Task 4 will recreate it.

- [ ] **Step 5: Verify git status reflects the rename and delete**

Run:
```bash
git status
```
Expected output should include:
```
renamed:    session-07-workspace-agents/demo-guide.md -> session-07-workspace-flows/demo-guide.md
deleted:    session-07-workspace-agents/sample-documents/ST0001-Module-FAQ.docx.md
```

If the deletion shows as `renamed:    session-07-workspace-agents/sample-documents/ST0001-Module-FAQ.docx.md -> session-07-workspace-flows/sample-documents/ST0001-Module-FAQ.docx.md`, that means the `rm` didn't take effect — re-run step 3.

- [ ] **Step 6: Grep for any cross-file references to the old path**

Search the repo for `session-07-workspace-agents`:

```
Pattern: session-07-workspace-agents
```

If there are hits (e.g., in `agenda.md`, `build-slides.py`, other guides), list them and update each one with an exact `session-07-workspace-agents` → `session-07-workspace-flows` replacement. If no hits, proceed.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Rename session-07 folder to workspace-flows and remove old FAQ sample

Part of the Session 7 rescope from "Workspace Studio Agents" to
"Workspace Studio Flows". This commit handles the mechanical
rename; subsequent commits rewrite the content.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected output: `[main <hash>] Rename session-07 folder to workspace-flows and remove old FAQ sample`

- [ ] **Step 8: Verify the commit**

Run:
```bash
git log -1 --stat
```
Expected: a single commit showing the rename and the deletion.

---

## Task 3: Rewrite `session-07-workspace-flows/demo-guide.md`

**Files:**
- Overwrite: `session-07-workspace-flows/demo-guide.md`

**Purpose:** Replace the old "Workspace Studio Agents" instructor script with the new "Workspace Studio Flows" script built around the Intelligent Inbox Triage live demo.

- [ ] **Step 1: Use the Write tool to overwrite `session-07-workspace-flows/demo-guide.md` with the following content**

````markdown
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
├── SLIDE-UPDATE-CHECKLIST.md        ← Migration checklist for updating the slide deck
└── sample-documents/
    └── test-emails.md               ← Test email templates for demo and exercises
```

**Important:** The instructor flow (`Intelligent Inbox Triage`) is built live during the demo. A pre-built backup copy (`Intelligent Inbox Triage (backup)`) should exist in the instructor's Workspace Studio account as a fallback if the live build encounters issues during delivery.
````

- [ ] **Step 2: Verify the file was written correctly**

Run:
```bash
wc -l session-07-workspace-flows/demo-guide.md
```
Expected: approximately 380–410 lines.

- [ ] **Step 3: Spot-check the content**

Use the Read tool to read lines 1–20 of `session-07-workspace-flows/demo-guide.md`. Confirm:
- Line 1: `# Session 7: Workspace Studio Flows — Demo Guide`
- Line 3: `**Duration:** 45 min (25 min demo/walkthrough + 20 min hands-on exercise)`
- Line 4 references `sample-documents/test-emails.md`

**No commit yet — bundling with Tasks 4 and 5.**

---

## Task 4: Create `session-07-workspace-flows/sample-documents/test-emails.md`

**Files:**
- Create: `session-07-workspace-flows/sample-documents/test-emails.md`

- [ ] **Step 1: Ensure the sample-documents directory exists**

Run:
```bash
ls session-07-workspace-flows/sample-documents/ 2>&1 || mkdir -p session-07-workspace-flows/sample-documents/
```

If the directory was auto-removed in Task 2 (because it became empty), this creates it fresh. If it still exists, this is a no-op.

- [ ] **Step 2: Use the Write tool to create `session-07-workspace-flows/sample-documents/test-emails.md` with the following content**

````markdown
# Test Email Templates — Session 7 Demo

These email templates are used during the live demo and the hands-on exercises. Copy each body into a fresh email on your phone or a second browser account, then send to your workshop account with the specified subject.

Sending from a different device or account (rather than composing in the same tab as Workspace Studio) makes the "live fire" more convincing for participants — they see the email arrive as an external event.

---

## Test Email #1 — Urgent Student (primary demo trigger)

**Use for:** The live demo trigger in the main walkthrough.
**Expected flow behavior:** Gemini should classify as `URGENT_STUDENT` → Chat notification fires → Gmail label applied.

**Subject:**

```
[DEMO] Can I get an extension on CA Test 2?
```

**Body:**

```
Dear Dr. Tan,

I've been unwell this week with a bad flu and I'm really worried
about CA Test 2 on Monday 20 April. I have a medical certificate
that I can submit through the Student Portal.

Could I possibly take the make-up test, or get some extra time?
I'm also struggling quite badly with hypothesis testing — I've
watched the lecture recording twice but the concepts aren't
clicking. Would it be possible to book a consultation slot this
week?

Thanks so much,
Chen Mei Ling (2401003)
ST0001 Statistics I, Tutorial Group B
```

---

## Test Email #2 — Positive Feedback (iteration beat)

**Use for:** The "iterate on the flow" demo beat — shows the flow correctly NOT firing for positive emails.
**Expected flow behavior:** Gemini should classify as `OTHER` → `Check if` does not fire → no Chat ping.

**Subject:**

```
[DEMO] Thanks for the tutorial yesterday!
```

**Body:**

```
Hi Dr. Tan,

Just wanted to drop a quick note to say thank you for Monday's
tutorial on probability distributions. The worked example with
the dice problem really helped me understand conditional
probability — it finally clicked!

I shared the approach with my study group and we all agreed
it made the homework much easier. Looking forward to next week's
session on sampling distributions.

Thanks,
Bryan Tan (2401002)
```

---

## Test Email #3 — Admin Request (edge case)

**Use for:** Optional — showing the flow correctly categorising a non-urgent admin email.
**Expected flow behavior:** Gemini should classify as `ADMIN_REQUEST` → `Check if` does not fire → no Chat ping.

**Subject:**

```
[DEMO] Room booking for consultation session
```

**Body:**

```
Hi Dr. Tan,

I need to book a room for a group consultation session next
Thursday afternoon. Could you confirm that T1602 is available
from 3:00 PM to 4:30 PM on 23 April? If not, is there another
staff room I could use?

I've already filled in the facilities booking form and am
waiting on your approval.

Thanks,
Kumar Raj (2401010)
```

---

## Test Email #4 — Newsletter (edge case)

**Use for:** Optional — showing the flow correctly filtering out routine mailing lists.
**Expected flow behavior:** Gemini should classify as `NEWSLETTER` → `Check if` does not fire → no Chat ping.

**Subject:**

```
[DEMO] SP Weekly Staff Bulletin — 10 April
```

**Body:**

```
Dear Colleague,

This week's staff bulletin highlights:

- New research grant opportunities from the Ministry of Education
- Updates to the academic calendar for AY2026/2027
- Staff welfare event: Family Day at Sentosa on 25 April
- Reminder: Submit your module review forms by 30 April
- Library hours during the mid-semester break

Read the full bulletin at intranet.sp.edu.sg/staff-bulletin.

Kind regards,
SP Staff Communications
```

---

## Test Email #5 — Deadline in Body (for Scenario B: Email-to-Task Extractor)

**Use for:** Verifying the Intermediate exercise (Scenario B). Tests whether a participant's flow can extract an action item and deadline from an email body.
**Expected flow behavior:** Participant's flow should extract "Submit grades" as the action and `2026-05-15` as the deadline, create a Google Task, and send a Chat confirmation.

**Subject:**

```
[EXERCISE] Grades submission reminder
```

**Body:**

```
Dear Module Coordinators,

A friendly reminder that all final grades for Semester 2 must be
submitted through the Student Management System no later than
5:00 PM on Friday, 15 May 2026. Late submissions will delay the
student transcript release.

Please ensure your grade entries include:
- CA Test 1, CA Test 2, and Final Exam scores
- Final weighted grade (calculated automatically)
- Any special remarks for students with Leave of Absence cases

If you have any questions, contact Academic Records at
acad_records@sp.edu.sg.

Regards,
Academic Records Office
```

---

## Tips for Sending Test Emails During the Demo

- **Send from a different device.** Composing the email in the same browser tab as Workspace Studio looks staged. Using your phone makes it visibly "external" to participants.
- **Pause briefly after sending.** Don't immediately switch windows. Let participants see the `Sent` confirmation on your phone, then switch to Chat and wait for the notification to arrive organically.
- **Have Chat open full-screen.** A Chat notification is much more impressive in a full window than in a small side panel.
- **Pre-clear your Chat space.** If you're reusing a test space, clear old messages first so the fresh notification stands out.
````

- [ ] **Step 3: Verify the file was created**

Run:
```bash
wc -l session-07-workspace-flows/sample-documents/test-emails.md
```
Expected: approximately 170–200 lines.

**No commit yet — bundling with Tasks 3 and 5.**

---

## Task 5: Create `session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md` and commit

**Files:**
- Create: `session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md`

- [ ] **Step 1: Use the Write tool to create `session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md` with the following content**

````markdown
# Session 7 Slide Update Checklist

**Purpose:** This checklist guides the manual PowerPoint edits needed to bring `Workshop-Full-Day-Slides.pptx` in sync with the Session 7 rescope from "Workspace Studio Agents" to "Workspace Studio Flows".

The demo guide rewrite is already committed to this repo. This checklist covers the slide-deck changes you must make by hand in PowerPoint because `.pptx` is a binary format.

**Estimated time:** 20–30 minutes.

---

## Before you start

1. Open `Workshop-Full-Day-Slides.pptx` in PowerPoint.
2. **Save a backup copy first** (e.g., `Workshop-Full-Day-Slides.backup-pre-session7-rescope.pptx`). If a find-and-replace goes wrong, you need a way back.
3. Navigate to the Session 7 slides — search for "Workspace Studio" or "Session 7" in Outline view to find the start.
4. Keep this checklist open in a second window so you can tick items as you go.

---

## Part 1 — Verbatim Find-and-Replace

Use **Home → Replace** (or `Cmd+Shift+H` on macOS, `Ctrl+H` on Windows). Go through each find-and-replace pair below. For each, use "Replace All" and verify the count makes sense before moving to the next.

- [ ] `Workspace Studio Agents` → `Workspace Studio Flows`
- [ ] `Workspace Agents` → `Workspace Flows`
- [ ] `Build your first agent` → `Build your first flow`
- [ ] `Student Query Agent` → `Intelligent Inbox Triage`
- [ ] `Stats Module Assistant` → `Intelligent Inbox Triage`
- [ ] `Agent capabilities` → `Flow capabilities`
- [ ] `Configure an agent` → `Configure a flow`
- [ ] `agent instructions` → `Ask Gemini prompts`
- [ ] `agent builder` → `flow builder`

> **Note:** The lower-case "agent" versions of these replacements should be done case-sensitively. Do **not** blanket-replace "Agent" with "Flow" — other sessions may legitimately use the word "agent" (e.g., Session 1's "Gemini ecosystem: from assistants to agents", or references to Vertex AI Agent Builder in Sessions 8–10).

---

## Part 2 — Conceptual Slide Changes

For each slide below, navigate to it (search by title), then apply the changes.

### Slide: "Gems vs Agents" comparison (or similar)

- [ ] Replace the 2-column table with this 3-column table:

    | | Gems | Apps Script (Session 6) | Workspace Studio Flows (Session 7) |
    |---|---|---|---|
    | **What it is** | Custom prompt for chat | Code that runs on events | Visual event-driven pipeline with AI steps |
    | **How you build it** | Describe persona and instructions | Ask Gemini to write JavaScript | Drag-and-configure visual builder |
    | **Where AI lives** | The entire experience IS the AI | External — API calls if needed | Built-in `Ask Gemini` step in the flow |
    | **Triggered by** | You, manually, in chat | Menu, schedule, form submit | Gmail, Chat, Sheets, Drive, Forms, Meet, Calendar, schedule |
    | **Best for** | Custom reasoning on ad-hoc queries | Complex logic, unusual integrations | Cross-app automation with AI reasoning as one step |

    You may need to resize or redesign the slide to accommodate 3 columns. Consider landscape layout or splitting across two slides if the font becomes too small.

### Slide: "What is a Workspace Studio Agent?" (or similar intro slide)

- [ ] Retitle to: **What is a Workspace Studio Flow?**
- [ ] Replace bullets with:
    - Visual no-code builder for Google Workspace automation
    - Event-driven — triggered by Gmail, Sheets, Drive, Forms, Meet, Calendar, Chat, or schedules
    - Gemini as a first-class step — compose AI reasoning into your pipeline
    - Cross-app within Workspace — no connectors, no auth headaches
- [ ] Remove any bullet about "grounded data sources" or "chat interface"

### Slide: "Agent capabilities" list

- [ ] Retitle to: **What a Flow can do**
- [ ] Replace with a 2-column layout:

    **Triggers** (left column):
    - Gmail: When I get an email
    - Chat: When someone joins, mentions me, or reacts
    - Sheets: When a sheet changes
    - Drive: When a file is edited or added
    - Docs: Document events
    - Forms: When a form response comes in
    - Meet: When a meeting transcript is ready
    - Calendar: Based on a meeting
    - Schedule: On a schedule

    **Actions** (right column):
    - `Ask Gemini` (custom prompts)
    - AI skills: Recap, Extract, Decide, Summarize
    - Gmail: Draft, reply, label, archive, mark read
    - Chat: Notify in Chat
    - Sheets: Add row, update rows, get contents
    - Docs: Create, append
    - Tasks: Create a task
    - Drive: Create folder, save attachments
    - Control flow: `Check if`, `Filter`

### Slide: "Instructions field + data sources picker" mockup

- [ ] **Delete this slide.** The concept does not exist in Flows.
- [ ] Replace with a fresh screenshot of the Workspace Studio flow canvas. Take the screenshot from your own account during pre-session setup, showing a built flow with 3–4 steps visible.

### Slide: "Live Build: Stats Module Assistant"

- [ ] Retitle to: **Live Build: Intelligent Inbox Triage**
- [ ] Replace the bullet list of build steps with:
    - Trigger: `When I get an email` (filtered by `[DEMO]` subject)
    - Step 1: `Ask Gemini` — classify + extract structured fields
    - Step 2: `Check if` — only continue for urgent cases
    - Step 3: `Notify me in Chat` — formatted summary
    - Step 4: `Add labels` — apply `Urgent-Student` to the email
- [ ] If the slide includes a visual of the old agent builder UI, replace with a flow canvas screenshot.

### Slide: "Adding data sources" (as a build step)

- [ ] **Delete this slide.** Not a concept in Flows. Individual action steps like `Get sheet contents` reference specific files instead.

### Slide: "Copilot Studio bridge"

- [ ] Update the analogy text to:

    > "Workspace Studio Flows are conceptually equivalent to Power Automate with built-in Copilot steps. Both are visual, event-driven, no-code, cross-app within their ecosystems — and both let you treat AI as one configurable step inside a larger pipeline."

### Slide: "Hands-on Exercise"

- [ ] Update to reference the three tiered scenarios from the new demo guide:
    - **Beginner:** Morning Inbox Digest (`On a schedule` → `Recap unread emails` → `Notify in Chat`)
    - **Intermediate:** Email-to-Task Extractor (`When I get an email` → `Ask Gemini` → `Create a task` → `Notify in Chat`)
    - **Advanced:** Student Query Router (multi-branch classification and routing)
    - **Fallback:** Bring your own use case
- [ ] Remove references to the "Student Query Agent" hands-on task from the old guide.

---

## Part 3 — New Content to Add

- [ ] Take a fresh screenshot of the Workspace Studio flow canvas at `https://studio.workspace.google.com/` showing the completed Intelligent Inbox Triage flow (all 5 steps visible). Add this to the "Live Build" slide or as a new slide immediately after.
- [ ] (Optional) Take a screenshot of the `Ask Gemini` step's prompt configuration panel showing the Inbox Triage prompt. Useful as a visual aid when walking through Step C of the live build.

---

## Part 4 — Verification

- [ ] Run the deck in presenter mode from the start of Session 6 through the start of Session 8. Look for:
    - Any slide still saying "agent" in the Session 7 context (other than legitimate uses in other sessions)
    - Missing or broken layouts after table/image replacements
    - Orphaned references to "data sources", "instructions field", or "Stats Module Assistant"
- [ ] Confirm the 3-column Gems / Apps Script / Flows table renders cleanly — if the old slide was a 2-column layout, you may need to switch to a landscape-oriented slide or split across two.
- [ ] Confirm at least one slide shows a screenshot of actual Workspace Studio, not a mockup.
- [ ] Save the file. Keep the backup copy you made at the start until after you've delivered the workshop successfully.

---

## If you get stuck

- **Can't find a slide that matches the description:** The old deck may have organised Session 7 differently than the `demo-guide.md`. Use your judgement — the goal is to remove the old "grounded agent" concept and replace it with the "no-code automation with AI steps" concept.
- **PowerPoint corrupts the file during a replace:** Restore from the backup you made at the start, and redo changes in smaller batches.
- **A find-and-replace returns "0 results":** Good — it means the slide deck already doesn't contain that phrase. Move to the next item.
````

- [ ] **Step 2: Verify the file was created**

Run:
```bash
wc -l session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md
```
Expected: approximately 140–170 lines.

- [ ] **Step 3: Verify all three new/rewritten files are in place**

Run:
```bash
ls -la session-07-workspace-flows/ session-07-workspace-flows/sample-documents/
```
Expected output includes:
```
session-07-workspace-flows/:
demo-guide.md
SLIDE-UPDATE-CHECKLIST.md
sample-documents

session-07-workspace-flows/sample-documents/:
test-emails.md
```

- [ ] **Step 4: Verify git status**

Run:
```bash
git status
```
Expected to show:
- Modified: `session-07-workspace-flows/demo-guide.md`
- New file: `session-07-workspace-flows/sample-documents/test-emails.md`
- New file: `session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md`

(The `demo-guide.md` will show as modified because it was renamed from the old path in Task 2 and rewritten in Task 3.)

- [ ] **Step 5: Stage and commit**

Run:
```bash
git add session-07-workspace-flows/demo-guide.md \
        session-07-workspace-flows/sample-documents/test-emails.md \
        session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md
git commit -m "$(cat <<'EOF'
Rewrite Session 7 demo guide for Workspace Studio Flows

Replace the old "Workspace Studio Agents" instructor script with
a new walkthrough centred on the Intelligent Inbox Triage live demo
(When I get an email → Ask Gemini → Check if → Notify in Chat +
Add labels). Add test email templates used by the demo and the
intermediate exercise, and a slide-update checklist for the
manual PowerPoint migration.

Design spec: docs/superpowers/specs/2026-04-10-session-07-workspace-studio-flows-design.md

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected output: `[main <hash>] Rewrite Session 7 demo guide for Workspace Studio Flows`

- [ ] **Step 6: Verify the commit**

Run:
```bash
git log -1 --stat
```
Expected: a commit showing `demo-guide.md`, `sample-documents/test-emails.md`, and `SLIDE-UPDATE-CHECKLIST.md` modifications.

---

## Task 6: Update `agenda.md`

**Files:**
- Modify: `agenda.md` (8 line-targeted edits)

- [ ] **Step 1: Edit line 12 — course overview sentence**

Use the Edit tool with:

**old_string:**
```
This course bridges **everyday AI productivity** (Gemini in Workspace) with **LLM application development on Google Cloud** (Vertex AI Studio, prompt engineering, and the Gemini API), tailored for educators and staff in a mathematics/analytics context. Participants leave with hands-on experience using Gemini across Workspace apps, creating custom Gems, building no-code agents in Workspace Studio, generating Apps Script automations with AI, and hands-on lab experience with Vertex AI Studio and the Gemini API on Google Cloud.
```

**new_string:**
```
This course bridges **everyday AI productivity** (Gemini in Workspace) with **LLM application development on Google Cloud** (Vertex AI Studio, prompt engineering, and the Gemini API), tailored for educators and staff in a mathematics/analytics context. Participants leave with hands-on experience using Gemini across Workspace apps, creating custom Gems, automating across Workspace with no-code flows in Workspace Studio, generating Apps Script automations with AI, and hands-on lab experience with Vertex AI Studio and the Gemini API on Google Cloud.
```

- [ ] **Step 2: Edit lines 131–142 — Session 7 heading and topic table**

Use the Edit tool with:

**old_string:**
```
#### Session 7: Workspace Studio Agents (45 min)

| Topic | Details |
|-------|---------|
| What are Workspace Studio Agents | No-code AI agents that live inside Google Workspace |
| How they differ from Gems | Gems = custom prompts; Agents = multi-step workflows with actions |
| Agent capabilities | Can search Drive, read emails, query Sheets, take actions on your behalf |
| Building your first agent | Step-by-step walkthrough in Workspace Studio |
| Configuring instructions | Defining the agent's role, constraints, and workflow |
| Adding data sources | Connecting Drive folders, Sheets, or other Workspace data |
| Adding actions | What the agent can do (send emails, create docs, update sheets) |
| Testing and sharing | Testing the agent, sharing with your team |
```

**new_string:**
```
#### Session 7: Workspace Studio Flows (45 min)

| Topic | Details |
|-------|---------|
| What are Workspace Studio Flows | No-code, event-driven automations built in a visual pipeline — native to Google Workspace |
| How they differ from Apps Script and Gems | Code-free alternative to Apps Script; built-in `Ask Gemini` step instead of Gems' chat persona |
| Trigger catalogue | Gmail, Chat, Sheets, Drive, Docs, Meet, Calendar, Forms, schedules |
| The `Ask Gemini` step | A first-class LLM step inside the flow — custom prompts and pre-built AI skills (Recap, Extract, Decide, Summarize) |
| Composing actions | Gmail, Chat, Sheets, Docs, Tasks, Drive, plus control flow (`Check if`, `Filter`) |
| Live build: Intelligent Inbox Triage | Step-by-step walkthrough of a 5-node flow that classifies incoming emails with Gemini and pings Chat for urgent ones |
| Testing and enabling | Saving, enabling, and test-triggering flows; iterating on the Ask Gemini prompt |
```

- [ ] **Step 3: Edit lines 144–149 — Hands-on exercise description**

Use the Edit tool with:

**old_string:**
```
**Hands-on Exercise (20 min):** Build a "Student Query Agent" that:

- Has access to a FAQ document and a module schedule sheet
- Can answer common student questions about deadlines, module content, and policies
- Provides grounded answers with references to source documents
```

**new_string:**
```
**Hands-on Exercise (20 min):** Build an Intelligent Inbox Triage flow — or pick one of three tiered scenarios from the demo guide:

- *Beginner:* Morning Inbox Digest (scheduled `Recap unread emails` → `Notify in Chat`)
- *Intermediate:* Email-to-Task Extractor (`Ask Gemini` extracts deadlines from incoming emails and creates Google Tasks)
- *Advanced:* Student Query Router (multi-branch classification and Chat routing)
```

- [ ] **Step 4: Edit line 150 — Copilot Studio bridge**

Use the Edit tool with:

**old_string:**
```
**Bridge for Copilot Studio users:** Copilot Studio uses Power Platform connectors; Workspace Studio uses native Workspace integrations. Same concept, different ecosystem.
```

**new_string:**
```
**Bridge for Copilot Studio users:** Workspace Studio Flows are conceptually equivalent to Power Automate with built-in Copilot steps — visual, event-driven, no-code automation where AI is a first-class step inside the pipeline.
```

- [ ] **Step 5: Edit line 220 — wrap-up recap**

Use the Edit tool with:

**old_string:**
```
| Recap of the day | Gemini productivity → Gems → Apps Script → Workspace Agents → Vertex AI Studio → Gemini API |
```

**new_string:**
```
| Recap of the day | Gemini productivity → Gems → Apps Script → Workspace Flows → Vertex AI Studio → Gemini API |
```

- [ ] **Step 6: Edit line 237 — design rationale row**

Use the Edit tool with:

**old_string:**
```
| Workspace Studio Agents as a separate block | Key bridge between "using AI" and "building with AI" |
```

**new_string:**
```
| Workspace Studio Flows as a separate block | Pairs with Session 6 as the no-code counterpart to code-based automation; bridges "using AI" to "building with AI" |
```

- [ ] **Step 7: Edit line 265 — differentiation table row**

Use the Edit tool with:

**old_string:**
```
| Workspace Agents | Build from template with guided steps | Configure custom actions and multi-source grounding |
```

**new_string:**
```
| Workspace Flows | Build the Inbox Triage demo flow with guided steps | Build a custom multi-branch flow with conditional logic and tighter Ask Gemini prompts |
```

- [ ] **Step 8: Verify all edits landed**

Use Grep with these patterns and confirm the counts:

```
Pattern: Workspace Studio Agents (in agenda.md)  → should now be 0 matches
Pattern: Workspace Agents (in agenda.md)         → should now be 0 matches
Pattern: Workspace Flows (in agenda.md)          → should now be 3+ matches (lines 131, 220, 237, 265)
```

**No commit yet — bundling with Tasks 7 and 8.**

---

## Task 7: Update `course-overview.html`

**Files:**
- Modify: `course-overview.html` (4 line-targeted edits)

- [ ] **Step 1: Edit line 532 — session title**

Use the Edit tool with:

**old_string:**
```
                            <span class="session-title">Workspace Studio Agents</span>
```

**new_string:**
```
                            <span class="session-title">Workspace Studio Flows</span>
```

- [ ] **Step 2: Edit line 534 — session description**

Use the Edit tool with:

**old_string:**
```
                        <p class="session-desc">Build no-code AI agents in Google Workspace — configure instructions, connect data sources, add actions, and test a Student Query Agent.</p>
```

**new_string:**
```
                        <p class="session-desc">Build no-code automations that glue Google Workspace together — with Gemini as a first-class step in your pipeline. Build an Intelligent Inbox Triage flow in Workspace Studio.</p>
```

- [ ] **Step 3: Edit line 537 — session tag**

Use the Edit tool with:

**old_string:**
```
                            <span class="tag">Workspace Agents</span>
```

**new_string:**
```
                            <span class="tag">Workspace Flows</span>
```

- [ ] **Step 4: Edit line 643 — takeaway list item**

Use the Edit tool with:

**old_string:**
```
                    <li>A working Workspace Studio Agent</li>
```

**new_string:**
```
                    <li>A working Workspace Studio Flow</li>
```

- [ ] **Step 5: Verify all edits landed**

Use Grep with these patterns:

```
Pattern: Workspace Studio Agents (in course-overview.html)  → should now be 0 matches
Pattern: Workspace Agents (in course-overview.html)         → should now be 0 matches
Pattern: Workspace Studio Agent (in course-overview.html)   → should now be 0 matches (no partial matches)
Pattern: Workspace Studio Flows (in course-overview.html)   → should now be 1 match
Pattern: Workspace Flows (in course-overview.html)          → should now be 2 matches (title + tag)
Pattern: Workspace Studio Flow (in course-overview.html)    → should now be 2 matches (the takeaway and the title both contain "Workspace Studio Flow" as a substring)
```

**No commit yet — bundling with Tasks 6 and 8.**

---

## Task 8: Update `session-11-wrapup/talking-points.md` and commit

**Files:**
- Modify: `session-11-wrapup/talking-points.md` (4 line-targeted edits)

- [ ] **Step 1: Edit line 20 — recap table row**

Use the Edit tool with:

**old_string:**
```
| **Building with AI** | Created a Workspace Studio Agent — a no-code assistant with live data | Session 7 |
```

**new_string:**
```
| **Building with AI** | Built a Workspace Studio Flow — a no-code automation with Gemini as a first-class step | Session 7 |
```

- [ ] **Step 2: Edit line 33 — grounding bullet**

Use the Edit tool with:

**old_string:**
```
> - Workspace Agents: grounded in live Drive documents
```

**new_string:**
```
> - Workspace Flows: the `Ask Gemini` step is grounded on the trigger event data (emails, sheet rows, form responses)
```

- [ ] **Step 3: Edit line 44 — quick wins lead-in**

Use the Edit tool with:

**old_string:**
```
> "You don't need to build an agent on Monday. Start with these:"
```

**new_string:**
```
> "You don't need to build a flow on Monday. Start with these:"
```

- [ ] **Step 4: Edit line 68 — action planning tool list**

Use the Edit tool with:

**old_string:**
```
2. **Which tool would you use?** (Gem / Apps Script / Workspace Agent / Vertex AI)
```

**new_string:**
```
2. **Which tool would you use?** (Gem / Apps Script / Workspace Flow / Vertex AI)
```

- [ ] **Step 5: Verify all edits landed**

Use Grep with these patterns:

```
Pattern: Workspace Studio Agent (in session-11-wrapup/talking-points.md)  → should now be 0 matches
Pattern: Workspace Agents (in session-11-wrapup/talking-points.md)        → should now be 0 matches
Pattern: Workspace Agent (in session-11-wrapup/talking-points.md)         → should now be 0 matches
Pattern: Workspace Flows (in session-11-wrapup/talking-points.md)         → should now be 1 match (line 33)
Pattern: Workspace Flow (in session-11-wrapup/talking-points.md)          → should now be 2 matches (lines 20, 68)
```

- [ ] **Step 6: Verify git status for all three modified files**

Run:
```bash
git status
```
Expected to show modifications to:
- `agenda.md`
- `course-overview.html`
- `session-11-wrapup/talking-points.md`

- [ ] **Step 7: Stage and commit**

Run:
```bash
git add agenda.md course-overview.html session-11-wrapup/talking-points.md
git commit -m "$(cat <<'EOF'
Update workshop materials for Session 7 Flows rescope

Update cross-file references in the top-level agenda, course
overview landing page, and wrap-up talking points to match the
Session 7 rescope from "Workspace Studio Agents" to "Workspace
Studio Flows". Slide deck is handled separately via the manual
checklist at session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected output: `[main <hash>] Update workshop materials for Session 7 Flows rescope`

- [ ] **Step 8: Verify the commit**

Run:
```bash
git log -1 --stat
```
Expected: a commit showing modifications to `agenda.md`, `course-overview.html`, and `session-11-wrapup/talking-points.md`.

---

## Task 9: Final verification

**Files:**
- Read-only final check across the repo

**Purpose:** Ensure the rescope is internally consistent — no stragglers anywhere in the repo.

- [ ] **Step 1: Grep for any remaining "Workspace Agents" or "Workspace Studio Agents" references**

Use the Grep tool:

```
Pattern: Workspace Studio Agents
Pattern: Workspace Agents
Pattern: Workspace Studio Agent
Pattern: Workspace Agent
```

**Expected result:** Zero matches in any tracked file (the `.pptx` is binary and excluded from grep by default — that's fine, it's handled by the manual checklist).

If there are any remaining matches in text files, stop and surface them to the user. Do not attempt to fix them blindly — some uses of "agent" in the repo are legitimate (e.g., "Vertex AI Agent Builder" in Session 8+ materials, or "from assistants to agents" in Session 1's ecosystem overview).

- [ ] **Step 2: Grep for any remaining references to the old folder path**

Use the Grep tool:

```
Pattern: session-07-workspace-agents
```

**Expected result:** Zero matches.

- [ ] **Step 3: Grep for the old demo name "Stats Module Assistant"**

Use the Grep tool:

```
Pattern: Stats Module Assistant
```

**Expected result:** Zero matches in the rewritten session folder and related files. The only acceptable hit would be inside the committed design spec at `docs/superpowers/specs/2026-04-10-session-07-workspace-studio-flows-design.md`, which legitimately references the old concept by name when explaining why it was replaced.

- [ ] **Step 4: Grep for the old student query agent name**

Use the Grep tool:

```
Pattern: Student Query Agent
```

**Expected result:** Zero matches in text files. Acceptable only in the design spec for the same reason as Step 3.

- [ ] **Step 5: Verify the new session folder structure**

Run:
```bash
find session-07-workspace-flows -type f
```
Expected output:
```
session-07-workspace-flows/demo-guide.md
session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md
session-07-workspace-flows/sample-documents/test-emails.md
```

- [ ] **Step 6: Verify the old session folder no longer exists**

Run:
```bash
ls session-07-workspace-agents/ 2>&1
```
Expected output: `ls: session-07-workspace-agents/: No such file or directory`

- [ ] **Step 7: Verify the commit log**

Run:
```bash
git log --oneline -5
```
Expected to show (in reverse chronological order, most recent first):
```
<hash> Update workshop materials for Session 7 Flows rescope
<hash> Rewrite Session 7 demo guide for Workspace Studio Flows
<hash> Rename session-07 folder to workspace-flows and remove old FAQ sample
<hash> Add Session 7 rescope design spec
<hash> Harden demo 1 script and expand Session 2 Gem walkthrough
```

- [ ] **Step 8: Summarise completion to the user**

Report:
- Three new commits on main
- Folder renamed, old FAQ deleted, demo guide rewritten, new assets created, peripheral files updated
- `Workshop-Full-Day-Slides.pptx` still pending manual update — point the user at `session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md` to work through the slide changes
- Ask the user whether to push the three commits to `origin/main` or leave them local for their own inspection first

**No commit in this task** — verification only.

---

## Self-Review Checklist

Use this checklist to verify the plan against the spec before execution.

**Spec coverage:**

- [x] Folder rename (Spec §5.1) → Task 2
- [x] Delete old FAQ sample doc (Spec §5.1) → Task 2
- [x] Create `sample-documents/test-emails.md` (Spec §5.2) → Task 4
- [x] Create `SLIDE-UPDATE-CHECKLIST.md` (Spec §5.2) → Task 5
- [x] Rewrite `demo-guide.md` (Spec §5.3, §2, §3, §4) → Task 3
- [x] Update `agenda.md` lines 12, 131–142, 144–149, 150, 220, 237, 265 (Spec §5.4) → Task 6
- [x] Update `course-overview.html` lines 532, 534, 537, 643 (Spec §5.5) → Task 7
- [x] Update `session-11-wrapup/talking-points.md` lines 20, 33, 44, 68 (Spec §5.6) → Task 8
- [x] Slide deck handled via manual checklist (Spec §5.7) → Included in Task 5 as the checklist content; actual editing is user-side
- [x] Cross-file grep for `session-07-workspace-agents` references (Spec §5.1) → Task 2 Step 6 and Task 9 Step 2

**Placeholder scan:**

- No "TBD", "TODO", "implement later", or "fill in details" in any task step
- Every code block is complete and copy-pasteable
- Every command has expected output documented
- Every Edit tool call shows full `old_string` and `new_string`

**Type consistency:**

- File paths used consistently: `session-07-workspace-flows/demo-guide.md` (not `session-07-workspace-flows/demo_guide.md` or similar)
- Flow name used consistently: `Intelligent Inbox Triage` throughout
- Gmail label used consistently: `Urgent-Student` (exact spelling)
- Gemini prompt categories used consistently: `URGENT_STUDENT`, `ADMIN_REQUEST`, `NEWSLETTER`, `OTHER` (uppercase with underscores)
- Commit message subjects match between plan and spec

**Commit atomicity:**

- Commit 1 (Task 2): rename-only, reverts cleanly with `git revert` if needed
- Commit 2 (Tasks 3–5): all new Session 7 content bundled; reverts cleanly
- Commit 3 (Tasks 6–8): all peripheral updates bundled; reverts cleanly

---

## Execution Notes

- The plan has 9 tasks. Tasks 1 and 9 are read-only (baseline and verification); the other 7 produce changes.
- Three commits total. Execution should pause after each commit so the user can inspect before proceeding.
- Task 3 (demo guide rewrite) is the largest single change — ~400 lines of content in one Write tool call.
- All Edit tool calls have exact `old_string` values captured from the current file state as of the spec commit (`3eb8048`). If the files have diverged since then, the Edit calls will fail and the executor must resolve the diff before continuing.
- `Workshop-Full-Day-Slides.pptx` is explicitly out of scope for this plan. The user handles it manually with the checklist.

---

## Risk Register

| Risk | Mitigation |
|---|---|
| `git mv` fails on a case-insensitive filesystem | The source and target differ in more than case (`workspace-agents` → `workspace-flows`), so this isn't an issue on macOS HFS+/APFS |
| Edit tool's `old_string` doesn't match exactly (whitespace, line endings) | Each edit reads a narrow window first to confirm exact current state |
| Multiple matches for an `old_string` cause Edit to fail | All `old_string` values chosen here are unique within their respective files; if an unexpected match occurs, narrow the `old_string` with more surrounding context |
| User has uncommitted changes at start | Task 1 Step 2 checks `git status` and stops if the tree is dirty |
| Final grep in Task 9 finds unexpected hits | Task 9 Step 1 explicitly handles this by surfacing hits to the user rather than auto-fixing |
