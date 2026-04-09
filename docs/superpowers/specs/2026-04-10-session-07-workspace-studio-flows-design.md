# Session 7 Rescope: Workspace Studio Flows — Design Spec

**Date:** 2026-04-10
**Author:** Workshop author (Hui Liang) with Claude (brainstorming pair)
**Status:** Approved design, pending implementation plan
**Related workshop:** sp-agentic — AI-Powered Productivity with Google Gemini & Application Development with LLMs (SP School of Mathematical Sciences and Analytics)

---

## 1. Background

### 1.1 The problem

Session 7 of the workshop was written as "Workspace Studio Agents" — a 45-minute session teaching participants to build a chat-based, grounded AI assistant (the "Stats Module Assistant") that students could query about module FAQs and schedules. The existing guide (`session-07-workspace-agents/demo-guide.md`) describes building this assistant through:

- A Gemini app sidebar option called "Gems and agents"
- An instructions / system-prompt field
- A "data sources" picker connecting to Drive docs and Sheets
- A chat interface for testing
- Sharing the agent with other users

**None of this exists in the product the guide is written against.** Google ships what the guide calls "Workspace Studio Agents" under the name **Workspace Studio Flows**, at `https://studio.workspace.google.com/`. Flows are event-triggered visual automations — conceptually closer to Zapier / Power Automate / IFTTT than to a custom GPT. Specifically:

- There is no instructions field
- There is no data sources picker
- There is no chat interface to talk to a Flow
- Flows are personal automations bound to triggers, not shared conversational agents
- The "AI" in a Flow comes from an `Ask Gemini` step (or pre-built AI skills) that can be composed into a pipeline alongside deterministic actions

The workshop author discovered this during end-to-end dogfooding on 2026-04-10: they opened `gemini.google.com` looking for the "Gems and agents" sidebar described in the guide and only found Gems. They then found the correct product at `studio.workspace.google.com` but confirmed its UX bears no resemblance to what the guide teaches.

This is a full conceptual mismatch, not a navigation bug. Find-and-replace cannot fix it.

### 1.2 Decision

**Rescope Session 7 to teach the actual product.**

Four options were considered:

1. **Rescope Session 7 to Workspace Studio Flows (no-code automation).** — *Chosen.*
2. Rehome the "grounded assistant" concept to a different product (NotebookLM or Gems with knowledge files), retire Session 7 or fold into Session 2/5.
3. Hybrid: teach Flows as automation but use a Gem as an action step inside a Flow.
4. Escalate to Vertex AI Agent Builder (Google Cloud) — rejected as developer-focused and off-workshop-scope.

Option 1 was chosen because:

- It teaches the real product the user is likely to encounter
- It creates a natural pairing with Session 6 (code-based automation) — both sessions now cover automation, one with code, one without
- The Copilot Studio / Power Automate bridge that was already in the guide becomes more accurate, not less
- It preserves Session 7's role as the bridge from "using AI" to "building with AI" (just via a different kind of bridge)
- The hands-on learning outcomes (trigger-action thinking, composing AI with deterministic steps, conditional logic) are more transferable than "build a grounded chatbot once"

---

## 2. Session structure

### 2.1 Identity

- **Title:** Session 7: Workspace Studio Flows
- **Subtitle:** No-code automation across Google Workspace, powered by Gemini
- **Duration:** 45 minutes (25 minutes demo/walkthrough + 20 minutes hands-on), unchanged from original
- **New folder path:** `session-07-workspace-flows/` (renamed from `session-07-workspace-agents/`)

### 2.2 Positioning and narrative

Session 7 becomes the **no-code twin of Session 6**. The one-sentence framing used in the opening:

> In Session 6, you used Gemini to generate Apps Script — code that automates tasks. In Session 7, you'll build the same kind of automation **without writing or generating a single line of code** — and with AI as a first-class step inside your pipeline.

The overall workshop arc becomes: **Using AI** (Sessions 2–5, Gems / Sheets / Docs / NotebookLM) → **Automating with AI** (Session 6 code, Session 7 no-code) → **Building with AI** (Sessions 8–10, Vertex AI Studio and Gemini API).

