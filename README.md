# Design Agent Project

A spec-driven design-to-prototype workspace powered by AI. Designers describe
features in natural language; the agent builds complete specs with accessibility
annotations and generates Fluent UI v9 prototypes.

## Quick Start

### For Designers (Zero Setup Required)

1. Open this workspace in **VS Code**
2. Open the chat panel:
   - **Copilot:** `Ctrl+Alt+I` → select "design-agent" from the dropdown
   - **Claude Code:** Click the ✱ spark icon in the top-right
3. Type: _"I want to design a new [feature] for..."_
4. The agent handles everything from there

### For Engineers (One-Time Setup)

```bash
# Clone the repo
git clone <repo-url>
cd design-agent-project

# Run the setup script (initializes Spec Kit for both Copilot + Claude Code)
chmod +x setup.sh
./setup.sh
```

## Project Structure

```
.github/
  agents/
    design-agent.agent.md    ← Copilot custom agent definition
  copilot-instructions.md    ← Copilot coding conventions
  skills/                    ← Skill definitions (mirrored in .claude/skills/)

.claude/
  skills/                    ← Skill definitions for Claude Code

.specify/
  memory/
    constitution.md          ← Non-negotiable project rules
    design-language.md       ← Project-specific overrides (brand, layout, theme)
    router.md                ← Conversational router & coverage tracking
  templates/
    spec-template.md         ← Template for feature specs

specs/                       ← Feature specs (one folder per feature)
  [feature-name]/
    spec.md
    plan.md
    tasks.md

src/                         ← Generated prototype code
  components/                ← Reusable UI components
  features/                  ← Feature-specific compositions
  hooks/                     ← Custom React hooks
  types/                     ← Shared TypeScript types
  utils/                     ← Pure utility functions
  theme/                     ← Theme configuration (lightTheme / darkTheme)

CLAUDE.md                    ← Claude Code agent context
```

## Workflow

```
Designer describes feature
        │
        ▼
Phase 1: SPECIFY ─── Agent asks focused questions, probes for
        │             edge cases, accessibility, states
        │             Coverage tracked across 10 dimensions
        │             Gate: 100% required items covered
        ▼
Phase 2: PLAN ────── Agent maps UI elements to Fluent v9 components
        │             Fetches component docs from llms.txt
        │             Checks design-language.md for overrides
        │             Documents rationale for each choice
        ▼
Phase 3: TASKS ───── Agent breaks plan into ordered tasks
        │             Tags with spec sections, components, a11y
        ▼
Phase 4: IMPLEMENT ─ Agent generates React/TypeScript prototype
                      Using custom theme from design-language.md
                      All states handled, accessibility built in
```

## Updating the Design Language

### Through Conversation (Recommended)

Tell the agent: _"I want to update our design language — our brand
color is now #1A73E8 and we're using Inter as our font."_

The agent will update `design-language.md` and regenerate the theme.

### Manually

Edit `.specify/memory/design-language.md` directly. Only add overrides
that differ from Fluent v9 defaults — the agent fetches default token
values from the [Fluent UI v9 docs](https://storybooks.fluentui.dev/react/llms.txt).

## Supported AI Agents

| Agent                    | Config File                        |
|--------------------------|------------------------------------|
| GitHub Copilot (VS Code) | `.github/agents/design-agent.agent.md` + `.github/copilot-instructions.md` |
| Claude Code (VS Code)   | `CLAUDE.md`                        |
| Both simultaneously      | All files above (no conflicts)     |

## Design System Source

- **Fluent v9 Docs (LLM-readable):** [storybooks.fluentui.dev/react/llms.txt](https://storybooks.fluentui.dev/react/llms.txt)
- **Figma Kit:** [Microsoft Fluent 2 Web](https://www.figma.com/community/file/836828295772957889)
- **Code Library:** [@fluentui/react-components](https://www.npmjs.com/package/@fluentui/react-components)
- **Docs:** [react.fluentui.dev](https://react.fluentui.dev)
- **Theme Designer:** [Fluent Theme Designer plugin](https://www.figma.com/community/plugin/1552432883348157011)

## Development

```bash
npm run dev          # Start dev server
npm run build        # Type-check + production build
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # ESLint
npm run format       # Prettier
```
