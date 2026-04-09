# Session 11: Wrap-Up & Action Planning — Talking Points

**Duration:** 15 min
**Format:** Instructor-led recap, individual reflection, open Q&A

---

## 1. Recap — The Spectrum You Experienced (3 min)

### Walk back through the day's progression:

> "Let's look at what you've done today — not just the tools, but the pattern."

| Level | What you did | Session |
|-------|-------------|---------|
| **Using AI** | Prompted Gemini to write emails, generate documents, analyse data in Sheets | Sessions 2–4 |
| **Customising AI** | Created Gems with persona, task, and grounding instructions | Session 2 |
| **Researching with AI** | Saw how NotebookLM grounds responses in your own documents | Session 5 |
| **Automating with AI** | Used Gemini to generate Apps Script — automations that run without you | Session 6 |
| **Building with AI** | Built a Workspace Studio Flow — a no-code automation with Gemini as a first-class step | Session 7 |
| **Developing with AI** | Used Vertex AI Studio and the Gemini API to test and call models programmatically | Sessions 9–10 |

> "You went from typing a prompt in a chat box to calling an API in Python. That's a significant range in one day."

---

## 2. The Thread That Connects Everything (2 min)

> "There's one idea that ran through the entire day: **grounding**."
>
> - Gems: you grounded them with knowledge files and instructions
> - NotebookLM: it's entirely grounded in your uploaded sources
> - Workspace Flows: the `Ask Gemini` step is grounded on the trigger event data (emails, sheet rows, form responses)
> - Apps Script: grounded in your spreadsheet data
> - Vertex AI Studio: you saw system prompts and document grounding
> - Gemini API: you applied the same grounding concepts in code
>
> "Every time we constrained the model — told it what to know, what not to do, what documents to use — the output got better and more reliable. That's the single most important thing to take away."

---

## 3. Quick Wins for Monday (3 min)

> "You don't need to build a flow on Monday. Start with these:"

### Win 1: Create one Gem for a task you do every week
- Feedback writing, email drafting, meeting summary formatting
- Takes 5 minutes to set up, saves time every time you use it

### Win 2: Try Gemini in Sheets on a real dataset
- Open a spreadsheet you're working on
- Ask Gemini to generate a formula, create a chart, or classify rows
- The =AI() function works on existing data immediately

### Win 3: Create a NotebookLM notebook for one module
- Upload your lecture notes, tutorial worksheets, past papers
- Use it as a teaching preparation tool — or share the audio overview with students

---

## 4. Action Planning — Individual Reflection (3 min)

Ask participants to write down (on paper or in a Google Doc):

> "Think about one automation or AI assistant you'd like to build for your role. Write down:"

1. **What task would it handle?** (e.g., "Answer student FAQs about module policies")
2. **Which tool would you use?** (Gem / Apps Script / Workspace Flow / Vertex AI)
3. **What data sources would it need?** (e.g., FAQ doc, grade sheet, schedule)
4. **What's the first step you'd take?** (e.g., "Create the FAQ document in Google Drive")

> "You don't need to build it today. But writing it down makes it 10x more likely to happen."

---

## 5. Resources for Next Steps (2 min)

Share these links (display on screen or distribute as a handout):

### Google Workspace with Gemini
- [Google Workspace Learning Path](https://cloud.google.com/training/workspace) — self-paced modules for each Workspace app
- [Gemini for Google Workspace prompting guide](https://workspace.google.com/resources/gemini-for-workspace-prompting-guide/) — role-specific prompts and use cases
- [NotebookLM](https://notebooklm.google.com) — start creating notebooks immediately

### Apps Script
- [Apps Script documentation](https://developers.google.com/apps-script) — reference and tutorials
- [Apps Script samples](https://github.com/googleworkspace/apps-script-samples) — working examples to learn from

### Google Cloud & Vertex AI
- [Google Cloud Skills Boost](https://www.cloudskillsboost.google/) — the remaining 2 labs from today's course are available here:
  1. Advanced Prompt Architectures (60 min)
  2. Implementing RAG Using LangChain (30 min)
- [Vertex AI documentation](https://cloud.google.com/vertex-ai/docs) — full platform reference
- [Gemini API quickstart](https://ai.google.dev/gemini-api/docs/quickstart) — get started with the API

---

## 6. Q&A (2 min)

> "What questions do you have — about anything we covered today, or about how you might apply it in your work?"

Keep answers brief. If a question requires a deep dive, offer to follow up after the session.

---

## Closing

> "Thank you for spending the day with us. You've covered a lot of ground — from Gemini in your inbox to Python API calls on Google Cloud. The tools will keep evolving, but the core skills you practised today — writing clear instructions, grounding AI in your data, and thinking about automation — those are durable."
>
> "Please take a moment to complete the feedback survey. Your input directly shapes how we run future workshops."

Distribute feedback survey link.

---

## Slide Suggestions

If building slides for this session:

1. **Recap table** — the six-level progression from the day
2. **The grounding thread** — visual showing grounding as the common concept
3. **Three quick wins** — simple, actionable list
4. **Action planning template** — the four questions displayed for individual reflection
5. **Resources** — QR codes linking to the key resources
6. **Thank you / feedback** — survey link and closing