The closing transition to Session 8 hooks on the `Ask Gemini` step:

> The Ask Gemini step you just used is a black box here — Google owns the prompt construction. In the next sessions, you'll take that black box apart and control the prompt, the model, the grounding, and the parameters yourself.

### 2.3 Time allocation

| Phase | Time | What happens |
|---|---|---|
| Opening context | 3 min | Position Flows against Session 6 Apps Script, Gems, and Power Automate. No screen share. |
| Gems / Apps Script / Flows comparison | 2 min | Single comparison table (Section 2.4) on screen to anchor mental model. |
| Show the problem first | 3 min | Live-show a cluttered inbox. Frame: "What if Gemini triaged every incoming email — no code?" |
| Live build: Intelligent Inbox Triage | 13 min | Step-by-step flow build in Workspace Studio. Detailed in Section 3. |
| Iterate on the flow | 2 min | Refine the Ask Gemini prompt after catching a misclassification. Mirrors the "iterate with Gemini" muscle from earlier sessions. |
| Transition to hands-on | 2 min | Recap the pattern: trigger → AI step → action. Hand off to exercise. |
| Hands-on exercise | 20 min | Three tiered scenarios (Section 4). |

### 2.4 The comparison table

Replaces the old "Gems vs Agents" comparison from the current guide:

| | **Gems** | **Apps Script (Session 6)** | **Workspace Studio Flows (Session 7)** |
|---|---|---|---|
| **What it is** | A custom prompt for chat | Code that runs on events or schedules | A visual, event-driven pipeline with AI steps |
| **How you build it** | Describe a persona and instructions | Ask Gemini to write JavaScript for you | Drag and configure steps in a visual builder |
| **Where AI lives** | The entire experience *is* the AI | External — you call the API if you need AI inside a script | Built-in `Ask Gemini` step you drop into the flow |
| **Triggered by** | You, manually, in chat | Menu clicks, time schedules, form submits | Gmail, Chat, Sheets, Drive, Forms, Meet, Calendar events, or schedules |
| **Best for** | Custom reasoning on ad-hoc queries | Complex logic, unusual integrations, full control | Cross-app automation where AI reasoning is one step among many |

### 2.5 Copilot Studio / Power Automate bridge

Reframe the existing Copilot Studio callout to:

> Workspace Studio Flows are conceptually equivalent to Power Automate with built-in Copilot steps. Both are visual, event-driven, no-code, cross-app within their ecosystems — and both let you treat AI as one configurable step inside a larger pipeline.

---

## 3. Live build: Intelligent Inbox Triage

### 3.1 Why this demo

Three alternative demos were considered:

- **A: Intelligent Inbox Triage** (chosen) — `When I get an email` → `Ask Gemini` (classify + extract) → `Check if` → `Notify in Chat` + `Add labels`
- **B: Meeting Intelligence** — `When a meeting transcript is ready` → extract action items → create Docs + Tasks + Chat notify
- **C: Weekly Grade Check Digest** — `On a schedule` → read sheet → Ask Gemini to identify at-risk students → Docs + Chat

Approach A was chosen because:

1. **Live-demo reliability.** Trigger by sending yourself an email from your phone. Fires in 10–30 seconds. Works every time.
2. **Showcases `Ask Gemini` with a custom prompt.** Options B and C lean more on pre-built AI skills. Custom prompts are the more reusable skill to teach.
3. **Natural contrast with Session 6 Demo 2** (form response processor in Apps Script) — same trigger-and-act pattern, no code, plus an AI brain.
4. **Low failure risk.** B requires a real meeting and transcript. C requires a "run now" button that may not exist.

### 3.2 The flow shape

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

Five configured nodes total. Target live-build time: ~13 minutes (see Section 2.3 time allocation and Section 3.4 step-by-step breakdown).

### 3.3 Pre-session setup (instructor once, before the workshop)

