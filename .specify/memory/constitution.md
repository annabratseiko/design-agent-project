# Constitution

> Non-negotiable principles governing all specification, planning, and
> implementation work in this project. Every AI agent operating in this
> workspace MUST follow these rules at all times.

---

## Article 1: Design System

### Source of Truth
- All UI code MUST use **@fluentui/react-components** (v9). Never use
  @fluentui/react (v8), @fluentui/react-northstar, or any other library.
- **Fluent v9 defaults** (component APIs, props, slots, tokens, accessibility
  patterns, motion APIs) come from the canonical LLM-readable docs at
  `https://storybooks.fluentui.dev/react/llms.txt`. When the agent needs
  component details, it MUST fetch the relevant page from this index
  (e.g., `https://storybooks.fluentui.dev/react//llms/components-dialog.txt`).
- **Project-specific overrides** (brand palette, token overrides, layout
  spacing rules, component style overrides, theme code) are defined in
  `.specify/memory/design-language.md`. This file contains ONLY deviations
  from Fluent defaults — it does NOT duplicate Fluent's own token values.
- When a conflict exists between `design-language.md` and Fluent defaults,
  `design-language.md` wins — it represents deliberate project decisions.

### Theme Usage
- Import `lightTheme` / `darkTheme` from the shared theme file generated
  from `design-language.md`. NEVER use `webLightTheme` or `webDarkTheme`
  from Fluent v9 directly — those are the unbranded defaults.
- Wrap the application root in `<FluentProvider theme={lightTheme}>`.
- All colors MUST reference Fluent design tokens (`tokens.colorBrandBackground`,
  `tokens.colorNeutralForeground1`, etc.). Never use raw hex or rgb values.
- All spacing MUST reference Fluent spacing tokens. Never hardcode pixel values.
- All typography MUST reference Fluent type tokens.

### Styling Rules
- Use `makeStyles()` from `@fluentui/react-components` for all custom styling.
- Never use inline styles, CSS modules, styled-components, or raw CSS files.
- Never use `!important`.
- Use design tokens for all values: `tokens.colorBrandBackground`,
  `tokens.spacingVerticalM`, `tokens.fontSizeBase300`, etc.

### Component Overrides
- Before using any Fluent v9 component, first fetch its documentation from
  `llms.txt` to understand default props, slots, and accessibility patterns.
- Then CHECK `design-language.md` for project-specific component overrides.
- If an override exists, ALWAYS apply it via `makeStyles`.
- If no override exists, use Fluent v9 defaults from the fetched docs.

---

## Article 2: Accessibility (Non-Negotiable)

### Standards
- All interfaces MUST meet **WCAG 2.2 Level AA** conformance.
- Accessibility is NEVER deferred. It is designed and implemented
  alongside every feature, not bolted on afterward.

### Color & Contrast
- Minimum contrast ratio: **4.5:1** for normal text, **3:1** for large text
  (18px+ or 14px+ bold).
- Color MUST NEVER be the sole means of conveying information.
  Always pair with text, icons, or patterns.
- All themes MUST be tested for contrast compliance.

### Keyboard
- All interactive elements MUST be operable via keyboard alone.
- Focus order MUST follow a logical, visual reading sequence.
- Visible focus indicators MUST be present on all interactive elements.
- Custom keyboard interactions MUST be documented in the spec.

### Screen Readers
- All images and icons MUST have appropriate `alt` text or `aria-label`.
- Dynamic content updates MUST use `aria-live` regions with appropriate
  politeness levels (`polite` for non-urgent, `assertive` for urgent).
- All form inputs MUST be wrapped in `<Field>` with visible labels.
- Error messages MUST be programmatically associated with their inputs
  via `aria-describedby`.

### Interactive Elements
- Modal dialogs MUST trap focus and return focus on dismiss.
- Touch targets MUST be minimum **44×44px**.
- All animations MUST respect `prefers-reduced-motion`.
- All drag-and-drop interactions MUST have keyboard alternatives.

### Heading Hierarchy
- Heading levels MUST be sequential: h1 → h2 → h3. Never skip levels.
- Each page/view MUST have exactly one h1.

---

