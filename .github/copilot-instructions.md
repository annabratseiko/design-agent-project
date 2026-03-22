# Copilot Instructions

## Project Type
Design specification workspace using Spec Kit (spec-driven development).

## Tech Stack
- React 18+ with TypeScript (strict mode)
- @fluentui/react-components (Fluent UI v9) — ONLY component library
- @fluentui/react-icons — icon library
- makeStyles + design tokens for all styling

## Coding Conventions
- Named exports only (no default exports)
- Functional components with hooks
- All styles via makeStyles() referencing tokens
- No inline styles, no raw CSS, no CSS modules, no styled-components
- All form inputs wrapped in <Field>
- All colors, spacing, typography via Fluent design tokens
- Semantic HTML landmarks (<main>, <nav>, <section>, etc.)
- Every component handles: default, loading, error, empty, success states

## Accessibility Requirements (Non-Negotiable)
- WCAG 2.2 AA compliance
- Sequential heading hierarchy (h1→h2→h3, no skips)
- Keyboard operable — all interactive elements
- Visible focus indicators
- aria-live regions for dynamic content
- prefers-reduced-motion respected
- Touch targets minimum 44×44px

## Theme
Use the custom theme from design-language.md (Section 8).
Never use webLightTheme or webDarkTheme directly.

## File Naming
- Components: PascalCase (`BulkActionBar.tsx`)
- Styles: PascalCase + `.styles.ts` (`BulkActionBar.styles.ts`)
- Tests: PascalCase + `.test.tsx` (`BulkActionBar.test.tsx`)
- Hooks: camelCase with `use` prefix (`useBulkSelection.ts`)

## Important Files
- `.specify/memory/constitution.md` — Full project rules
- `.specify/memory/design-language.md` — Design tokens & overrides
- `.specify/memory/router.md` — Conversational router for spec building