1. Sign in to `https://studio.workspace.google.com/` with the workshop Google Workspace account. Verify the Discover page loads.
2. In Gmail, create a label called `Urgent-Student` (Settings → Labels → Create new label). The flow's `Add labels` step will reference this exact name — it must exist in advance.
3. Ensure there is a Google Chat space the instructor is in and can receive notifications in. A DM-with-self space is acceptable if Chat allows it. Test that `Notify me in Chat` can target this space.
4. Pre-build a backup copy of the exact same flow, disabled, named `Intelligent Inbox Triage (backup)`. Reveal it as a fallback if the live build breaks.
5. Prepare two test emails on the instructor's phone, ready to send:
   - **Urgent positive case:** Subject `[DEMO] Can I get an extension on CA Test 2?`, body describes a student asking for help.
   - **Non-urgent edge case:** Subject `[DEMO] Thanks for the tutorial yesterday!`, body is positive feedback. (Used in the iteration beat.)
6. Verify `Check if` semantics. Click into a `Check if` step on a throwaway flow and document whether it:
   - (a) Branches to then/else paths, or
   - (b) Acts as a pass-through gate that halts downstream steps when false, or
   - (c) Supports structured field matching on a previous step's output, or only substring matching.
   - The answer determines how Section 3.4 Step D is configured. If unclear during implementation, fall back to substring matching on `CATEGORY: URGENT_STUDENT`.

### 3.4 Live-build walkthrough

**Step A: Create the flow (1 min)**

1. Workspace Studio → `+` button (top-left) → "New flow"
2. Rename `Untitled flow` → `Intelligent Inbox Triage`

**Step B: Configure the trigger (2 min)**

1. `Choose a starter` → **`When I get an email`**
2. In the filter configuration, set:
   - **Subject contains:** `[DEMO]`
3. Narration: *"This filter matters — without it, the flow would fire on every incoming email during the workshop and ping me constantly. In production you'd filter by label, sender, or a specific mailing address."*

**Step C: Add the `Ask Gemini` step (5 min)**

1. Under Actions → `Choose a step` → top card **`Ask Gemini`**
2. Instructor types (or pastes) the following into the prompt field, using Workspace Studio's variable picker to insert the trigger's subject/sender/body where the `{{...}}` placeholders appear:

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

3. Narration (spoken while typing):
   - "I'm telling Gemini *what role it's playing*"
   - "I'm giving it a closed set of categories — Gemini classifies best when the options are explicit"
   - "I'm asking for a rigid output format so the next step can read the fields reliably"
   - "This is exactly the same prompt-engineering discipline from Session 2 Gems and Session 3 `=AI()` cells — same skill, new surface"

**Step D: Add the `Check if` branching (2 min)**

1. Under Actions → `Choose a step` → Tools → **`Check if`**
2. Configure the condition: *previous step output contains `CATEGORY: URGENT_STUDENT`*.
3. If structured field matching is available, use it. Otherwise use substring matching.

> *"This is a no-code `if` statement. The next two actions only run when Gemini's classification is urgent — everything else gets silently logged and ignored."*

**Step E: Add `Notify me in Chat` (2 min)**

1. Under Actions (inside the Check if / then branch) → `Choose a step` → Chat → **`Notify me in Chat`**
2. Message body:

```
🚨 Urgent student email

From: {{Ask Gemini output: SENDER}}
Summary: {{Ask Gemini output: SUMMARY}}
Dates: {{Ask Gemini output: DATES}}

Original subject: {{email subject}}
```

3. Target: the instructor's DM space or a test Chat space.

**Step F: Add `Add labels` (1 min)**

1. `Choose a step` → Gmail → **`Add labels`**
2. Label: `Urgent-Student`
3. Target email: the email from the trigger

**Step G: Save and enable (30 sec)**

1. Save the flow.
2. Toggle to "Enabled" (if there is an enable switch).

### 3.5 Triggering the demo live

1. Instructor sends a test email from their phone to their own workshop account. Subject `[DEMO] Can I get an extension on CA Test 2?`, body describing a student asking for an extension.
2. Put the Chat window on screen. Wait 10–30 seconds.
3. Chat notification appears with the structured summary. Switch to Gmail — the email has the `Urgent-Student` label applied.
4. Payoff line: *"No code. No API keys. No deployment. Five steps, one prompt, one filter. And it composes AI reasoning into an automation — not just around it."*

### 3.6 The iteration beat