## Article 3: Code Standards

### Language & Framework
- Language: **TypeScript** with strict mode enabled.
- Framework: **React** functional components with hooks.
- No class components. No default exports (use named exports).

### File Structure
```
src/
  components/       ← Reusable UI components
    [ComponentName]/
      [ComponentName].tsx
      [ComponentName].styles.ts    ← makeStyles definitions
      [ComponentName].test.tsx
      index.ts                     ← named re-export
  features/         ← Feature-specific compositions
  hooks/            ← Custom React hooks
  theme/            ← Theme configuration
    theme.ts        ← lightTheme / darkTheme exports
    tokens.ts       ← Custom token extensions
  types/            ← Shared TypeScript types
  utils/            ← Pure utility functions
```

### Component Rules
- Every component MUST handle these states: **default, loading, error,
  empty, and success**. If a state is not applicable, document why.
- All interactive elements MUST have visible **hover, focus, active,
  and disabled** states.
- Use semantic HTML: `<main>`, `<nav>`, `<section>`, `<article>`,
  `<header>`, `<footer>` as appropriate.
- Every component MUST have a descriptive `aria-label` or use semantic
  elements that provide accessible names.

### Imports
- Import components from `@fluentui/react-components` (single package).
- Import icons from `@fluentui/react-icons`.
- Import tokens: `import { tokens } from "@fluentui/react-components"`.
- Import makeStyles: `import { makeStyles } from "@fluentui/react-components"`.

---

## Article 4: New Feature vs. Iteration

### Create a new spec when the request:
- Introduces a user flow that does not exist in any current spec
- Names a distinct surface, panel, page, or screen (e.g. "notifications panel", "settings page", "contact list")
- Describes a new persona goal or success criterion
- Would require its own entry point, landmark region, or route

When this is the case: start the spec-writing conversation, run the full
Spec Kit pipeline (`specify → clarify → checklist → plan → tasks → implement`),
and create `specs/[feature-name]/spec.md`.

### Update an existing spec when the request:
- Changes the visual style of a component already covered by a spec
- Adds or modifies a state, edge case, or interaction within an existing flow
- Fixes a bug or adjusts behavior of something already specced
- Refines copy, spacing, or layout within a screen that already exists

When this is the case: implement the change, then update the relevant
section of the existing spec per Article 5 (Spec Sync).

### When in doubt:
Ask: *"Does this introduce a new user goal or a new surface?"*
- Yes → new spec
- No → update existing spec

---

## Article 5: Spec Sync (Non-Negotiable)

Any change to a component's visual design or behavior MUST be reflected in
the corresponding `specs/[feature]/spec.md` before the session ends.

This applies to:
- Visual styling changes (layout, color, spacing, borders, typography)
- Behavioral changes (interactions, states, transitions)
- Component substitutions (e.g. swapping Input for Textarea)
- New states or edge case handling added during implementation

No implementation change is complete without a spec update. The spec is
the source of truth for design intent — code without a matching spec is
undocumented and unmaintainable.

---

## Article 6: Specification Requirements

### Mandatory Sections
Every spec MUST include ALL of the following:
1. **Overview** — Feature name, one-line description, persona, success criteria
2. **User Flows** — Happy path, alternative paths, entry/exit points
3. **States & Variations** — Default, empty, loading, error, success, partial,
   permission variants, data boundaries (0, 1, few, many, max, overflow)
4. **Edge Cases** — Network failure, concurrent editing, browser back/forward,
   session timeout, validation failures, overflow text, max data volume
5. **Accessibility Annotations** — Per screen/state: landmark roles, heading
   hierarchy, focus order, live regions, ARIA labels, keyboard interactions,
   screen reader announcement script, focus management after dynamic changes
6. **Content & Copy** — Key labels, error messages, empty state messaging,
   truncation rules, localization considerations
7. **Interactions** — Per interactive element: hover/focus/active/disabled states,
   transitions, tooltip triggers, drag-and-drop behavior + keyboard alternatives
8. **Responsive Behavior** — Layout changes at desktop (1440px+), tablet
   (768px–1439px), mobile (320px–767px)

