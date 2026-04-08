# Session 5: NotebookLM for Research & Teaching — Demo Guide

**Duration:** 15 min (instructor-led demo only — no participant hands-on)
**Format:** Live demo with narration

---

## Pre-Session Setup

### 1. Create the Demo Notebook

1. Go to [notebooklm.google.com](https://notebooklm.google.com)
2. Click **New notebook**
3. Name it: **"Statistics I — Teaching Hub"**
4. Add 2–3 sources. Recommended:
   - The "ST0001 Statistics I — Module FAQ" Google Doc (same one from Session 7 prep)
   - A publicly available introductory statistics PDF or textbook chapter (e.g., OpenStax Introductory Statistics, Chapter 1)
   - Optionally: a lecture note document or tutorial worksheet you've created

> The goal is to have at least 2 different source types (Doc + PDF) so you can demonstrate cross-source querying.

### 2. Pre-Generate an Audio Overview (Optional)

Audio overviews take a few minutes to generate. If you want to play one during the demo, generate it in advance:
1. Open the notebook
2. Click **Generate audio overview** (or the Audio Overview button)
3. Wait for it to complete (~2-5 min)
4. Verify it plays correctly

If you skip this, you can start the generation live and explain what it does while it processes.

---

## Demo Script (15 min)

### Opening (1 min)

> "Before lunch, let me show you one more tool in the Gemini ecosystem — NotebookLM. This is different from everything we've seen so far. Gemini and Workspace with Gemini use Google's training data plus your prompts. NotebookLM uses *only your uploaded sources*."
>
> "That means less hallucination. If the answer isn't in your documents, it tells you. For teaching and research, that's a big deal."

### Part 1: The Knowledge Hub (3 min)

Show the pre-built notebook with its sources.

> "I've created a notebook for Statistics I with our module FAQ and a statistics textbook chapter as sources."

Highlight:
- The source panel (left side) — shows uploaded documents
- Source types supported: Google Docs, Slides, PDFs, websites, YouTube videos, audio files
- Each source can be up to 500,000 words; up to 50 sources per notebook

> "Think of this as a private research assistant that's read everything you've uploaded and is ready to answer questions — but *only* from those sources."

### Part 2: Querying Across Sources (5 min)

Type these queries live:

**Query 1 — Single-source lookup:**
```
What is the grading breakdown for this module?
```
> Show how it returns the answer with inline citations pointing to the FAQ document.

**Query 2 — Cross-source synthesis:**
```
Based on the module content, what statistical concepts should students focus on for the final exam?
```
> This should pull from both the FAQ (exam topics listed) and the textbook chapter (concept explanations). Show the citations spanning multiple sources.

**Query 3 — Teaching preparation:**
```
Create a 5-question quiz on probability based on the uploaded materials.
```
> Show how it generates questions grounded in the actual content, not generic textbook questions.

> "Notice the citations. Every claim links back to a specific source. Click one — it takes you to the exact passage. That's the difference between NotebookLM and asking Gemini the same question."

### Part 3: Audio Overview (3 min)

Play the pre-generated audio overview (or start generating one live).

> "This is one of NotebookLM's standout features. It creates a podcast-style audio summary of your sources — two AI hosts discussing your content in a conversational format."

Play 30–60 seconds of the audio.

> "Imagine giving this to students as a revision resource. Or creating one from a set of research papers before a department meeting. The audio is generated from *your specific documents*, not generic content."

### Part 4: NotebookLM Plus (1 min)

Briefly mention enterprise features:

> "NotebookLM Plus — available separately from Google Workspace — adds:
> - **Shared notebooks** so your whole department can collaborate on one knowledge hub
> - **Higher capacity** — more sources, more queries
> - **Enterprise data protections**
>
> Note: NotebookLM Plus is not part of Google Workspace with Gemini — it's a separate product in the Gemini ecosystem."

### Closing (2 min)

> "NotebookLM is a tool you can start using immediately — no setup, no admin permissions needed. Upload your lecture notes, tutorial worksheets, and module guides, and you have an instant teaching assistant grounded in your actual materials."
>
> "I'd encourage you to try it after today's workshop. Upload a set of materials for one of your modules and see what it can do."

**Transition to lunch:**
> "That wraps up the morning. After lunch, we shift from *using* AI to *building* with AI — starting with Apps Script automations and then Workspace Studio Agents."

---

## Backup Plan

If NotebookLM is unavailable or slow during the demo:

1. Show screenshots of the notebook interface and audio overview feature
2. Walk through the concept verbally with the Gems comparison:
   - Gem = custom prompt + static knowledge files
   - NotebookLM = research assistant + live source citations + audio overviews
3. Direct participants to [notebooklm.google.com](https://notebooklm.google.com) for self-exploration after the workshop