Framing: *"Let me show you how you'd tighten this if Gemini misclassified something."*

1. Send the second test email (`[DEMO] Thanks for the tutorial yesterday!`, positive feedback).
2. **Expected behavior:** Gemini classifies as `OTHER` → Check if does not fire → no Chat ping. Show this as correct.
3. **Fallback if Gemini misclassifies** (as URGENT_STUDENT): open the `Ask Gemini` step, add this line to the prompt: *"Positive feedback and thank-you messages are OTHER, not URGENT_STUDENT — even when they mention a student's name."* Save. Resend. Show the corrected classification.
4. Teaching point: *"You iterate on the prompt, not on code. Same conversational refinement loop as Gems."*

### 3.7 Risks and mitigations (instructor notes in the guide)

| Risk | Mitigation |
|---|---|
| Email doesn't arrive fast enough | Filler talking points ready; worst case, walk through the backup flow's execution history |
| `Ask Gemini` output format drifts | Use loose substring matching in Check if; guide flags that prompt may need tightening over time |
| `Notify me in Chat` posts to wrong space | Verified in pre-session setup; screenshot of expected behavior as a visual fallback |
| `Urgent-Student` label doesn't exist | Pre-session checklist forces creation |
| Workspace Studio UI changes between now and delivery | Guide includes "if you don't see X, look for Y" notes on key buttons |
| Live build takes too long | Backup flow is ready to switch to mid-demo — the build steps are the teaching, the working flow is the payoff |
| `Check if` semantics different from expected | Instructor pre-verifies during setup; guide describes the substring fallback explicitly |

---

## 4. Hands-on exercise (20 min)

Three tiered scenarios, each with the same four-field structure (Goal / Flow shape / Starter configuration / Success criteria). Participants pick one based on their comfort level. A fallback "bring your own use case" option is included for participants with a specific workflow in mind.

### 4.1 Scenario A — Beginner: Morning Inbox Digest

**Recommended for:** anyone who has never used a no-code builder before.

**Goal:** Get a daily summary of your unread emails posted to Google Chat at 8 AM, without opening Gmail.

**Flow shape:**

```
On a schedule (daily, 8:00 AM)
    ↓
Recap unread emails       (pre-built AI skill)
    ↓
Notify me in Chat         (post the recap)
```

**Starter configuration:**

- Trigger: `On a schedule` → daily at 8:00 AM. During the workshop, temporarily set the interval to "every 15 min" or use a manual test trigger so participants can verify without waiting. **Important: remind participants to change it back before leaving, or the flow will keep pinging them.**
- Step 1: `Recap unread emails` with default settings
- Step 2: `Notify me in Chat` targeting own DM space, body: `Good morning. Here's your inbox recap: {{recap output}}`

**Why it's beginner-friendly:** Uses a canned AI skill — no prompt writing. Only three nodes.

**Success criteria:** A Chat message appears containing a summary of your unread emails, with subject lines and senders grouped by priority.

### 4.2 Scenario B — Intermediate: Email-to-Task Extractor

**Recommended for:** participants who can write a simple Gemini prompt and want to wire Gmail → Tasks.

**Goal:** When an email arrives that mentions a deadline or action item, automatically create a Google Task.

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

- Check if condition: output contains `HAS_ACTION: YES`
- Create a task: title from `ACTION`, due date from `DEADLINE`
- Notify me in Chat: `✅ Task created from email: {{ACTION}} (due {{DEADLINE}})`

**Success criteria:** Send yourself an email with a subject mentioning "Please submit grades by Friday 2026-05-15" — a Google Task appears with that title and due date, and a confirmation pings in Chat.

### 4.3 Scenario C — Advanced: Student Query Router

**Recommended for:** participants who finished the demo early or want something closer to a real student-support workflow.

**Goal:** When an email arrives from a student (detected via subject prefix), use Gemini to classify the query type and route it to different Chat spaces depending on the category. Log every query to a tracking sheet.

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
Get sheet contents    (read a log sheet)
    ↓
Add a row             (log query type and timestamp)
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

- Chain `Check if` nodes (or branches, if supported) with different `Notify me in Chat` + `Draft a reply` actions per category.
- Final step: `Add a row` to a tracking sheet with columns `Timestamp | Sender | Category | Subject`.

