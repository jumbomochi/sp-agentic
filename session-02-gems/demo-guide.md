# Session 2: The Gemini App & Custom Gems — Demo Walkthrough

**Duration:** 45 min (25 min demo + 15 min hands-on + 5 min transition)
**Instructor materials:** This guide, grading rubric, sample student submission
**Sample documents used** (located in `./sample-documents/`):
- `ST0001-Grading-Rubric.docx.md` — upload as Gem knowledge file
- `Sample-Student-Submission.docx.md` — test input
- `Rough-Meeting-Notes.txt` — secondary test input
- `Sample-Dataset-Description.txt` — secondary test input

---

## Pre-Session Setup (do this before the workshop)

### 1. Upload the Grading Rubric to Google Drive

1. Convert `ST0001-Grading-Rubric.docx.md` into a Google Doc in your workshop Drive:
   - Option A: Open the `.md` file, copy all content, paste into a new Google Doc named **"ST0001 Grading Rubric"**
   - Option B: Upload the Markdown file to Drive and right-click → "Open with Google Docs"
2. Make sure the formatting (headings, tables) is preserved

### 2. Prepare the Sample Student Submission

Copy the content of `Sample-Student-Submission.docx.md` into a Google Doc named **"Sample Submission — Chen Mei Ling"**. You'll paste from this during the demo.

### 3. Open Gemini

