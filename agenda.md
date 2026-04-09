# AI-Powered Productivity with Google Gemini & Application Development with LLMs

**One-Day Course for Singapore Polytechnic, School of Mathematical Sciences and Analytics**

**Audience:** Novice to Intermediate (basic GenAI/prompting knowledge; some have built chatbots in Copilot Studio)
**Duration:** ~7.5 hours (excluding breaks)

---

## Course Overview

This course bridges **everyday AI productivity** (Gemini in Workspace) with **LLM application development on Google Cloud** (Vertex AI Studio, prompt engineering, and the Gemini API), tailored for educators and staff in a mathematics/analytics context. Participants leave with hands-on experience using Gemini across Workspace apps, creating custom Gems, automating across Workspace with no-code flows in Workspace Studio, generating Apps Script automations with AI, and hands-on lab experience with Vertex AI Studio and the Gemini API on Google Cloud.

---

## Agenda

### Morning Block 1 — Foundations (9:00 AM – 10:15 AM)

#### Session 1: Welcome & The Gemini Ecosystem (30 min)

| Topic | Details |
|-------|---------|
| What is Generative AI (quick recap) | Brief since audience has basic GenAI knowledge |
| The Google Gemini ecosystem overview | Gemini app, Workspace with Gemini, NotebookLM, Google Vids — where each fits |
| From assistants to agents | The AI maturity spectrum: prompting → Gems → Workspace agents → LLM-powered apps on GCP |
| Responsible AI | Google's AI principles, hallucination awareness, verification practices |
| Using Gemini responsibly in education | Academic integrity, data privacy for student data |

**Framing for audience:** Position the day as a journey from "AI as a helper" to "AI as a development platform" — relevant for automating administrative tasks, developing teaching materials, and supporting analytics workflows.

#### Session 2: The Gemini App & Custom Gems (45 min)

| Topic | Details |
|-------|---------|
| Navigating the Gemini app | Web & mobile, starting conversations, uploading files |
| Deep Research & Canvas | Research across sources; creating/transforming content in the side panel |
| Gems — Custom AI Assistants | Creating Gems with persona, task, context, and format instructions |
| Uploading knowledge files to Gems | Grounding Gems in your own documents |

**Hands-on Exercise (15 min):** Create a custom Gem for your role.

- *Lecturer:* "Assignment Feedback Gem" — persona of a constructive tutor, takes student work as input, provides structured feedback
- *Administrator:* "Meeting Minutes Gem" — takes rough notes, outputs formatted minutes with action items
- *Analytics staff:* "Data Dictionary Gem" — takes a dataset description, generates a structured data dictionary

**Bridge for Copilot Studio users:** Gems are conceptually similar to custom GPTs/copilots but are tightly integrated into Google Workspace.

---

### Break (10:15 AM – 10:30 AM)

---

### Morning Block 2 — Workspace Productivity for Math & Analytics (10:30 AM – 12:00 PM)

#### Session 3: Gemini in Google Sheets — Analytics Focus (45 min)

| Topic | Details |
|-------|---------|
| Generating and refining tables | Create structured data from prompts |
| Formula generation with Gemini | Natural language → Sheets formulas (AVERAGE, VLOOKUP, etc.) |
| Performing actions | Conditional formatting, currency formatting via Gemini |
| Data analysis & insights | Generating charts, graphs, and summary insights |
| The =AI() function | Using AI functions to classify, categorize, and generate text in cells |

**Hands-on Exercise (15 min):** Scenario tailored to the School:

- Generate a student grade tracker with columns for Student ID, Module, CA Score, Exam Score, Final Grade
- Use Gemini to create a formula that calculates weighted final grades
- Use =AI() to classify students into "At Risk" / "On Track" / "Excelling" based on scores
- Generate a chart showing grade distribution

#### Session 4: Gemini in Docs & Gmail — Teaching Materials & Admin (30 min)

| Topic | Details |
|-------|---------|
| Generating documents | Creating lesson plans, tutorial worksheets, FAQ documents |
| Refining content | Adjusting tone, length, and audience level |
| Side panel enhancement | Using Gemini to improve existing documents |
| Gmail: Writing & summarizing emails | Drafting administrative emails, summarizing long threads |
| Using Gems in Gmail side panel | Applying custom Gems in email context |