**Success criteria:** Send yourself 2–3 test emails with `[ST0001]` in the subject and different query types — each lands in the correct Chat space, gets a draft reply where applicable, and appears as a row in the log sheet.

### 4.4 Fallback — Bring Your Own Use Case

For participants with a real workflow they want to automate: freeform-describe the use case in the `Describe a task for Gemini` field on the Workspace Studio landing page and see what starter flow it proposes. The instructor circulates to help.

### 4.5 Instructor circulation notes

- **Most common issue:** Trigger filter is too broad → flow fires on every email during the workshop. Show participants how to narrow the filter or temporarily disable the flow.
- **Second most common:** `Ask Gemini` output format drifts between runs → downstream `Check if` stops matching. Fix: loosen the condition (substring match) or tighten the prompt with "respond with ONLY the word X".
- **Third most common:** Participant can't find where previous step variables are exposed in the next step's configuration. UI-specific muscle — demonstrate the variable picker on a volunteer's screen if multiple people get stuck.
- **Running out of time:** Anyone still building at the 15-min mark should switch to `Run once` / test-trigger even with an incomplete flow. Having *a* working flow beats having a perfect-but-untested one.
- **Finished early:** Challenge them to add a second branch to their `Check if`, or try the AI skills (`Extract`, `Decide`, `Summarize`) as alternative brains.

---

## 5. Peripheral file changes (full scope)

### 5.1 Folder rename and cleanup

```
git mv session-07-workspace-agents session-07-workspace-flows
rm session-07-workspace-flows/sample-documents/ST0001-Module-FAQ.docx.md
```

After renaming, grep the repo for the old path and update any cross-file references. Candidates to check: `agenda.md`, `course-overview.html`, `session-11-wrapup/talking-points.md`, `build-slides.py`, any other session guides.

### 5.2 New files to create

| Path | Purpose |
|---|---|
| `session-07-workspace-flows/sample-documents/test-emails.md` | Five copy-pasteable email templates for demo and exercises (Urgent student, Positive feedback, Admin request, Newsletter, Deadline-in-body email) |
| `session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md` | Mechanical find-and-replace + conceptual change checklist for manual PowerPoint editing (see Section 5.7) |

### 5.3 Files to rewrite top-to-bottom

| Path | Purpose |
|---|---|
| `session-07-workspace-flows/demo-guide.md` | Full rewrite based on Sections 2–4 of this design doc |

### 5.4 `agenda.md` targeted edits

| Line(s) | Current | Replacement |
|---|---|---|
| 12 | "…creating custom Gems, **building no-code agents in Workspace Studio**, generating Apps Script automations…" | "…creating custom Gems, **automating across Workspace with no-code flows in Workspace Studio**, generating Apps Script automations…" |
| 131 | `#### Session 7: Workspace Studio Agents (45 min)` | `#### Session 7: Workspace Studio Flows (45 min)` |
| 132–142 | Topic table (agents, data sources, instructions, sharing) | New topic table: what Flows are, difference from Apps Script and Gems, trigger catalogue, the `Ask Gemini` step, composing actions, control flow with `Check if`, testing and enabling |
| 144–149 | Hands-on "Build a Student Query Agent" with data sources | New hands-on: "Build an Intelligent Inbox Triage flow — or pick one of three tiered scenarios from the demo guide" |
| 150 | "Bridge for Copilot Studio users: Copilot Studio uses Power Platform connectors; Workspace Studio uses native Workspace integrations…" | "Bridge for Copilot Studio users: Workspace Studio Flows are conceptually equivalent to Power Automate with Copilot steps — visual no-code automation where AI is a first-class step." |
| 220 | "Gemini productivity → Gems → Apps Script → **Workspace Agents** → Vertex AI Studio → Gemini API" | "Gemini productivity → Gems → Apps Script → **Workspace Flows** → Vertex AI Studio → Gemini API" |
| 237 | "**Workspace Studio Agents** as a separate block \| Key bridge between 'using AI' and 'building with AI'" | "**Workspace Studio Flows** as a separate block \| Pairs with Session 6 as the no-code counterpart to code-based automation; bridges 'using AI' to 'building with AI'" |
| 251 | "Access to Workspace Studio (admin must enable)" | Unchanged |
| 265 | "Workspace Agents \| Build from template with guided steps \| Configure custom actions and multi-source grounding" | "Workspace Flows \| Build the Inbox Triage demo flow with guided steps \| Build a custom multi-branch flow with conditional logic and tighter Ask Gemini prompts" |

