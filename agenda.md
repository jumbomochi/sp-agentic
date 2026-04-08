# AI-Powered Productivity with Google Gemini & Agentic AI

**One-Day Course for Singapore Polytechnic, School of Mathematical Sciences and Analytics**

**Audience:** Novice to Intermediate (basic GenAI/prompting knowledge; some have built chatbots in Copilot Studio)
**Duration:** ~7.5 hours (excluding breaks)

---

## Course Overview

This course bridges **everyday AI productivity** (Gemini in Workspace) with **agentic AI concepts** (building intelligent agents on Google Cloud), tailored for educators and staff in a mathematics/analytics context. Participants leave with hands-on experience using Gemini across Workspace apps, creating custom Gems, building no-code agents in Workspace Studio, generating Apps Script automations with AI, and hands-on lab experience building an ADK agent with session and memory services on Google Cloud.

---

## Agenda

### Morning Block 1 — Foundations (9:00 AM – 10:15 AM)

#### Session 1: Welcome & The Gemini Ecosystem (30 min)

| Topic | Details |
|-------|---------|
| What is Generative AI (quick recap) | Brief since audience has basic GenAI knowledge |
| The Google Gemini ecosystem overview | Gemini app, Workspace with Gemini, NotebookLM, Google Vids — where each fits |
| From assistants to agents | The AI maturity spectrum: prompting → Gems → Workspace agents → coded agents on GCP |
| Responsible AI | Google's AI principles, hallucination awareness, verification practices |
| Using Gemini responsibly in education | Academic integrity, data privacy for student data |

**Framing for audience:** Position the day as a journey from "AI as a helper" to "AI as a worker" — relevant for automating administrative tasks, developing teaching materials, and supporting analytics workflows.

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

**Hands-on Exercise (20 min):** Build a "Student Query Agent" that:

- Has access to a FAQ document and a module schedule sheet
- Can answer common student questions about deadlines, module content, and policies
- Provides grounded answers with references to source documents

**Bridge for Copilot Studio users:** Copilot Studio uses Power Platform connectors; Workspace Studio uses native Workspace integrations. Same concept, different ecosystem.

---

### Break (2:45 PM – 3:00 PM)

---

### Afternoon Block 2 — Building Agents on Google Cloud (3:00 PM – 4:45 PM)

#### Session 8: Google's Agentic Stack & Managing Context (30 min)
*Lecture — sets up concepts for the hands-on lab*

| Topic | Details |
|-------|---------|
| The AI agent spectrum | From Gems → Workspace Agents → ADK-built agents → Production agents |
| Google's agentic stack | Gemini models, Agent Development Kit (ADK), Vertex AI Agent Engine |
| Key concepts: Tools | Agents calling APIs and external systems to take actions |
| Key concepts: Sessions & State | How agents maintain conversation history and share data across turns |
| Key concepts: Memory | How agents remember information across separate conversations |
| Key concepts: Examples | Few-shot learning — teaching agents by showing them input/output pairs |
| MCP & A2A (brief) | Model Context Protocol (tools as microservices) and Agent2Agent (agents as microservices) |
| Where no-code ends and code begins | When to use Workspace Studio vs. when you'd need ADK/code |

**Key message:** Sessions, memory, and examples are what turn a stateless LLM into a useful agent. The upcoming lab lets you see this first-hand.

#### Session 9: Hands-On Lab — Building an ADK Agent with Session and Memory Services (60 min)
*Google Cloud Skills Boost lab (HotLab — 180-min persistence)*

| Phase | Details |
|-------|---------|
| Lab activation | Participants activate lab via Google Cloud Skills Boost; receive temporary GCP project |
| Guided walkthrough | Instructor walks through the lab steps on-screen; participants follow along |
| Session services | Implement and test InMemorySessionService, then switch to a persistent service |
| Memory services | Enable memory so the agent remembers information across separate conversations |
| Testing context management | Verify the agent recalls prior preferences and context |
| Wrap-up & debrief | Discuss what they built and how it connects to the day's themes |