**Quick Exercise (10 min):** Use Gemini to generate a tutorial worksheet for a statistics topic, then refine it for a specific student level.

#### Session 5: NotebookLM for Research & Teaching (15 min — demo only)

| Topic | Details |
|-------|---------|
| What is NotebookLM | Grounded AI assistant for your own sources — lesser chance of hallucination |
| Live demo | Create a notebook with 2–3 module materials, query across sources, generate an audio overview |
| NotebookLM Plus | Shared hubs for departments, increased capacity |

**Instructor-led demo only** — no hands-on; participants observe and can explore independently after the course.

---

### Lunch (12:00 PM – 1:00 PM)

---

### Afternoon Block 1 — From Productivity to Automation (1:00 PM – 2:45 PM)

#### Session 6: Apps Script Generation with Gemini (45 min)

| Topic | Details |
|-------|---------|
| What is Google Apps Script | JavaScript-based automation platform for Google Workspace |
| Why Apps Script matters | Automate repetitive tasks without external tools |
| Using Gemini to generate Apps Script | Prompt Gemini to write scripts — no coding experience required |
| Example 1: Auto-email grades | Script that reads Sheets data and sends personalised grade notification emails via Gmail |
| Example 2: Form response processor | Script triggered by Google Form submissions that auto-populates a tracker and sends confirmations |
| Installing and running scripts | Opening Script Editor, pasting generated code, authorising, running |
| Triggers | Setting up time-based or event-based automation |

**Hands-on Exercise (15 min):** Choose one automation scenario:

- *Beginner:* Use Gemini to generate a script that sends a personalised email to each student in a Sheets list
- *Intermediate:* Use Gemini to generate a form-triggered script that logs responses and sends a summary email to the lecturer

**Key prompting pattern for Apps Script:**