### 5.5 `course-overview.html` targeted edits

| Line | Change |
|---|---|
| 532 | `<span class="session-title">Workspace Studio Agents</span>` → `<span class="session-title">Workspace Studio Flows</span>` |
| 534 | Session description → `Build no-code automations that glue Google Workspace together — with Gemini as a first-class step in your pipeline. Build an Intelligent Inbox Triage flow in Workspace Studio.` |
| 537 | Tag `Workspace Agents` → `Workspace Flows` |
| 643 | "A working Workspace Studio Agent" → "A working Workspace Studio Flow" |

### 5.6 `session-11-wrapup/talking-points.md` targeted edits

| Line | Change |
|---|---|
| 20 | "Created a Workspace Studio Agent — a no-code assistant with live data" → "Built a Workspace Studio Flow — a no-code automation with Gemini as a first-class step" |
| 33 | "Workspace Agents: grounded in live Drive documents" → "Workspace Flows: event-driven no-code automation with Ask Gemini steps" |
| 44 | "You don't need to build an agent on Monday" → "You don't need to build a flow on Monday" |
| 68 | "Which tool would you use? (Gem / Apps Script / Workspace Agent / Vertex AI)" → "Which tool would you use? (Gem / Apps Script / Workspace Flow / Vertex AI)" |

A full repo-wide grep for "agent" and "Workspace Agents" will be run during implementation to catch anything else.

### 5.7 Slide update checklist (for manual editing)

Lives at `session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md`. Three parts:

**Part 1 — Verbatim find-and-replace** (via PowerPoint Home → Replace):

| Find | Replace with |
|---|---|
| `Workspace Studio Agents` | `Workspace Studio Flows` |
| `Workspace Agents` | `Workspace Flows` |
| `Build your first agent` | `Build your first flow` |
| `Student Query Agent` | `Intelligent Inbox Triage` |
| `Stats Module Assistant` | `Intelligent Inbox Triage` |
| `Agent capabilities` | `Flow capabilities` |
| `Configure an agent` | `Configure a flow` |
| `agent instructions` | `Ask Gemini prompts` |
| `agent builder` | `flow builder` |

**Part 2 — Conceptual slide changes** (search by slide title):

| Slide | Change |
|---|---|
| "Gems vs Agents" comparison | Replace with the 3-column **Gems / Apps Script / Flows** table from Section 2.4 |
| "What is a Workspace Studio Agent?" | Retitle to "What is a Workspace Studio Flow?" Update bullets: visual no-code builder, event-driven (triggers), Gemini as a first-class step, cross-app within Workspace. Remove any bullet about "grounded data sources" or "chat interface". |
| "Agent capabilities" list | Retitle "What a Flow can do". Replace with 2-column list: **Triggers** (Gmail, Chat, Sheets, Drive, Docs, Meet, Calendar, Forms, Schedule) and **Actions** (Ask Gemini, AI skills, Gmail, Chat, Sheets, Docs, Tasks, Drive, control flow) |
| Mockup slide of instructions field + data sources picker | Replace with fresh screenshot of Workspace Studio flow canvas from `https://studio.workspace.google.com/` |
| "Live Build: Stats Module Assistant" | Retitle "Live Build: Intelligent Inbox Triage". Replace bullet list with the 5-step flow: Trigger → Ask Gemini → Check if → Notify in Chat → Add labels |
| Any slide with "Adding data sources" step | Delete — concept doesn't exist in Flows |
| "Copilot Studio bridge" slide | Update analogy text to Power Automate + Copilot steps equivalent |
| "Hands-on Exercise" slide | Update to reference three tiered scenarios plus the Bring Your Own fallback |

