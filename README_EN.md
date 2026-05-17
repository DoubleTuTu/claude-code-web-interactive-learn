# Claude-Code-Web-Interactive-Learn

<p align="center">
  <img src="public/og-image.svg" alt="ClaudeCode Learn" width="400">
</p>

<p align="center">
  <strong>An interactive learning platform for Claude Code via simulated terminal in the browser</strong>
</p>

<p align="center">
  <a href="https://github.com/DoubleTuTu/claude-code-web-interactive-learn/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/DoubleTuTu/claude-code-web-interactive-learn/ci.yml?branch=main&label=build&style=flat-square" alt="Build Status">
  </a>
  <a href="https://github.com/DoubleTuTu/claude-code-web-interactive-learn/releases">
    <img src="https://img.shields.io/github/v/release/DoubleTuTu/claude-code-web-interactive-learn?style=flat-square&color=blue" alt="Version">
  </a>
  <a href="https://github.com/DoubleTuTu/claude-code-web-interactive-learn/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/DoubleTuTu/claude-code-web-interactive-learn?style=flat-square&color=yellow" alt="License">
  </a>
  <a href="https://github.com/DoubleTuTu/claude-code-web-interactive-learn/stargazers">
    <img src="https://img.shields.io/github/stars/DoubleTuTu/claude-code-web-interactive-learn?style=flat-square&color=orange" alt="Stars">
  </a>
  <a href="https://github.com/DoubleTuTu/claude-code-web-interactive-learn/network/members">
    <img src="https://img.shields.io/github/forks/DoubleTuTu/claude-code-web-interactive-learn?style=flat-square&color=green" alt="Forks">
  </a>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#features">Features</a> •
  <a href="#course-content">Course Content</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <a href="README.md">中文文档</a>