- Go to [gemini.google.com](https://gemini.google.com) and sign in with the workshop Google Workspace account
- Verify you can see the **Gems** option in the left sidebar
- Create a test Gem beforehand so you know where the "Create" button is (delete it before the demo)

### 4. Pre-Build a Backup Gem (Safety Net)

Build the "Assignment Feedback Gem" in advance using the same instructions you'll use in the demo. Name it **"Feedback Gem (backup)"**. If the live build encounters issues, you can pivot to this.

---

## Demo Flow

### Opening Context (3 min)

Transition from Session 1:

> "You've seen the Gemini app — the chat interface at gemini.google.com. You probably already use it for one-off tasks: drafting an email, brainstorming ideas, summarising an article."
>
> "But here's the thing. As a lecturer or administrator, you probably do the same kinds of tasks *over and over*. Writing student feedback. Drafting meeting minutes. Explaining the same module policy for the tenth time."
>
> "Each time, you have to re-explain the context to Gemini: 'Act as a tutor, follow this rubric, be constructive, keep it under 200 words...' That's repetitive *and* error-prone."
>
> "**Gems fix that.** A Gem is a custom, reusable version of Gemini that remembers all that context for you. You set it up once — and every time you use it, the persona, rules, and knowledge are already there."

---

### Part 1: Show the Problem (3 min)

**Goal:** Demonstrate why a one-off prompt without context produces weak output.

**Step 1.1:** In a fresh Gemini chat, paste the student submission content (copy from `Sample-Student-Submission.docx.md` — just the "My Answer" section).

**Step 1.2:** Type this prompt:

```
Give me feedback on this student's hypothesis testing answer.
```

**Step 1.3:** Observe Gemini's generic response. It will probably:
- Mention the student used a z-test where a t-test would be appropriate
- Give vague suggestions
- Lack a rubric structure
- Miss the nuances of the interpretation weakness

Point these out to the class:

> "Notice what's missing. It doesn't mention our grading rubric because it doesn't know one exists. It's not using the feedback tone guidelines from our school. And if I had 30 student submissions to mark, I'd have to re-explain all of this every single time."
>
> "Let's fix that by building a Gem."

---

### Part 2: Build the Assignment Feedback Gem (10 min)

**Step 2.1 — Open the Gems interface (30 sec)**

1. Click **Gems** in the left sidebar of [gemini.google.com](https://gemini.google.com)
2. Click **Create a Gem** (or **New Gem**, depending on UI version)

> "Every Gem has a name, a short description, instructions, and optional knowledge files. The instructions are where the magic happens — but the description is what you'll thank yourself for later when you have 10 Gems and can't remember which is which."

**Step 2.2 — Name and describe the Gem (30 sec)**

Enter the name: **"ST0001 Assignment Feedback"**

Enter the description:

```
Provides constructive, rubric-aligned feedback on ST0001 Statistics I assignments. Scores the four rubric criteria, quotes specific student work, and suggests next steps — under 400 words, encouraging tone.
```

> "The description is how future-you (and anyone you share the Gem with) knows what it does without opening it up. Think of it like a file summary."

**Step 2.3 — Write the instructions (5 min)**

Paste the following into the instructions field. Explain each section as you type it.

```
You are an experienced statistics tutor at Singapore Polytechnic's School of Mathematical Sciences and Analytics. Your role is to provide constructive, rubric-aligned feedback on student assignments for ST0001 Statistics I.

## Your Task

When given a student submission, evaluate it against the ST0001 Grading Rubric (which is in your knowledge files). Provide feedback across four criteria:

1. Statistical Understanding (30%)
2. Computation and Accuracy (30%)
3. Interpretation and Communication (25%)
4. Presentation and Organisation (15%)

## Feedback Format

Always structure your feedback as follows:

**Strengths** — Start with at least one specific thing the student did well

**Criterion-by-Criterion Review** — For each of the 4 criteria:
- Assign a score (0-4) based on the rubric
- Quote a specific part of the student's work that supports the score
- Explain what they did well or where they went wrong
- Suggest a specific improvement

**Overall Score** — Sum the scores (out of 16) and convert to a letter grade using the rubric's grade conversion table

**Next Steps** — 2-3 specific, actionable suggestions for the student's next submission

## Tone Guidelines

- Always lead with what the student did well, even if the work has many errors
- Be specific about errors — instead of "wrong method", say "you used a z-test here, but since the population standard deviation is unknown and n < 30, a t-test would be more appropriate"
- Use encouraging language: "You're on the right track with..." rather than "You failed to..."
- Point students to specific resources (lecture week numbers, tutorial questions) when suggesting improvements
- Distinguish between conceptual errors (chose wrong method) and computational errors (arithmetic mistakes)

## Constraints

- Never give the student the full correct answer — guide them to figure it out
- Only give feedback on the submission provided; do not invent details about the student or the assignment
- If the submission is incomplete or unclear, ask for clarification rather than guessing
- Keep the total feedback under 400 words
```

Walk through each section as you paste:

> "**Persona first** — I'm telling Gemini who it is. An experienced tutor at SP. This changes its tone from generic to contextual."
>
> "**Task** — I'm being explicit about what to evaluate and against what criteria. Notice I'm referencing a rubric that will be in the knowledge files."
>
> "**Format** — This is critical. Without this, Gemini might give me paragraphs of prose. With this, I get a consistent structure every time. I can copy-paste the output straight into Google Classroom."
>
> "**Tone guidelines** — These are the 'soft skills' of good feedback. Writing them once in a Gem means I never have to think about them again."
>
> "**Constraints** — These are the guardrails. No invented details, no full answers. Without constraints, Gems can be too helpful in the wrong way."

**Step 2.4 — Upload the knowledge file (1 min)**

1. Scroll to the **Knowledge** section of the Gem editor
2. Click **Add knowledge** (or **Upload file**)
3. Select the "ST0001 Grading Rubric" Google Doc from Drive (or upload the Markdown file directly)

> "Now the Gem has the rubric. When it evaluates a student's work, it can reference the actual criteria and grade bands — not make them up."

**Step 2.5 — Save the Gem (15 sec)**

Click **Save** (or **Create**). The Gem is now ready to use.

**Step 2.6 — Quick review (1 min)**

Point out what's on screen:
- The Gem name at the top
- The instructions (collapsed or shown)
- The knowledge files listed
- A chat interface below — this is where you interact with the Gem

> "That took about 5 minutes to build. Now let's test it."

---

### Part 3: Test the Gem (5 min)

**Step 3.1 — Paste the same student submission (30 sec)**

Copy the "My Answer" section from `Sample-Student-Submission.docx.md` and paste it into the Gem's chat box. Add the following prompt at the end:

```
Please provide feedback on this student submission.
```

**Step 3.2 — Observe the output (3 min)**

The Gem should return a response that:
- Opens with at least one strength
- Scores each of the 4 rubric criteria (out of 4) with a specific justification
- Catches the **z-test vs t-test error** and explains why t-test is correct
- Catches the **weak interpretation** ("The boxes are underfilled" — should reference confidence level and context)
- Provides an overall score out of 16 and a letter grade
- Ends with 2-3 actionable next steps
- Stays under 400 words

Walk through the output with the audience:

> "Look at the difference. Before the Gem, we got generic feedback. Now:
> - It's scoring against our actual rubric
> - It's quoting the student's specific work
> - It's giving encouraging but honest feedback
> - It's referencing the correct statistical concepts
> - It's telling the student *what to do next*
>
> And I'll get this same quality of output on submission #2, submission #30, submission #300. I set it up once."

**Step 3.3 — Side-by-side comparison (1 min)**

If screen space allows, show the "before" and "after" outputs next to each other. Point out:
- Consistency of format
- Quality of specific suggestions
- Rubric-aligned scoring
- Tone

---

### Part 4: Iterate on the Gem (4 min)

**Goal:** Demonstrate that Gems are refinable — you don't have to get it right the first time.

**Step 4.1 — Identify something to improve**

Look at the output and find one thing you'd tweak. Common issues:
- Too verbose → ask for more concise feedback
- Not enough emphasis on strengths → tell the Gem to always list 2 strengths
- Missing a specific check → add it to the instructions

**Step 4.2 — Edit the Gem**

1. Click the Gem name → **Edit Gem** (or the pencil icon)
2. Add a new line to the instructions, for example:

```
## Additional Requirements

- Always include at least TWO distinct strengths before any critique
- If the student's interpretation is weak, quote it directly and explain what a stronger interpretation would include (without writing it for them)
```

3. Save the Gem

**Step 4.3 — Test again**

Paste the same student submission and observe how the output changes.

> "Gems are living tools. You'll tweak them as you learn what works. This is actually how production AI systems are built — iteratively, based on real outputs."

---

### Transition to Exercise (2 min)

> "You've seen the pattern: Persona → Task → Format → Tone → Constraints → Knowledge files. Those are the ingredients of every good Gem."
>
> "Now it's your turn. Pick a task *you* do repeatedly — something you'd love to stop re-explaining to Gemini every time. I've got three starter scenarios, but feel free to build your own."

---

## Hands-On Exercise (15 min)

### Instructions for Participants

**Goal:** Build a custom Gem for a task you do repeatedly in your role.

**Steps:**

1. Go to [gemini.google.com](https://gemini.google.com) → Gems → Create a Gem
2. Name your Gem (start with your scenario, e.g., "Meeting Minutes Formatter")
3. Write the instructions using the Persona → Task → Format → Tone → Constraints pattern
4. Optionally add a knowledge file from your Drive
5. Test with at least 2 different inputs
6. Iterate based on the output

---

### Scenario Options

#### Scenario A: Assignment Feedback Gem (Recommended for first-timers)

Build the same Gem from the demo, but for a different module or assignment type you work with. Use the grading rubric as a knowledge file.

**Starter instructions:**
```
You are an experienced [subject] tutor at Singapore Polytechnic. Your role is to provide constructive, rubric-aligned feedback on student assignments.

Task: Evaluate the student submission against the rubric in your knowledge files. Provide:
- 2 specific strengths
- Score against each rubric criterion
- 2-3 actionable next steps

Tone: Lead with strengths. Be specific about errors. Use encouraging language.

Constraints: Do not give full answers. Keep feedback under 400 words.
```

---

#### Scenario B: Meeting Minutes Gem

Build a Gem that takes unstructured meeting notes and outputs formatted minutes with action items.

**Test input:** Use `Rough-Meeting-Notes.txt` from the sample documents folder (the SMSA department meeting notes).

**Starter instructions:**
```
You are a professional meeting secretary for the School of Mathematical Sciences and Analytics at Singapore Polytechnic. Your role is to transform rough meeting notes into formatted minutes.

Task: Given unstructured notes, produce minutes with these sections:
1. Meeting metadata (date, attendees, chair)
2. Discussion summary by topic
3. Decisions made
4. Action items with owner and deadline
5. Next meeting

Format: Use clear headings. Action items as a table with columns: Item | Owner | Deadline | Status.

Tone: Professional and neutral. Preserve key details but remove filler.

Constraints: Do not invent decisions or action items not present in the source notes. If something is ambiguous, flag it with [TO CONFIRM].
```

**Expected output quality:** The Gem should extract Jason's room booking task, Siti's survey task, Mark's bug fixes, Priya's industry engagement follow-up, Dr Tan's PD application — all with the correct deadlines mentioned in the notes.

---

#### Scenario C: Data Dictionary Gem

Build a Gem that takes a prose dataset description and outputs a structured data dictionary.

**Test input:** Use `Sample-Dataset-Description.txt` (the SP Student Wellness Survey dataset).

**Starter instructions:**
```
You are a data documentation specialist. Your role is to convert prose dataset descriptions into structured data dictionaries.

Task: Given a dataset description, produce a data dictionary with these sections:
1. Dataset Overview (name, source, collection method, size)
2. Field-by-Field Specification (as a table: Field Name | Data Type | Description | Allowed Values | Notes)
3. Data Quality Notes (missing values, imputations, known issues)
4. Usage Notes (any constraints or caveats for analysts)

Format: Markdown tables. Consistent field naming (snake_case).

Tone: Technical and precise.

Constraints: Only include fields mentioned in the source description. Flag any ambiguities. Do not invent field types if not specified.
```

**Expected output quality:** The Gem should extract all 22 fields from the wellness survey description with correct data types and allowed value ranges.

---

### Instructor Notes for Exercise Facilitation

- **Most common issue:** Instructions are too vague. Participants write "Give feedback on student work" and get generic output. Coach them to be explicit about format and constraints.
- **Second most common issue:** Forgetting the knowledge file. The Gem can't reference a rubric it doesn't have.
- **"My Gem isn't doing what I want"** — Walk them through: (1) What does the current output look like? (2) What should it look like? (3) What instruction could close that gap? Add it and test again.
- **For fast finishers:** Challenge them to build a Gem that uses two knowledge files (e.g., a rubric AND a previous well-graded submission as a reference example).
- **Data privacy reminder:** Do not upload real student submissions with personal data. Use the sample files or anonymised examples.

---

## Key Takeaways to Reinforce

After the exercise, briefly recap before moving to the next session:

1. **Gems = reusable Gemini** — set up the context once, use it forever
2. **The ingredients:** Persona → Task → Format → Tone → Constraints → Knowledge
3. **Be explicit about format** — vague instructions give vague output
4. **Iterate, don't agonise** — save the first version, test it, refine based on real outputs
5. **Knowledge files ground the Gem** — use them to give the Gem reference materials like rubrics, style guides, or FAQ documents
6. **This connects forward** — the same instruction-writing discipline powers Workspace Studio Agents (Session 7) and Vertex AI system prompts (Session 8+)

---

## Common Pitfalls

| Pitfall | How to avoid |
|---------|--------------|
| Instructions are too short | Include all 5 elements: persona, task, format, tone, constraints |
| No knowledge files | Upload reference documents (rubrics, style guides, FAQs) so the Gem can ground its output |
| Inconsistent output format | Explicitly state the output format with section names, tables, word limits |
| Gem "forgets" the rules mid-conversation | Keep instructions under ~500 words; move reference content to knowledge files |
| Sharing sensitive Gems | Remember: shared Gems are visible to recipients — don't bake in private data as examples |
| Expecting perfection on first try | Build, test, refine — iteration is the normal workflow |