**Part 3 — New content to add:**

- At least one fresh screenshot of the Workspace Studio flow canvas with a built flow visible
- Optional: screenshot of `Ask Gemini` step's prompt configuration panel

**Part 4 — Verification:** present-mode dry-run from Session 6 through Session 8; check no slide still says "agent" in the Session 7 context; check the 3-column Gems/Apps Script/Flows table renders cleanly.

---

## 6. Full scope summary

```
RENAME
  session-07-workspace-agents/ → session-07-workspace-flows/

DELETE
  session-07-workspace-flows/sample-documents/ST0001-Module-FAQ.docx.md

CREATE
  session-07-workspace-flows/sample-documents/test-emails.md
  session-07-workspace-flows/SLIDE-UPDATE-CHECKLIST.md
  docs/superpowers/specs/2026-04-10-session-07-workspace-studio-flows-design.md  (this file)

REWRITE
  session-07-workspace-flows/demo-guide.md  (top to bottom)

EDIT (targeted line changes)
  agenda.md
  course-overview.html
  session-11-wrapup/talking-points.md
  + any cross-file refs surfaced by a grep for "workspace-agents"
    or "Workspace Studio Agents" after the rename

MANUAL (user handles in PowerPoint using the checklist)
  Workshop-Full-Day-Slides.pptx
```

---

## 7. Out of scope

- Editing `Workshop-Full-Day-Slides.pptx` directly. The binary is handled manually by the user using the checklist in `SLIDE-UPDATE-CHECKLIST.md`.
- Implementation of the Copilot Studio / Power Automate analogy beyond the narration lines in the demo guide. No separate handout.
- Rebuilding the `session-07-workspace-flows/` folder's `sample-documents/` with Drive docs or sheets — the old grounded-assistant concept required them, the new flow-based session only needs text templates.
- Reworking Session 5 (NotebookLM) even though the grounded-assistant concept from the old Session 7 conceptually overlaps with NotebookLM. Session 5 stays as-is.
- Writing a fresh "Meeting Intelligence" demo variant as a fallback. The backup flow for the demo is a pre-built copy of the Inbox Triage flow, not a different demo.

## 8. Open questions to resolve during implementation

1. **`Check if` semantics.** Does it branch (then/else), gate (halt flow if false), or both? Does it support structured field matching or only substring matching on previous step output? Instructor needs to verify in Workspace Studio during pre-session setup, and the demo guide needs to document the actual behavior.
2. **Variable substitution syntax.** The exact syntax Workspace Studio uses to reference previous step outputs (e.g., `{{step.output.field}}`, `@step name`, or a UI picker only) is unknown from the screenshots we have. The guide describes this conceptually; implementation will either (a) document the actual syntax once the instructor pre-builds the demo, or (b) leave the guide UI-picker-agnostic and describe selection via the picker.
3. **Scheduled-trigger testability.** For Scenario A (Morning Digest), does Workspace Studio expose a "Run now" button, or does the schedule have to actually fire? If no run-now, the starter configuration must tell participants to temporarily set the interval to the smallest supported unit and wait.
4. **Chat notification target.** Whether `Notify me in Chat` can target a specific space or only the instructor's DM-with-self. If only DM-with-self, Scenario C's "different Chat spaces per category" will need to be softened to "different message prefixes in the same space".
5. **Gmail label creation from Flows.** Whether `Add labels` can create labels on the fly, or only reference existing labels. Pre-session setup step is written assuming the latter. If the former is supported, that step becomes optional.

Each open question has a fallback path documented in the affected section, so implementation can proceed even if the answer to any one of them is "not supported".

---

## 9. Approval trail

- **Approach selection** (Rescope to Workspace Studio Flows): approved 2026-04-10
- **Section 1: Structure and narrative arc**: approved 2026-04-10
- **Section 2: Live-build walkthrough**: approved 2026-04-10
- **Section 3: Hands-on exercises**: approved 2026-04-10
- **Section 4: Peripheral file updates**: approved 2026-04-10

Next step after this spec is approved: invoke the `superpowers:writing-plans` skill to produce the implementation plan (task ordering, file-by-file edits, commit strategy, verification steps).