**Instructor guidance for mixed audience:**
- *Novice participants:* Follow along step-by-step; focus on understanding what the code does, not writing it from scratch. The lab provides all code — participants copy, paste, and run.
- *Intermediate participants:* Encouraged to experiment — try modifying agent instructions, adding state variables, or testing edge cases in the memory service.
- *All participants:* The lab environment is fully provisioned (no local setup needed). If participants get stuck, they can pair up or follow the instructor's screen.

**Connection to the morning:** "This morning you built Gems (custom prompts) and Workspace Agents (no-code). This lab shows you what's happening under the hood — how agents manage the context that makes them feel intelligent."

---

#### Session 10: Wrap-Up & Action Planning (15 min)

| Topic | Details |
|-------|---------|
| Recap of the day | Gemini productivity → Gems → Apps Script → Workspace Agents → ADK Lab |
| The spectrum you experienced | Using AI → Customising AI → Automating with AI → Building AI agents |
| Quick wins to implement Monday | 3 things each participant can do immediately |
| Action planning | Each participant writes down 1 automation or agent they want to build for their role |
| Resources & next steps | Google Workspace Learning Path, ADK documentation, Apps Script tutorials, remaining 3 labs |
| Q&A | Open floor |

---

## Course Design Rationale

| Design Decision | Rationale |
|----------------|-----------|
| Sheets before Docs/Gmail | Analytics audience — lead with their strength area |
| NotebookLM trimmed to demo only | Freed 15 min for lab; participants can explore independently |
| Gems trimmed from 60→45 min | Deep Research and Canvas covered together; freed 15 min for lab |
| Apps Script via Gemini generation | Removes coding barrier; participants prompt for code rather than write it |
| Workspace Studio Agents as a separate block | Key bridge between "using AI" and "building with AI" |
| Lab 1 chosen over Labs 2–4 | Most self-contained; no prerequisite labs; session/memory concepts are universally accessible |
| Lecture before lab (Session 8→9) | Conceptual framing makes the lab more meaningful; participants understand *why* before *how* |
| Copilot Studio bridge points | Acknowledges advanced learners' prior experience and helps map concepts across ecosystems |
| Education-specific scenarios throughout | Grade tracking, student queries, teaching material generation — immediately relevant |
| Progressive complexity | Morning = use AI → Afternoon = build with AI → Late afternoon = build agents on GCP |

---

## Materials Needed

- Google Workspace accounts with Gemini enabled (Business Standard or higher)
- Access to Workspace Studio (admin must enable)
- Google Cloud Skills Boost accounts (for Lab 1 activation)
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
| Workspace Agents | Build from template with guided steps | Configure custom actions and multi-source grounding |
| ADK Lab | Follow along step-by-step, focus on concepts | Experiment with modifications, test edge cases |
| Agentic concepts | Absorb the high-level story | Connect to Copilot Studio experience, discuss MCP/A2A implications |

---

## Lab Details

### Lab 1: Building an ADK Agent with Session and Memory Services

- **Source:** Build Production-Ready Agents on Google Cloud (Module 2 lab)
- **Platform:** Google Cloud Skills Boost (HotLab)
- **Duration:** 60 min guided (lab environment persists for 180 min)
- **Prerequisites:** None — lab provides all code and a fully provisioned GCP environment
- **What participants will do:**
  - Implement and test tools for managing conversational context
  - Work with multiple SessionService implementations (InMemory → persistent)
  - Enable MemoryService so the agent remembers across conversations
  - Optionally explore the Vertex AI Example Store service
- **What participants will learn:**
  - Why LLMs need external state management to be useful agents
  - How sessions, state, and memory work together
  - The difference between development (in-memory) and production (cloud-managed) services
- **Remaining labs for self-study:** Participants are encouraged to complete the remaining 3 labs independently:
  1. Use Model Context Protocol (MCP) Tools with ADK Agents
  2. Connect to Remote Agents with ADK and the Agent2Agent (A2A) SDK
  3. Implementing End-User Interfaces for Agents on Google Cloud
