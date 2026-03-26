# UX Requirements Quality Checklist: Top Navigation Bar

**Purpose**: Validate completeness, clarity, consistency, and measurability of UX and accessibility requirements before planning
**Created**: 2026-03-25
**Feature**: [spec.md](../spec.md)

---

## Requirement Completeness

- [ ] CHK001 - Are visual sizing/height requirements specified for the nav bar container, or is it left entirely to implementation discretion? [Gap]
- [ ] CHK002 - Are logo asset requirements defined (dimensions, file format, alt text handling) beyond "decorative / aria-hidden"? [Gap, Spec §FR-002]
- [ ] CHK003 - Are requirements defined for the logo when the image asset fails to load (broken image fallback)? [Gap, Edge Case]
- [ ] CHK004 - Are the search suggestion categories (Projects, Reports, People) formally specified as requirements, or are they illustrative examples? [Clarity, Spec §FR-005]
- [ ] CHK005 - Are requirements defined for what the avatar displays when both image and display name are unavailable? [Gap, Spec §Key Entities]
- [ ] CHK006 - Are requirements defined for notification badge behavior when the count updates mid-session (e.g., a new notification arrives after page load)? [Gap, Spec §FR-008]

## Requirement Clarity

- [ ] CHK007 - Is the active state "bottom border" indicator specified with measurable visual properties (thickness, color token, position)? [Clarity, Spec §FR-004, §Interactions]
- [ ] CHK008 - Is "skeleton shimmer" for the notification badge loading state defined with specific visual scope (what shimmers — the badge only, or the bell + badge)? [Clarity, Spec §FR-009]
- [ ] CHK009 - Is the minimum character threshold (3) for triggering search suggestions formally stated as a requirement rather than an example? [Clarity, Spec §FR-005]
- [ ] CHK010 - Is "[App]" in the sign-out dialog copy formally identified as a placeholder token to be replaced at build time, not literal text? [Clarity, Spec §Content]
- [ ] CHK011 - Is the boundary condition for the "99+" badge defined precisely (>99 or ≥100) to avoid off-by-one ambiguity? [Clarity, Spec §FR-010]
- [ ] CHK012 - Is `aria-label="[N] unread notifications"` specified with the exact format of N (integer, locale-formatted number, or string)? [Clarity, Spec §FR-012]

## Requirement Consistency

- [ ] CHK013 - Does the focus order in the Accessibility Annotations section match the full set of interactive elements listed in FR-003 through FR-016? [Consistency, Spec §A11y, §Requirements]
- [ ] CHK014 - Does the "Account menu" aria-label in the Copy section match the aria-label definition in the Accessibility Annotations? [Consistency, Spec §A11y, §Content]
- [ ] CHK015 - Are hover, focus, and active state requirements consistently defined for ALL four nav links, or described once collectively in a way that could be applied inconsistently? [Consistency, Spec §Interactions]
- [ ] CHK016 - Does the Edge Cases section's description of "active route not matching any nav link" align with FR-004's active state requirement? [Consistency, Spec §FR-004, §Edge Cases]

## Acceptance Criteria Quality

- [ ] CHK017 - Is SC-001 ("reach any section in exactly 1 click") measurable for keyboard-only users, or does "click" implicitly exclude keyboard navigation? [Measurability, Spec §SC-001]
- [ ] CHK018 - Is SC-002 ("without relying on color alone") testable via a specified method (e.g., WCAG 1.4.1 non-text contrast, grayscale visual test)? [Measurability, Spec §SC-002]
- [ ] CHK019 - Is SC-005 ("100% of interactive elements keyboard-operable") verifiable against a canonical list of those elements traceable to the spec? [Measurability, Spec §SC-005]
- [ ] CHK020 - Is SC-003 ("suggestions within 300ms") defined as a hard requirement or a soft performance aspiration — and is 300ms measured from keypress or from pause? [Clarity, Measurability, Spec §SC-003]

## Scenario Coverage

- [ ] CHK021 - Are requirements defined for search box behavior when the suggestions API is unavailable or returns an error? [Coverage, Gap]
- [ ] CHK022 - Are requirements defined for sign-out dialog behavior when the sign-out API call itself fails (network error during the sign-out action)? [Coverage, Gap, Spec §US-4]
- [ ] CHK023 - Are requirements defined for avatar dropdown behavior when the user's profile image URL returns a 404 or load error? [Coverage, Gap]
- [ ] CHK024 - Are requirements defined for the sticky nav bar's stacking behavior relative to modals, drawers, and tooltips (z-index hierarchy)? [Coverage, Gap, Spec §FR-018]

## Accessibility Requirements Coverage

- [ ] CHK025 - Is `aria-current="page"` (or equivalent ARIA attribute) specified for the active nav link to convey active state to screen readers beyond visual styling? [Gap, A11y, Spec §FR-004]
- [ ] CHK026 - Are keyboard interaction requirements for the search suggestion list (arrow key navigation between items, Enter to select) fully specified in the Interactions section? [Completeness, Spec §Interactions]
- [ ] CHK027 - Is the `aria-live` politeness level for notification count updates formally justified — why polite rather than assertive? [Clarity, Spec §A11y]
- [ ] CHK028 - Are color contrast requirements for the active state bottom border specified against the nav bar background color token? [Gap, A11y]

## Dependencies & Assumptions

- [ ] CHK029 - Is the assumption that "an existing notification count API" is available validated with a contract reference (endpoint, response shape, error codes)? [Assumption, Spec §Assumptions]
- [ ] CHK030 - Is the assumption that "routing infrastructure exists and provides active route" specified with the mechanism (prop, context, router hook) to avoid ambiguity at implementation time? [Assumption, Spec §Assumptions]

## Notes

- Mark items `[x]` when the requirement is confirmed as well-written
- Add inline comments for findings: `[x] CHK001 - ✅ Addressed in plan.md §Layout` or `[ ] CHK007 - ⚠️ Needs token name from design-language.md`
- Items marked `[Gap]` indicate missing requirements that should be added to spec.md before planning
- Items marked `[Clarity]` indicate existing requirements that need sharper wording
