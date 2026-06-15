# <p align="center">✦ StudyPilot AI ✦</p>
<p align="center">
  <strong>Your Ultimate AI-Powered Academic Companion & Study Workspace</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/Tailwind-v3-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Zustand-State-orange?style=for-the-badge" alt="Zustand" />
  <img src="https://img.shields.io/badge/Framer--Motion-Animated-purple?style=for-the-badge&logo=framer" alt="Framer Motion" />
</p>

---

## 🌟 Introduction

**StudyPilot AI** is a state-of-the-art, recruiter-ready educational productivity suite designed to replace generic flashcard tools, calendar programs, and standalone chat widgets. It unifies note-taking, calendar scheduling, flashcards, mock testing, analytics, speech synthesis, and coding terminals into a cohesive, glassmorphic client-side workspace.

This repository features a **Zero-Auth Demo Pipeline** so anyone can instantly test all features without sign-up forms, subscription walls, or API keys.

---

## 🚀 Interactive Workflows

### 1. Application Architecture Flow
Here is how StudyPilot AI manages its frontend routing, Zustand local state, and mock auth engine:

```mermaid
graph TD
    A[User visits Landing Page] -->|Click Get Started| B(Login/Signup Page)
    B -->|Simulated 1s Auto-Auth| C{localStorage: studypilot-demo}
    C -->|Bypassed by Middleware| D[Main Dashboard Layout]
    D --> E[Sidebar Navigation]
    
    subgraph Core Features
        D --> F[Notes Co-Writer]
        D --> G[AI Voice Tutor]
        D --> H[Spaced Repetition & Heatmap]
        D --> I[Document Intelligence OCR]
    end
    
    subgraph State Management
        F & G & H & I <-->|Sync State| J[(Zustand Store)]
        J <-->|Local Persistence| K[(localStorage Cache)]
    end
```

---

### 2. Spaced Repetition & Revision Loop
The core revision engine tracks forgetting curves and schedules tasks dynamically:

```mermaid
graph LR
    A[New Note / Subject Created] --> B[Generate Flashcards & Quiz]
    B --> C[Perform Revision Session]
    C -->|Assess Difficulty| D{User Feedback}
    D -->|Easy| E[Increase Interval: +7 Days]
    D -->|Medium| F[Keep Interval: +3 Days]
    D -->|Hard| G[Decrease Interval: +1 Day]
    E & F & G --> H[Update Memory Retention Curve]
    H --> I[Plot to Interactive Heatmap]
```

---

## 🛠️ Feature Breakdown

### 🧠 Smart Revision Engine
* **Spaced Repetition Queue**: Sorts topics by urgency level (Overdue, Due Today, Tomorrow, Later).
* **Forgetting Curve Simulation**: Interactive LineChart showing memory retention over time with and without revision.
* **Revision Heatmap**: A custom 24-week grid heatmap visualization tracking daily study streaks.

### 🎙️ AI Voice Tutor
* **Pedagogical Modes**: Focus on different outputs:
  * 👨‍🏫 **Teacher Mode**: Detailed professor-style explanations.
  * 👶 **Beginner Mode**: Analogies and simple terms.
  * 📚 **Exam Mode**: Fast revision bullet points.
  * 🎯 **Interview Mode**: Interactive Q&A loop.
* **Voice Synthesis & Visualizer**: Interactive audio player with custom animated SVG sound waveforms.

### 📂 Advanced Document Intelligence
* **OCR Handwritten Notes**: Mock drop zone to digitize hand-written text.
* **Multi-Format Citation Engine**: Instant citation generation in **APA, MLA, and Chicago** formats.
* **Document Explorer**: Tabs for automatic Paper Summaries, Key Insights, Mind Maps, and custom flashcards.

### 🎥 Lecture Intelligence
* **Lecture Voice uploads**: Drag and drop audio or paste **YouTube links** to transcribe and summarize lectures.
* **Timeline Tracker**: Automated notes with timestamp references.

### 💻 Developer Workspace
* **Integrated Coding Terminal**: Select LeetCode topics, code in a monospace mockup editor, and run simulated test suites.
* **CGPA Tracker**: Grade predictor with interactive SGPA calculation tables per semester.
* **Kanban Task Board**: Categorize to-do items, track subtasks, and manage priorities.

---

## 📂 Project Structure

```text
studypilotai/
├── public/                 # Static assets and icons
└── src/
    ├── app/                # Next.js 15 App Router pages
    │   ├── (auth)/         # Guest-delay signup and login pages
    │   │   ├── login/
    │   │   └── signup/
    │   ├── (dashboard)/    # Main dashboard features
    │   │   ├── ai-tutor/
    │   │   ├── analytics/
    │   │   ├── bookmarks/
    │   │   ├── career/
    │   │   ├── cgpa/
    │   │   ├── coding/
    │   │   ├── dashboard/
    │   │   ├── exam-hub/
    │   │   ├── flashcards/
    │   │   ├── gamification/
    │   │   ├── lecture-ai/
    │   │   ├── notes/
    │   │   ├── pdf-ai/
    │   │   ├── planner/
    │   │   ├── pomodoro/
    │   │   ├── quiz/
    │   │   ├── revision/
    │   │   ├── settings/
    │   │   ├── social/
    │   │   ├── tasks/
    │   │   ├── voice-tutor/
    │   │   └── whiteboard/
    │   ├── globals.css     # CSS custom variables & glassmorphism
    │   ├── layout.tsx      # Root layout
    │   ├── loading.tsx     # Global skeleton loader screen
    │   ├── not-found.tsx   # Custom 404 page
    │   └── page.tsx        # Dynamic landing page
    ├── components/         # Global widgets
    │   ├── brand-icons.tsx # Custom SVGs (Google, GitHub, X, etc.)
    │   ├── command-palette.tsx
    │   ├── notifications-panel.tsx
    │   └── providers.tsx
    ├── lib/                # Shared utilities & stores
    │   ├── demo-session.ts # Session persistence helpers
    │   ├── mock-session.ts # Mock user credentials
    │   ├── store.ts        # Zustand state stores
    │   └── utils.ts        # Dynamic className merges
    └── types/              # TypeScript interface schemas
```

---

## ⚡ Setup & Run Locally

### Prerequisites
* **Node.js** v18+ 
* **npm** or **yarn**

### 1. Clone & Install
```bash
git clone https://github.com/Rishisharma029/StudypilotAI.git
cd StudypilotAI
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Production Build
Ensure code compiles cleanly with all typechecks:
```bash
npm run build
```

---

## 🔒 Guest Demo Credentials

The login process is simulated locally to bypass server authentication:
* **Demo Account**: `demo@studypilot.ai`
* **Default Username**: `Rishi Sharma`
* **Default Streak**: `12 days`
* **Streak Multiplier**: `Silver Tier Level`