```
Act as a Google Apps Script developer. Write a script that:
- Reads data from a Google Sheet named "[name]"
- [Describe the automation]
- Include comments explaining each section
- Handle errors gracefully
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

**Hands-on Exercise (20 min):** Build an Intelligent Inbox Triage flow — or pick one of three tiered scenarios from the demo guide:

- *Beginner:* Morning Inbox Digest (scheduled `Recap unread emails` → `Notify in Chat`)
- *Intermediate:* Email-to-Task Extractor (`Ask Gemini` extracts deadlines from incoming emails and creates Google Tasks)
- *Advanced:* Student Query Router (multi-branch classification and Chat routing)

**Bridge for Copilot Studio users:** Workspace Studio Flows are conceptually equivalent to Power Automate with built-in Copilot steps — visual, event-driven, no-code automation where AI is a first-class step inside the pipeline.

---

### Break (2:45 PM – 3:00 PM)

---

### Afternoon Block 2 — LLM Development on Google Cloud (3:00 PM – 4:45 PM)

#### Session 8: Vertex AI Studio & Prompt Engineering (20 min)
*Lecture — sets up concepts for the two hands-on labs*

| Topic | Details |
|-------|---------|
| What is Vertex AI | Google Cloud's ML platform — Model Garden, Vertex AI Studio, model tuning |
| Vertex AI Studio overview | Low-code prompt playground for Gemini models — freeform, chat, and task modes |
| Choosing the right model | Flash Lite for low latency, Flash for general use, Pro for complex reasoning |
| Prompt engineering techniques | Zero-shot, one-shot, few-shot prompting — when to use each |
| Chain-of-thought prompting | Getting better reasoning by asking the model to "think step by step" |
| Grounding concepts | System prompts, document grounding, search grounding — giving the model context |
| From playground to code | The "Get Code" button in Vertex AI Studio — Python, Node.js, cURL |

**Key message:** "This morning you used Gemini through Workspace apps. Now we go behind the scenes — Vertex AI Studio is where you test and refine prompts before building them into applications. The two labs let you experience both the no-code playground and the Python API."

#### Session 9: Lab 1 — Getting Started with Vertex AI Studio UI (30 min)
*Google Cloud Skills Boost lab*

| Phase | Details |
|-------|---------|
| Lab activation | Participants activate lab via Google Cloud Skills Boost; receive temporary GCP project |
| Exploring Vertex AI Studio | Navigate the console UI — model selection, prompt input, parameter tuning |
| Text prompts | Test summarisation, classification, sentiment analysis, and ideation prompts |
| Multimodal prompts | Experiment with image + text inputs |
| Get Code | Export a working prompt as Python/cURL code for use in applications |
| Prompt Gallery | Browse sample use cases and pre-built prompts for inspiration |

**Instructor guidance for mixed audience:**
- *Novice participants:* Focus on the freeform prompt interface — this is the same Gemini they used this morning, but with more control over model selection and parameters.
- *Intermediate participants:* Experiment with system instructions, temperature settings, and the "Get Code" button to see how prompts translate to API calls.
- *All participants:* No coding required for this lab. The environment is fully provisioned.

#### Session 10: Lab 2 — Getting Started with Gen AI Library + Vertex AI Gemini API (45 min)
*Google Cloud Skills Boost lab*

| Phase | Details |
|-------|---------|
| Lab activation | Participants activate lab; uses Python notebooks in the GCP environment |
| The Gen AI library | Introduction to the `google.genai` Python client — connecting to Gemini models |
| Basic chat function | Wrap `generate_content` in a `chat()` helper and observe model cutoff limits |
| Chat history as memory | Manually manage a `chat_history` list to enable multi-turn conversations |
| System messages | Use system instructions to ground the model's behaviour and persona |
| Document grounding | Upload a file to Cloud Storage and use it as context for the model |
| Google Search tool | Enable `GoogleSearch` as a built-in tool for real-time information |
| Google Maps tool | Use the Maps tool for location-aware queries |
| Embeddings & similarity | Generate text embeddings and compare them with L1, L2, Cosine, and Dot product distance metrics |

**Instructor guidance for mixed audience:**
- *Novice participants:* Follow along step-by-step in the provided notebook. Focus on understanding the pattern: connect → prompt → receive response. The code is pre-written — participants run cells and observe outputs.
- *Intermediate participants:* Encouraged to modify prompts, experiment with different models, try their own grounding documents, and explore the embeddings section.
- *All participants:* The lab runs in a cloud notebook environment — no local Python setup needed. If participants get stuck, they can pair up or follow the instructor's screen.

**Connection to the morning:** "This morning you prompted Gemini through a chat interface. This afternoon you're prompting the same models through code — the same system instructions and grounding concepts apply, but now you can build these into your own applications and automations."

---

#### Session 11: Wrap-Up & Action Planning (15 min)

| Topic | Details |
|-------|---------|
| Recap of the day | Gemini productivity → Gems → Apps Script → Workspace Flows → Vertex AI Studio → Gemini API |
| The spectrum you experienced | Using AI → Customising AI → Automating with AI → Developing with AI on GCP |
| Quick wins to implement Monday | 3 things each participant can do immediately |
| Action planning | Each participant writes down 1 automation or application they want to build for their role |
| Resources & next steps | Google Workspace Learning Path, Vertex AI documentation, Apps Script tutorials, remaining labs |
| Q&A | Open floor |

---

## Course Design Rationale

| Design Decision | Rationale |
|----------------|-----------|
| Sheets before Docs/Gmail | Analytics audience — lead with their strength area |
| NotebookLM trimmed to demo only | Freed 15 min for labs; participants can explore independently |
| Gems trimmed from 60→45 min | Deep Research and Canvas covered together; freed 15 min for labs |
| Apps Script via Gemini generation | Removes coding barrier; participants prompt for code rather than write it |
| Workspace Studio Flows as a separate block | Pairs with Session 6 as the no-code counterpart to code-based automation; bridges "using AI" to "building with AI" |
| Two labs instead of one | Vertex AI Studio UI (no-code) followed by Gemini API (Python) creates a natural progression from playground to code |
| Vertex AI Studio lab first | No-code entry point builds confidence before the Python-based lab |
| Lecture before labs (Session 8→9→10) | Conceptual framing of Vertex AI and prompt engineering makes both labs more meaningful |
| Copilot Studio bridge points | Acknowledges advanced learners' prior experience and helps map concepts across ecosystems |
| Education-specific scenarios throughout | Grade tracking, student queries, teaching material generation — immediately relevant |
| Progressive complexity | Morning = use AI → Afternoon = automate with AI → Late afternoon = develop with AI on GCP |

---

## Materials Needed

- Google Workspace accounts with Gemini enabled (Business Standard or higher)
- Access to Workspace Studio (admin must enable)
- Google Cloud Skills Boost accounts (for lab activation)
- Sample datasets: student grade data, module schedules, FAQ documents
- Pre-prepared Google Sheets and Forms for exercises
- Slide deck with screenshots/demos for Apps Script and Workspace Studio walkthroughs

---

## Differentiation Strategy (Novice to Intermediate)

| Activity | Novice Path | Intermediate Path |
|----------|-------------|-------------------|
| Gems | Follow guided template | Design from scratch with knowledge files |
| Sheets | Generate tables, simple formulas | Use =AI() function, complex analysis |
| Apps Script | Paste and run pre-generated script | Modify generated scripts, add triggers |
| Workspace Flows | Build the Inbox Triage demo flow with guided steps | Build a custom multi-branch flow with conditional logic and tighter Ask Gemini prompts |
| Vertex AI Studio Lab | Explore freeform prompts, try Prompt Gallery | Experiment with system instructions, parameters, Get Code |
| Gemini API Lab | Run pre-written notebook cells, observe outputs | Modify code, try different models, explore embeddings |

---

## Lab Details

### Lab 1: Getting Started with the Vertex AI Studio User Interface

- **Source:** Application Development with LLMs on Google Cloud (Module 2 lab)
- **Platform:** Google Cloud Skills Boost
- **Duration:** 30 min guided
- **Prerequisites:** None — no coding required; fully provisioned GCP environment
- **What participants will do:**
  - Navigate Vertex AI Studio in the Google Cloud console
  - Test text prompts for summarisation, classification, sentiment analysis, and ideation
  - Experiment with multimodal inputs (text + image)
  - Explore model selection and parameter tuning (temperature, top-k, top-p)
  - Use the "Get Code" button to export prompts as Python/cURL
  - Browse the Prompt Gallery for sample use cases
- **What participants will learn:**
  - How Vertex AI Studio provides a controlled environment for prompt testing
  - The relationship between the chat-based Gemini and the API-driven Vertex AI
  - How prompts become code — the bridge from playground to application

### Lab 2: Getting Started with Gen AI Library + Vertex AI Gemini API

- **Source:** Application Development with LLMs on Google Cloud (Module 3 lab — `intro_to_gemini-v1.0.0.ipynb`)
- **Platform:** Google Cloud Skills Boost (Jupyter notebook in Vertex AI Workbench)
- **Duration:** 45 min guided
- **Prerequisites:** Basic comfort reading Python (code is pre-written in notebook cells — run and observe)
- **What participants will do:**
  - Install `google-genai` and connect to Gemini via `genai.Client(vertexai=True, ...)`
  - Build a reusable `chat()` function that wraps `generate_content`
  - Observe the model's knowledge cutoff and lack of real-time information
  - Manage multi-turn conversations by maintaining a `chat_history` list
  - Add system messages to ground the model's persona and behaviour
  - Upload a text file to Cloud Storage and use it as document grounding context
  - Enable the Google Search tool to give the model real-time web access
  - Explore the Google Maps tool for location-aware queries
  - Generate embeddings with `gemini-embedding-001` and compare them using L1, L2, Cosine, and Dot product similarity
  - Compute similarity between a user query and a document chunk — the foundation of RAG search
- **What participants will learn:**
  - How to interact with Gemini models through the Python API
  - The role of system instructions, chat history, and grounding in LLM applications
  - How LLMs handle knowledge cutoffs and multilingual queries
  - Why embeddings and vector similarity are the building blocks of RAG systems
- **Setup note:** The lab includes a step that creates a Google Cloud Storage bucket (e.g., `gs://<project-id>-gemini`) and uploads a context file. This adds ~2 minutes but is handled by the notebook — just run the cell.
  - How the concepts from the morning (prompting, grounding, memory) translate to API calls

### Remaining Labs for Self-Study

Participants are encouraged to complete the remaining 2 labs independently:

1. **Advanced Prompt Architectures** (60 min) — Chain-of-thought, meta-prompting, multistep prompts, RAG, and ReAct patterns
2. **Implementing RAG Using LangChain** (30 min) — Build a retrieval-augmented chatbot with LangChain, vector stores, and the Gemini API
