# Session 7: Workspace Studio Agents — Demo Guide

**Duration:** 45 min (25 min demo/walkthrough + 20 min hands-on exercise)
**Instructor materials:** This guide, sample FAQ document, sample module schedule sheet

---

## Pre-Session Setup (do this before the workshop)

### 1. Verify Workspace Studio Access

1. Go to [gemini.google.com](https://gemini.google.com) and sign in with the workshop Google Workspace account
2. In the left sidebar, look for **Gems and agents** or navigate to the Agents section
3. If you don't see an option to create agents, the Workspace admin needs to enable it:
   - Admin Console → Apps → Google Workspace → Gemini → Agent settings → Enable agent creation

### 2. Prepare the Grounding Documents

Create these in Google Drive before the workshop:

**Document 1: "ST0001 Statistics I — Module FAQ"** (Google Doc)

Copy the following into a Google Doc:

---

**ST0001 Statistics I — Frequently Asked Questions**

**Q: What is the grading breakdown for this module?**
A: Continuous Assessment (CA) accounts for 40% of your final grade. The final examination accounts for 60%. CA comprises two in-class tests (15% each) and tutorial participation (10%).

**Q: When is the final examination?**
A: The final examination for ST0001 Statistics I is scheduled for 15 May 2026, 9:00 AM at the Sports Hall. Please arrive 15 minutes early with your student ID.

**Q: What topics does the final exam cover?**
A: The final exam covers all topics from Weeks 1–8: Descriptive Statistics, Probability, Probability Distributions, Sampling Distributions, Hypothesis Testing, Confidence Intervals, Correlation, and Linear Regression.

**Q: How do I book a consultation session with the lecturer?**
A: Consultation sessions are available on Tuesdays from 3:00 PM to 5:00 PM in Staff Room 5. Book via the online booking form linked on the module's Google Classroom page, or email the lecturer directly.

**Q: I missed a CA test. Can I take a make-up test?**
A: Make-up tests are only granted with valid medical certificates or approved Leave of Absence documentation. Submit your request through the Student Portal within 3 working days of the missed test.

**Q: What calculator is allowed during exams?**
A: Only non-programmable scientific calculators are permitted. Graphing calculators and any device with wireless capability are not allowed. The approved list is posted on the module's Google Classroom.

**Q: Where can I find the lecture notes and tutorial materials?**
A: All lecture notes are uploaded to Google Classroom before each lecture. Tutorial worksheets are uploaded by Friday of the preceding week. Past-year papers are available in the "Resources" section.

**Q: I'm struggling with the module. What support is available?**
A: Several options are available: (1) Attend the weekly consultation sessions, (2) Visit the Math Learning Centre (Block T16, Level 3) for drop-in peer tutoring, (3) Form a study group — the lecturer can help match you with classmates, (4) Use NotebookLM to create a study hub from your lecture notes.

---

**Document 2: "ST0001 Module Schedule"** (Google Sheet)

Use the CSV from `../session-06-apps-script/sample-documents/module-schedule.csv` — import it into a Google Sheet named "ST0001 Module Schedule" and share it to the same Drive folder.

### 3. Pre-Build a Demo Agent (Optional Safety Net)

Build the demo agent in advance so you have a working version to show if the live build encounters issues. Follow the demo steps below. Name it "Stats Module Assistant (backup)".

---

## Demo Flow

### Opening Context (3 min) — Transition from Session 6

> "In the last session, you used Gemini to generate Apps Script — code that automates tasks across Workspace apps. But what if you don't want code at all? What if you want an AI assistant that can answer questions, look up information, and take actions — all without writing a single line?"
>
> "That's what **Workspace Studio Agents** give you. Think of them as Gems with superpowers. A Gem is a custom prompt. An agent is a custom prompt that can also *do things* — search your Drive, read your Sheets, send emails."

### Gems vs. Agents Comparison (2 min)

Draw or show this comparison:

| | Gems | Workspace Studio Agents |
|---|------|------------------------|
| **What it is** | Custom prompt template | AI assistant with actions |
| **Grounding** | Knowledge files uploaded once | Live connection to Drive, Sheets, Gmail |
| **Can take actions** | No — text output only | Yes — search, read, summarise, draft |
| **Memory** | Within a conversation | Within a conversation |
| **Sharing** | Share the Gem | Share the agent |
| **Analogy** | A knowledgeable colleague | A knowledgeable colleague with access to your filing cabinet |

**For Copilot Studio users:**

> "If you've built chatbots in Copilot Studio, Workspace Studio Agents are conceptually similar. Copilot Studio connects to Power Platform data sources via connectors. Workspace Studio connects natively to Google Drive, Sheets, Docs, Gmail, and Calendar. Same idea — different ecosystem."

---

### Show the Problem First (3 min)

**Goal:** Demonstrate why plain Gemini struggles with module-specific questions.

**Step 1 — Open a fresh Gemini chat** (not a Gem, not an agent — just regular Gemini)

**Step 2 — Ask a module-specific question:**

```
When is the final exam for ST0001 Statistics I at Singapore Polytechnic?
```

**Expected result:** Gemini will either:
- Admit it doesn't have information about SP's specific module schedules
- Make up a plausible-sounding date (hallucination)
- Suggest the student check the SP website or Google Classroom

**Step 3 — Try another one:**

```
What's the consultation time for ST0001 at SP?
```

Same problem. Gemini has no way to know.

Point this out to the audience:

> "Gemini is smart, but it doesn't know our specific module policies, schedules, or FAQ. If I tell a student 'just ask Gemini', they'll either get a wrong answer or a dead end."
>
> "What we need is a Gemini that *knows our documents*. That's what an agent does. Let me build one."

---

### Live Build: "Stats Module Assistant" (15 min)

#### Step 1: Create a new agent (2 min)

1. Go to [gemini.google.com](https://gemini.google.com)
2. In the left sidebar, click **Gems and agents** (or the agent creation entry point)
3. Click **Create agent** (or **New agent**)
4. Set the name: **Stats Module Assistant**

> "Just like Gems, agents start with a name. But the next step is where agents diverge from Gems."

#### Step 2: Write the agent instructions (3 min)

In the instructions field, enter:

```
You are a helpful assistant for students enrolled in ST0001 Statistics I at Singapore Polytechnic, School of Mathematical Sciences and Analytics.

Your role:
- Answer student questions about the module: grading, schedule, exam details, resources, and support options
- Always base your answers on the FAQ document and module schedule provided in your data sources
- If you don't know the answer, say so clearly and suggest the student contact the lecturer or visit the module's Google Classroom page
- Be friendly, concise, and encouraging

Your constraints:
- Never make up dates, grades, or policies — only use information from your data sources
- Do not provide academic advice beyond what's in the FAQ (e.g., don't recommend study strategies unless the FAQ mentions them)
- If asked about other modules, politely explain that you only have information about ST0001

Your tone:
- Friendly and supportive — like a helpful senior student
- Use simple, clear language
- Keep answers concise — 2-3 sentences when possible, longer only if the question requires detail
```

> "These instructions are the agent's personality and guardrails. Notice we're being very explicit about what it can and can't do. This is the same principle as system prompts — which we'll see again in the Vertex AI labs later."

#### Step 3: Add data sources (3 min)

1. Click **Add data source** (or equivalent)
2. Select **Google Drive**
3. Browse to and select the "ST0001 Statistics I — Module FAQ" Google Doc
4. Add the "ST0001 Module Schedule" Google Sheet as a second data source

> "This is the key difference from Gems. The agent doesn't just have a static knowledge file — it has a live connection to these documents. If you update the FAQ, the agent picks up the changes."

#### Step 4: Test the agent (5 min)

Test with these queries, one at a time:

**Test 1 — Basic FAQ lookup:**
```
When is the final exam?
```
Expected: The agent should return the date (15 May 2026), time, and venue from the FAQ.

**Test 2 — Schedule lookup:**
```
When is the next tutorial for Group A?
```
Expected: The agent should find the next tutorial date from the module schedule sheet.

**Test 3 — Support question:**
```
I'm failing the module. What should I do?
```
Expected: The agent should reference the support options from the FAQ (consultation, Math Learning Centre, study groups).

**Test 4 — Boundary test (should be handled gracefully):**
```
Can you help me with my MA0001 Linear Algebra assignment?
```
Expected: The agent should politely decline — it only has ST0001 information.

**Test 5 — Grounding test (should not hallucinate):**
```
What's the lecturer's phone number?
```
Expected: The agent should say it doesn't have that information and suggest contacting the lecturer via email or Google Classroom.

> "Notice how the agent handles questions outside its knowledge. It doesn't make things up — it tells the student to check with the lecturer. That's the power of good instructions and grounded data sources."

#### Step 5: Iterate on the agent (3 min)

**Goal:** Show participants that agents are refinable, not one-shot builds.

Pick one thing that could be better from your test queries. Common examples:

- The agent was too chatty → add "Keep answers to 2-3 sentences"
- The agent didn't cite the source → add "Always mention which document the answer came from"
- The agent gave advice beyond the FAQ → strengthen the constraint

**Example edit:**

1. Click the agent name → **Edit**
2. Add this to the instructions:

```
## Additional Requirements

- When answering, always cite which source you used (e.g., "According to the ST0001 FAQ..." or "Based on the Module Schedule...")
- If a question can't be answered from your data sources, end with: "Please contact the lecturer at tan_wei_lin@sp.edu.sg or post in Google Classroom for a definitive answer."
```

3. Save and re-test with one of the previous queries

> "Look at the difference. Now every answer is traceable back to a source. And when the agent doesn't know something, it gives the student a clear next step instead of leaving them stuck. Agents get better the more you use them."

#### Step 6: Share the agent (2 min)

1. Click the **Share** button (or the share icon)
2. Add the email address of a colleague (or a shared workshop account) to grant access
3. Show that shared users can chat with the agent but cannot see the instructions or data sources

> "You've just built a student-facing assistant in about 12 minutes. No code, no infrastructure, no APIs. Students can access it through Gemini, and you can update it any time by editing the FAQ document."

**Side-by-side comparison (1 min):**

Recall the questions you asked at the start of the session ("When is the final exam?"). Compare:
- Plain Gemini → generic, potentially wrong, no citations
- Stats Module Assistant → specific, grounded in your docs, cites sources, handles boundaries gracefully

> "Same underlying model. Same interface. But one is useful for students, and one isn't. The difference is grounding."

---

### Transition to Hands-On Exercise (2 min)

> "Now it's your turn. You'll build your own agent — and you can choose a scenario that fits your role. The key steps are the same: name it, write clear instructions, connect data sources, and test."

---

## Hands-On Exercise (20 min)

### Instructions for Participants

**Goal:** Build a Workspace Studio Agent that answers questions grounded in your own data sources.

**Steps:**

1. **Choose a scenario** (see options below) or create your own
2. **Create a new agent** in Gemini → Gems and agents → Create agent
3. **Write instructions** — define the agent's role, constraints, and tone
4. **Add data sources** — connect at least one Google Doc or Sheet from Drive
5. **Test with 3–5 queries** — include at least one boundary test (a question the agent shouldn't answer)
6. **Share** (optional) — share with a neighbour and have them test it

---

### Scenario Options

#### Option A: Module FAQ Assistant (Recommended for first-timers)

Build the same "Stats Module Assistant" from the demo, using the pre-prepared FAQ document and schedule sheet. This lets you focus on writing good instructions and testing.

**Starter instructions:**
```
You are a helpful assistant for students in ST0001 Statistics I.
Answer questions about grading, schedule, exams, and support options.
Only use information from the FAQ and schedule documents.
If you don't know, say so and suggest contacting the lecturer.
Be friendly and concise.
```

#### Option B: Administrative Assistant

Build an agent that helps with a common administrative task for your department.

**Example scenarios:**
- **Room Booking Assistant** — grounded in a room availability spreadsheet; answers questions about available rooms, capacity, and booking procedures
- **Event Planning Assistant** — grounded in an events document; answers questions about upcoming department events, deadlines, and logistics
- **HR Policy Assistant** — grounded in a staff handbook doc; answers questions about leave policies, claims procedures, and contact details

**Starter instructions:**
```
You are an administrative assistant for the School of Mathematical Sciences and Analytics.
Answer questions about [topic] based on the provided documents.
Be professional, accurate, and helpful.
If the information is not in your data sources, say so and direct the user to [relevant contact].
```

#### Option C: Teaching Content Assistant (For advanced participants)

Build an agent grounded in actual teaching materials — lecture notes, tutorial worksheets, or past papers.

**Example scenarios:**
- **Revision Coach** — grounded in lecture notes; helps students review key concepts by answering questions and providing explanations
- **Tutorial Helper** — grounded in tutorial worksheets; guides students through problems step-by-step without giving direct answers

**Starter instructions:**
```
You are a revision coach for ST0001 Statistics I.
Help students understand concepts from the lecture notes.
When a student asks about a concept, explain it clearly with an example.
Do not solve homework or tutorial questions directly — guide the student to the answer.
Always cite which lecture or week the concept is from.
```

---

### Instructor Notes for Exercise Facilitation

- **Most common issue:** Participants can't find the agent creation option. Verify admin has enabled it. If not available, have participants pair up with someone who has access.
- **Second most common issue:** Data source connection fails. Ensure the Drive documents are in a location the participant's account can access (shared folder or their own Drive).
- **If someone finishes early:** Challenge them to add more data sources, refine the instructions to handle edge cases better, or try building a second agent for a different scenario.
- **Good test queries to suggest:**
  - A question the agent should answer confidently
  - A question that's close to the agent's domain but slightly outside it
  - A question that requires combining information from two data sources
  - A trick question that might cause hallucination (e.g., asking about something not in the docs)

---

## Key Takeaways to Reinforce

After the exercise, briefly recap before the break:

1. **Agents = Gems + actions + live data** — the same instruction-writing skills from Session 2 apply here
2. **Grounding prevents hallucination** — agents answer from your documents, not from training data
3. **Instructions are your control mechanism** — clear constraints produce reliable behaviour
4. **No-code doesn't mean no-effort** — the quality of your instructions and data sources determines the agent's quality
5. **This connects forward** — in the next sessions, you'll see how the same concepts (system instructions, grounding, chat memory) work in Vertex AI Studio and the Gemini API