### Accessibility Annotation Format
For each screen or state, annotate:
```
SCREEN: [Screen Name]
STATE: [State Name]

Landmarks:
  - main: [description]
  - nav: [description]
  - complementary: [description]

Headings:
  - h1: [text]
  - h2: [text]
  - h3: [text]

Focus Order:
  1. [element] — [keyboard interaction]
  2. [element] — [keyboard interaction]
  ...

Live Regions:
  - [element]: aria-live="polite|assertive" — [what is announced]

Focus Management:
  - On [action]: focus moves to [target]
  - On [dismiss]: focus returns to [trigger]
```

---

## Article 7: Component Selection Rules

### Decision Framework
When selecting Fluent v9 components, follow this priority:
1. **Accessibility built-in** — prefer components with native a11y support
2. **API simplicity** — prefer fewer props over more flexible but complex APIs
3. **llms.txt alignment** — consult the component's doc page for intended usage patterns
4. **design-language.md alignment** — prefer components that match documented overrides

### Selection Guide

| Need | Component | When NOT to use |
|------|-----------|-----------------|
| Tabular data | `DataGrid` | Don't use custom `<table>` markup |
| Form input | `Input` / `Textarea` in `<Field>` | Never bare `<input>` |
| Constrained choice (<5) | `RadioGroup` | |
| Constrained choice (5–15) | `Dropdown` | |
| Constrained choice (15+) | `Combobox` with search | |
| Boolean toggle | `Switch` (state) or `Checkbox` (selection) | |
| Primary action | `Button appearance="primary"` | |
| Destructive action | `Button` + confirmation `Dialog` | |
| Grouped actions | `Toolbar` with `role="toolbar"` | |
| Blocking interaction | `Dialog` | Don't use for informational |
| Inline feedback | `MessageBar` | |
| Transient notification | `Toast` via `Toaster` | |
| Flat navigation | `TabList` | |
| Hierarchical navigation | `NavDrawer` + `NavCategory` + `NavItem` | |
| Sidebar/panel | `Drawer` | |
| Contextual info | `Tooltip` (hover) or `Popover` (click) | |
| Status indicator | `Badge` / `CounterBadge` / `PresenceBadge` | |
| User identity | `Avatar` / `Persona` | |
| Loading indicator | `Spinner` (indeterminate) or `ProgressBar` (determinate) | |
| Content placeholder | `Skeleton` | |
| All form inputs | Wrap in `<Field>` | Never use inputs without Field |

---

## Article 8: Agent Behavior

### Designer Interaction Rules
- The designer using this workspace is NOT a developer.
- NEVER ask the designer to run a command.
- NEVER show raw terminal output unless specifically requested.
- NEVER mention git, branches, or file paths unless asked.
- DO create and edit files silently.
- DO commit to git silently with descriptive messages.
- DO present specs as readable summaries in the chat.
- DO show the prototype as a preview when ready.
- ALWAYS use the conversational router (defined in `router.md`).
- ALWAYS track coverage and report status every 4–5 turns.
- Ask **1–2 focused questions per turn**. Never overwhelm.
- When you make a component choice, **explain the reasoning**.
- If the designer's request conflicts with WCAG AA, flag it firmly but kindly.
- Keep a running **"Open Questions"** list. Surface unresolved items regularly.

### Conversational Router
The agent MUST follow the conversational router defined in
`.specify/memory/router.md`. This includes:
- Maintaining the coverage matrix across 10 dimensions
- Selecting probes from the probe library for uncovered items
- Enforcing gate conditions before phase transitions
- Never transitioning from specify → plan until all Required items
  and ≥70% of Should items are covered or explicitly deferred

### Spec Kit Workflow
Follow the Spec Kit pipeline in order:
1. `/speckit.constitution` — Already defined (this file)
2. `/speckit.specify` — Build spec through designer conversation
3. `/speckit.clarify` — Fill gaps identified by the router
4. `/speckit.checklist` — Validate spec completeness
5. `/speckit.plan` — Technical plan with component mapping
6. `/speckit.analyze` — Cross-artifact consistency check
7. `/speckit.tasks` — Break into implementation tasks
8. `/speckit.implement` — Generate Fluent v9 prototype
