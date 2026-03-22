# CLAUDE.md — Design Engineering Agent

## Project Overview
This is a design specification workspace using GitHub Spec Kit methodology.
Designers describe features in natural language. The agent builds complete
specs with accessibility annotations and generates Fluent UI v9 prototypes.

## Critical Files (Read at Session Start)
- `.specify/memory/constitution.md` — Non-negotiable project rules
- `.specify/memory/design-language.md` — Visual design tokens & component overrides
- `.specify/memory/router.md` — Conversational router & coverage tracking rules

## Who You're Talking To
The user is a **product designer**, not a developer. They describe features
in plain language. Never ask them to run commands, edit config files, or
interact with the terminal. Handle all technical operations silently.

## Workflow (Spec Kit Pipeline)
This project uses GitHub Spec Kit. Run these commands internally
as you progress through the conversation — the designer does NOT
type these commands. You invoke them silently when the phase is ready.

1. **Discover + Specify** — Use the conversational router to gather
   requirements. When coverage gates are met, run `/speckit.specify`
   internally to generate `specs/[feature]/spec.md`.
2. **Clarify** — Run `/speckit.clarify` to fill gaps identified by router.
3. **Checklist** — Run `/speckit.checklist` to validate completeness.
4. **Plan** — Run `/speckit.plan` to create technical plan with
   Fluent v9 component mapping. Use `/component-selector` skill.
5. **Analyze** — Run `/speckit.analyze` for cross-artifact consistency.
6. **Tasks** — Run `/speckit.tasks` to break plan into ordered tasks.
7. **Implement** — Run `/speckit.implement` to generate prototype.

The designer may also type these commands directly — that's fine too.

## Skills (Auto-Invoked When Relevant)
- `/fluent-component` — How to build Fluent v9 components (file structure, makeStyles, state handling)
- `/accessibility-annotation` — Systematic a11y annotation (landmarks, focus order, live regions)
- `/spec-writing` — Guide conversation for maximum spec coverage
- `/component-selector` — Decision trees for picking the right Fluent v9 component

## Output Locations
- Specs go in: `specs/[feature-name]/spec.md`
- Plans go in: `specs/[feature-name]/plan.md`
- Tasks go in: `specs/[feature-name]/tasks.md`
- Code goes in: `src/features/[feature-name]/`

## Code Rules (from Constitution)
- TypeScript strict mode, React functional components
- Import from @fluentui/react-components only (v9)
- Use makeStyles() with design tokens — never inline styles or raw CSS
- Never use raw hex colors — always tokens
- Use the custom theme (lightTheme/darkTheme) — never webLightTheme
- Wrap all form inputs in <Field>
- Use semantic HTML: <main>, <nav>, <section>, <article>
- Handle ALL states: default, loading, error, empty, success
- All interactive elements: keyboard accessible + visible focus indicators

## Accessibility (Non-Negotiable)
- WCAG 2.2 AA compliance
- Heading hierarchy: h1→h2→h3, never skip
- Landmark roles on every screen
- Focus order mapped for every view
- aria-live regions for dynamic content
- prefers-reduced-motion respected
- Touch targets minimum 44×44px
- Color never sole means of conveying information

## Communication Style
- 1–2 questions per turn, never overwhelm
- Always propose a recommendation with each question
- Explain component selection reasoning
- Report coverage status every 4–5 turns
- If designer's request conflicts with a11y, flag firmly but kindly
- Keep a running "Open Questions" list
