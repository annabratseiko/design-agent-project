# Conversational Router

> Controls conversation flow, tracks spec coverage, and gates phase transitions.
> The agent MUST follow these rules throughout every designer interaction.

---

## Coverage Matrix

Track coverage across 10 dimensions after every designer message.
- **[R]** = Required — blocks phase transition
- **[S]** = Should — 70% threshold to advance (or explicitly deferred)

### 1. User & Context
- [R] Primary persona (who, role, technical level)
- [R] Usage context (device, environment, frequency)
- [S] Secondary personas
- [S] Current workflow / mental model

### 2. Problem & Goal
- [R] Problem statement
- [R] Success criteria (measurable)
- [S] Anti-goals (what this is NOT)
- [S] Relationship to existing features

### 3. User Flows
- [R] Primary flow (happy path, step by step)
- [R] Entry points
- [R] Exit points
- [S] Alternative flows
- [S] Abort flow (cancel mid-action)
- [S] Error recovery flow

### 4. States & Data
- [R] Default state
- [R] Empty state
- [R] Loading state
- [R] Error state
- [S] Success / confirmation state
- [S] Partial state (incomplete data, mixed status)
- [S] Permission states
- [S] Data boundaries (0, 1, few, many, max, overflow)

### 5. Interactions
- [R] Every interactive element identified
- [R] Destructive actions flagged
- [S] Hover/focus/active/disabled per element
- [S] Selection model (single/multi/range)
- [S] Drag-and-drop + keyboard alternative
- [S] Inline editing behaviors

### 6. Edge Cases
- [R] Network failure per async operation
- [R] Validation failures with exact messages
- [S] Concurrent editing / stale data
- [S] Session timeout during multi-step flow
- [S] Browser back/forward behavior
- [S] Text overflow / truncation
- [S] Maximum data volume

### 7. Accessibility
- [R] Landmark roles per screen region
- [R] Heading hierarchy
- [R] Focus order (tab sequence)
- [R] Keyboard interactions documented
- [S] Screen reader announcements for dynamic content
- [S] Live region strategy (polite vs assertive)
- [S] Focus management after dynamic changes
- [S] Error announcement strategy

### 8. Content & Copy
- [R] Key labels (buttons, headings, navigation)
- [R] Error messages (exact wording)
- [S] Empty state messaging
- [S] Success/confirmation messaging
- [S] Truncation rules

### 9. Responsive Behavior
- [S] Desktop layout (1440px+)
- [S] Tablet layout (768px-1439px)
- [S] Mobile layout (320px-767px)
- [S] What collapses / stacks / hides

### 10. Design Language
- [R] Component mapping references design-language.md
- [S] New component overrides for this feature
- [S] Feature-specific color usage

---

## Phase Gates

### Gate: SPECIFY → PLAN
**Required:** ALL [R] items across all dimensions (20 items).
**Should:** ≥70% of [S] items covered or explicitly deferred (≥12 of 16).

When gate is NOT met, show the designer what's missing:
> "Before we move to planning, we still need to cover:
> 1. [missing item] — I'd suggest [recommendation]
> 2. [missing item] — Here's what I'd propose..."

When gate IS met:
> "Spec coverage: 20/20 required ✓, 14/16 recommended ✓
> Ready to move to component mapping?"

### Gate: PLAN → TASKS
- Every UI element mapped to Fluent v9 component
- Component selection rationale documented
- design-language.md overrides applied
- /speckit.analyze passed (no CRITICAL findings)

### Gate: TASKS → IMPLEMENT
- Tasks ordered by dependency
- Each task tagged with spec section, components, states, a11y
- Designer approved the task list

---

## Probe Selection Rules

1. Ask **1–2 probes per turn** maximum
2. Prioritize [R] items across ALL dimensions first
3. **Always offer a recommendation** — don't just ask open-ended questions
4. Weave probes into natural conversation, don't interrogate
5. If designer gives a short answer, expand: "So when X happens, we do Y. Correct?"

---

## Key Probes (Quick Reference)

**Empty state:** "What does this look like with no data? I'd suggest [CTA + explanation]."
**Loading:** "While this loads, skeleton or spinner? Skeletons preserve layout context."
**Destructive action:** "This delete is irreversible. Confirmation dialog when count > 5?"
**Input type:** "Free text or constrained options? If constrained, how many choices?"
**Focus order:** "For keyboard users, the tab sequence should be: [proposed list]. Right?"
**Dynamic announcement:** "When [content] updates, screen readers announce it. Polite or assertive?"
**Error message:** "The exact error message for [scenario]: what went wrong + what to do about it."
**Overflow:** "When [text] is too long — truncate with ellipsis, wrap, or tooltip?"
**Network failure:** "If the API fails during [action] — inline error, toast, or full error page? Can they retry?"
**Responsive:** "On mobile, does this [element] collapse into a menu, stack vertically, or hide?"

---

## Coverage Reporting

Every 4–5 turns, briefly share status:
> "Good progress. Flows and states are solid. Still need: edge cases
> for network failure, and keyboard navigation for the toolbar."

After completing each major section, confirm:
> "User flows are complete. Anything to add before we move to states?"

---

## Explicit Deferral

When the designer can't decide now:
> "[DEFERRED: Mobile layout — designer to revisit after desktop prototype]"

Deferred [S] items count toward the 70% threshold.
Deferred [R] items do NOT — they must be resolved before advancing.