</p>

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Course Content](#course-content)
- [Learning Path](#learning-path)
- [Templates & Configuration](#templates--configuration)
- [Example Projects](#example-projects)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Introduction

**Claude-Code-Web-Interactive-Learn** is an interactive learning platform that lets you learn Claude Code through simulated hands-on practice in the browser. No installation required — just open and start learning.

> 💡 **Who is this for?** Developers who want to learn Claude Code, engineers building AI Agents, and tech enthusiasts interested in AI coding assistants.

### Why This Platform?

- ✅ **Zero Setup** - Open your browser and start learning
- ✅ **Learn by Doing** - Real terminal simulation, not videos
- ✅ **Instant Feedback** - Every step tells you if you got it right
- ✅ **Bite-sized** - 5 minutes per lesson, learn anytime
- ✅ **Completely Free** - Open source under MIT license

---

## Features

### Core

| Feature |描述|
|---------|-------------|
| 🖥️ **Authentic Terminal** | xterm.js-based simulator with blinking green cursor, faithful to the real thing |
| ✅ **Instant Feedback** | Know immediately if you completed each step correctly; answers shown after 3 attempts |
| 💾 **Auto-save Progress** | Close the browser and pick up where you left off |
| 📱 **Responsive** | Works on desktop and mobile |
| 🌙 **Dark Theme** | Developer-friendly dark UI |
| 🎯 **Step-by-step Guidance** | Each lesson broken into small, manageable steps |

### Pedagogy

| Feature |描述|
|---------|-------------|
| 🎓 **Progressive Learning** | From beginner to advanced, step by step |
| 🧠 **Mental Models** | Build conceptual understanding before hands-on practice |
| 🔧 **Hands-on** | Every concept comes with a terminal exercise |
| 📊 **Quizzes** | Interactive quizzes to test your knowledge |
| 🎨 **Animations** | Complex concepts visualized with animations |

---

## Screenshots

<img width="2022" height="1163" alt="截屏2026-05-17 10 35 06" src="https://github.com/user-attachments/assets/3c476742-36c7-431f-bcc6-b25ae4652803" />


<img width="2013" height="1148" alt="截屏2026-05-17 10 35 20" src="https://github.com/user-attachments/assets/bb9ef78d-bbae-4c27-a415-f2113527c76f" />


<img width="2037" height="1160" alt="Screenshot 3" src="https://github.com/user-attachments/assets/6d41962a-0c35-4c78-92e0-0870662e84e1" />

---

## Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **pnpm** 8.0 or higher (recommended) or npm/yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/DoubleTuTu/claude-code-web-interactive-learn.git
cd claude-code-web-interactive-learn

# 2. Install dependencies
pnpm install

# 3. Start the dev server
pnpm dev
```

### Access

Open your browser and visit https://claude-code-web-interactive-learn.vercel.app

### Other Commands

```bash
# Run tests
pnpm test

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Production build
pnpm build

# Preview production build
pnpm start
```

---

## Tech Stack

<p align="center">
  <a href="https://nextjs.org">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  </a>
  <a href="https://www.typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  </a>
  <a href="https://tailwindcss.com">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  </a>
  <a href="https://xtermjs.org">
    <img src="https://img.shields.io/badge/xterm.js-000000?style=for-the-badge&logo=terminal&logoColor=white" alt="xterm.js">
  </a>
  <a href="https://www.framer.com/motion">
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
  </a>
</p>

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.x | React framework, App Router |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Styling system |
| **xterm.js** | 6.x | Terminal emulation |
| **Framer Motion** | 12.x | Animations |
| **Vitest** | 4.x | Unit testing |
| **Playwright** | 1.x | E2E testing |
| **pnpm** | 9.x | Package manager |

---

## Project Structure

```
claude-code-web-interactive-learn/
├── .github/                    # GitHub config
│   └── workflows/              # CI/CD workflows
├── docs/                       # Documentation
│   └── screenshots/            # Screenshots & GIFs
├── examples/                   # Example projects
│   ├── agent-loop/             # Agent Loop example
│   ├── claude-md-config/       # CLAUDE.md config example
│   └── mcp-config/             # MCP config example
├── public/                     # Static assets
│   ├── templates/              # Template files
│   └── og-image.svg            # Open Graph image
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── lessons/[id]/       # Lesson pages
│   ├── components/             # React components
│   │   ├── Terminal.tsx        # xterm.js terminal component
│   │   ├── StepEngine.tsx      # Step engine
│   │   ├── LessonLayout.tsx    # Lesson layout
│   │   ├── MarkdownRenderer.tsx # Markdown renderer
│   │   └── animations/         # Animation components
│   ├── data/                   # Course data
│   │   └── courses.json        # Course configuration
│   ├── lib/                    # Utilities
│   │   ├── course-loader.ts    # Course loader
│   │   ├── progress.ts         # Progress management
│   │   └── constants.ts        # Constants
│   └── types/                  # TypeScript types
│       └── lesson.ts           # Lesson type definitions
├── e2e/                        # E2E tests
├── next.config.ts              # Next.js config
├── tsconfig.json               # TypeScript config
├── vitest.config.mts           # Vitest config
├── playwright.config.ts        # Playwright config
└── package.json                # Project config
```

---

## Course Content

Currently includes **20 lessons** across three learning levels:

### 📚 Beginner (Level 1)

| Lesson | Topic | Difficulty | Duration |
|--------|-------|------------|----------|
| l1-1 | What is Claude Code | ⭐ | 5 min |
| l1-2 | Installing Claude Code | ⭐ | 5 min |
| l2-1 | First Conversation | ⭐ | 5 min |
| s01 | Agent Loop | ⭐ | 10 min |
| s02 | Tool Use | ⭐ | 10 min |
| s03 | TodoWrite | ⭐ | 10 min |
| s04 | Subagents | ⭐ | 10 min |
| s05 | Skill Loading | ⭐ | 10 min |
| s06 | Context Compaction | ⭐ | 10 min |

### 🚀 Intermediate (Level 2)

| Lesson | Topic | Difficulty | Duration |
|--------|-------|------------|----------|
| l3-1 | TDD Workflow | ⭐⭐ | 15 min |
| s07 | Task System | ⭐⭐ | 15 min |
| s08 | Background Tasks | ⭐⭐ | 15 min |
| s09 | Agent Teams | ⭐⭐ | 15 min |
| s10 | Team Protocols | ⭐⭐ | 15 min |
| s11 | Autonomous Agents | ⭐⭐ | 15 min |
| s12 | Worktree Isolation | ⭐⭐ | 15 min |

### 🎓 Advanced (Level 3)

| Lesson | Topic | Difficulty | Duration |
|--------|-------|------------|----------|
| s13 | CLAUDE.md Configuration | ⭐⭐⭐ | 20 min |
| s14 | Hooks & Event Automation | ⭐⭐⭐ | 20 min |
| s15 | MCP Integration | ⭐⭐⭐ | 20 min |
| s16 | Permission System | ⭐⭐⭐ | 20 min |

---

## Learning Path

```
┌─────────────────────────────────────────────────────────────┐
│                      Learning Path                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Beginner (Level 1)                                         │
│  ├── Agent Loop — The Core Cycle                            │
│  ├── Tool System                                            │
│  ├── Subagents                                              │
│  └── Context Management                                     │
│       ↓                                                     │
│  Intermediate (Level 2)                                     │
│  ├── TDD Workflow                                           │
│  ├── Task System                                            │
│  ├── Team Collaboration                                     │
│  └── Autonomous Agents                                      │
│       ↓                                                     │
│  Advanced (Level 3)                                         │
│  ├── CLAUDE.md Configuration                                │
│  ├── Hooks Automation                                       │
│  ├── MCP Integration                                        │
│  └── Security & Permissions                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Templates & Configuration

The project provides practical template files in `public/templates/`:

| Template | Description | Location |
|----------|-------------|----------|
| **CLAUDE.md** | Project configuration template | `public/templates/CLAUDE.md` |
| **settings.json** | Permissions, Hooks & MCP config example | `public/templates/settings.json` |
| **commands.md** | Common commands reference | `public/templates/commands.md` |

### Usage

```bash
# Copy CLAUDE.md to your project
cp public/templates/CLAUDE.md /path/to/your/project/

# Copy settings.json to your project
cp public/templates/settings.json /path/to/your/project/.claude/
```

---

## Example Projects

Three example projects are included in the `examples/` directory:

### 1. Agent Loop Example

```bash
cd examples/agent-loop
pip install -r requirements.txt
python agent_loop.py
```

**Purpose**: Demonstrates Claude Code's core mechanism — the Agent Loop.

### 2. CLAUDE.md Configuration Example

```bash
cd examples/claude-md-config
cat nextjs-project/CLAUDE.md
```

**Purpose**: Shows how to configure CLAUDE.md for different projects.

### 3. MCP Configuration Example

```bash
cd examples/mcp-config
cat settings.json
```

**Purpose**: Shows how to configure MCP servers.

---

## Contributing

Contributions are welcome! Please follow these steps:

### 1. Fork the Repository

```bash
# Click the Fork button in the top right corner
```

### 2. Clone Locally

```bash
git clone https://github.com/DoubleTuTu/claude-code-web-interactive-learn.git
cd claude-code-web-interactive-learn
```

### 3. Create a Feature Branch

```bash
git checkout -b feature/AmazingFeature
```

### 4. Commit Your Changes

```bash
git commit -m 'Add some AmazingFeature'
```

### 5. Push to the Branch

```bash
git push origin feature/AmazingFeature
```

### 6. Create a Pull Request

```bash
# Click the "New Pull Request" button on GitHub
```

### Contribution Guidelines

- 📖 **Add Lessons**: Add new lessons in `src/data/courses.json`
- 🐛 **Fix Bugs**: Submit an Issue and fix it
- 📝 **Improve Docs**: Update README or add comments
- 🎨 **Polish UI**: Improve styles or animations

See `src/types/lesson.ts` and [CONTRIBUTING.md](CONTRIBUTING.md) for detailed formats.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

### Special Thanks

The course content (s01-s12) is primarily based on and pays tribute to the following open-source projects:

- [learn-claude-code](https://github.com/JackSSK/learn-claude-code) - **Primary reference project**. The structure and content of lessons s01-s12 are directly derived from its 12 teaching sessions, covering Agent Loop, Tool Use, TodoWrite, Subagents, Skill Loading, Context Compaction, Task System, Background Tasks, Agent Teams, Team Protocols, Autonomous Agents, and Worktree Isolation.

Additional thanks to these projects for valuable reference material:

- [claude-howto](https://github.com/clarenceshieh/claude-howto) - Progressive Claude Code learning guide; important reference for advanced topics like Hooks and MCP
- [claude-code-from-scratch](https://github.com/anthropics/claude-code-from-scratch) - In-depth tutorial on rebuilding Claude Code's architecture; provided architectural perspective for the Permission System chapter
- [claude-code-ultimate-guide](https://github.com/anthropics/claude-code-ultimate-guide) - Comprehensive Claude Code reference guide covering 25 workflows and 271 quiz questions

### Technical Acknowledgments

- [Claude Code](https://docs.anthropic.com/claude-code) - Anthropic's official CLI AI assistant
- [Next.js](https://nextjs.org) - React framework
- [xterm.js](https://xtermjs.org) - Terminal emulator
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Framer Motion](https://www.framer.com/motion) - Animation library

---

## Support

If you find this project helpful, please consider:

⭐ **Give it a Star** — Click the Star button in the top right corner

🐛 **Report Bugs** — Submit an Issue

💡 **Suggest Features** — Submit a Feature Request

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/DoubleTuTu">DoubleTuTu</a>
</p>
