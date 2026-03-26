---
description: Reverse-sync visual and behavioral code changes back into spec documents (spec.md, plan.md), design-language.md, and detect cross-feature impact.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Goal

After `speckit.implement` (or any manual code edits), detect visual and behavioral changes in the implemented code that are NOT yet reflected in the spec documents, update those documents to match the current implementation, sync design-language overrides, flag cross-feature impact, and verify spec coverage. This enforces **Article 5 (Spec Sync)** of the constitution.

## Operating Principles

- The **spec is the source of truth for design intent** — but when code has intentionally diverged, the spec must be updated to match.
- This command assumes code changes are intentional. It does NOT revert code to match specs.
- Changes are applied to spec.md, plan.md (if component mapping changed), and design-language.md (if new overrides were introduced).
- tasks.md is NOT modified.
- Always show the designer what will change before writing. Get confirmation.

## Execution Steps

### 1. Initialize Context

Run `.specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks` from repo root and parse FEATURE_DIR and AVAILABLE_DOCS. All paths must be absolute.

Derive paths:
- SPEC = FEATURE_DIR/spec.md
- PLAN = FEATURE_DIR/plan.md
- TASKS = FEATURE_DIR/tasks.md
- FEATURE_NAME = directory name of FEATURE_DIR
- FEATURE_SRC = src/features/[FEATURE_NAME]/ (derive from FEATURE_DIR name)
- COMPONENTS_SRC = src/components/ (shared components)
- DESIGN_LANG = .specify/memory/design-language.md
- ALL_SPECS_DIR = specs/ (for cross-feature impact detection)

If SPEC does not exist, abort: "No spec found. Run `/speckit.specify` first."

### 2. Load Current Artifacts

Read the following files:
- **spec.md** — Full content (this is what we'll update)
- **plan.md** — Component mapping section (may need updates)
- **design-language.md** — Current token overrides and component overrides
- **All .tsx and .styles.ts files** in FEATURE_SRC and COMPONENTS_SRC that were created or modified since implementation

### 3. Detect Code-to-Spec Drift

Compare the implementation against the spec across these dimensions:

#### A. Component Inventory
- List every Fluent UI v9 component imported in the feature's .tsx files
- Compare against the component mapping in plan.md and the component references in spec.md
- Flag: new components not in spec, removed components still in spec, swapped components

#### B. Visual Styling
- Extract all `makeStyles()` definitions from .styles.ts files
- Identify: layout changes (flexbox direction, grid), spacing token changes, color token changes, typography token changes, border/shadow changes
- Compare against spec.md's "States & Variations", "Responsive Behavior", and "Interactions" sections
- Flag: styling that contradicts spec descriptions

#### C. States & Interactions
- Scan component code for conditional rendering (loading, error, empty, success, disabled states)
- Compare against spec.md's "States & Variations" section
- Flag: new states added in code but missing from spec, states in spec but not implemented

#### D. Accessibility
- Scan for: aria-* attributes, role attributes, landmark elements, heading levels, focus management code, live regions
- Compare against spec.md's "Accessibility Annotations" section
- Flag: a11y patterns in code not documented in spec, spec annotations not matching implementation

#### E. Content & Copy
- Extract visible strings: labels, error messages, empty state text, button text, headings
- Compare against spec.md's "Content & Copy" section
- Flag: copy changes not reflected in spec

#### F. Responsive Behavior
- Scan for media queries or responsive patterns in makeStyles
- Compare against spec.md's "Responsive Behavior" section
- Flag: breakpoint changes not documented

### 4. Detect Design Language Drift

Compare the implementation against `design-language.md`:

#### G. Token Override Detection
- Scan all `.styles.ts` files for token values that differ from Fluent defaults
- Check if those overrides are already documented in design-language.md Section 2
- Flag: new token overrides in code not recorded in design-language.md

#### H. Component Override Detection
- Scan all `.styles.ts` files for `makeStyles` rules that override Fluent component defaults (e.g., custom Button height, custom Card border radius)
- Check if those overrides are documented in design-language.md Section 4
- Flag: component-level overrides in code not recorded in design-language.md

#### I. Layout Spacing Detection
- Scan for page-level layout patterns (page margins, section gaps, card padding)
- Compare against design-language.md Section 3
- Flag: layout spacing that differs from documented rules

**Important**: Only flag overrides that represent **project-wide decisions** (not one-off feature-specific styling). Use this heuristic:
- If the same override appears in 2+ components → project-wide, update design-language.md
- If it appears in only 1 component and is clearly feature-specific → note in spec.md only
- If unclear, ask the designer: "Is this [override] a project-wide decision or specific to this feature?"

### 5. Reverse Spec Coverage Check

Verify that the code implements everything the spec promises:

#### J. Unimplemented Spec Items
- For each state listed in spec.md "States & Variations" (default, empty, loading, error, success, etc.), verify the code has a corresponding conditional rendering path
- For each user flow step in spec.md "User Flows", verify the code has corresponding UI and logic
- For each interaction in spec.md "Interactions", verify the code has event handlers
- For each a11y annotation in spec.md "Accessibility Annotations", verify the code has corresponding ARIA/landmark/focus code

Flag unimplemented items with severity:
- **CRITICAL**: Required state (default, error, loading) missing from code
- **WARNING**: Optional state or edge case in spec but not yet implemented
- **INFO**: Minor annotation detail not yet coded (e.g., specific aria-live wording)

### 6. Cross-Feature Impact Detection

Detect when changes to shared code affect other features:

#### K. Shared Component Analysis
- List all files modified in `src/components/` (shared components)
- For each modified shared component, scan ALL feature directories in `specs/` to find which features reference that component (search spec.md and plan.md for the component name)
- Flag: "Shared component [X] was modified. These other features also use it: [list]. Their specs may need updating."

#### L. Cross-Feature Scan
- For each affected feature identified above:
  - Read its spec.md
  - Check if the shared component change contradicts anything in that spec
  - Report: component name, change made, affected features, potential spec conflicts

**Important**: Do NOT automatically edit other features' specs. Only report the impact. The designer decides whether to update those specs now or defer.

### 7. Generate Drift Report

Present a structured report to the designer:

```
## Spec Sync Report

### Summary
- X code→spec changes detected
- Y design-language updates needed
- Z unimplemented spec items found
- W other features potentially affected

### Section A: Code → Spec Drift

#### Component Changes
| Change | Code (Current) | Spec (Outdated) | Section |
|--------|----------------|-----------------|---------|
| Added  | Tooltip on icon buttons | Not documented | Interactions |

#### Visual Changes
| Change | Token/Property | Old Value | New Value | Section |
|--------|---------------|-----------|-----------|---------|
| Spacing | Card padding | spacingHorizontalL | spacingHorizontalXL | States & Variations |

#### State Changes
| Change | State | Code | Spec | Section |
|--------|-------|------|------|---------|
| Added | Partial load state | Implemented | Missing | States & Variations |

#### Accessibility Changes
| Change | Element | Code | Spec | Section |
|--------|---------|------|------|---------|
| Changed | Heading level | h3 | h2 in spec | Accessibility Annotations |

#### Content Changes
| Change | Element | Code | Spec | Section |
|--------|---------|------|------|---------|
| Changed | Empty state message | "No items yet" | "Nothing here" | Content & Copy |

#### Responsive Changes
| Change | Breakpoint | Code | Spec | Section |
|--------|-----------|------|------|---------|
| Added | 480px collapse | Implemented | Not documented | Responsive Behavior |

### Section B: Design Language Drift

| Type | Override | Value | Location | Status |
|------|----------|-------|----------|--------|
| Token | borderRadiusMedium | 6px | CardList.styles.ts | Not in design-language.md |
| Component | Button minHeight | 36px | ActionBar.styles.ts | Not in design-language.md |

### Section C: Unimplemented Spec Items

| Severity | Spec Section | Item | Status |
|----------|-------------|------|--------|
| CRITICAL | States & Variations | Error state for data fetch | Not in code |
| WARNING | Edge Cases | Session timeout handling | Not in code |

### Section D: Cross-Feature Impact

| Shared Component | Change | Affected Features | Potential Conflict |
|-----------------|--------|-------------------|-------------------|
| NavDrawer | Added collapse animation | settings-panel, user-profile | settings-panel spec says "no animations" |
```

### 8. Propose Updates

For each section of the drift report, propose specific edits:

**Section A edits** → spec.md and plan.md changes
**Section B edits** → design-language.md updates (add new override rows to the appropriate section)
**Section C items** → No file edits; present as implementation TODO list
**Section D items** → No file edits; present as cross-feature review list

Present the proposed edits and ask:
> "I found changes across 4 areas. Here are the proposed updates:
> - **Spec updates**: N edits to spec.md
> - **Design language updates**: M new overrides for design-language.md
> - **Unimplemented items**: P spec items not yet in code (implementation TODOs)
> - **Cross-feature impact**: Q other features may be affected
>
> Should I apply the spec and design-language updates? (The implementation TODOs and cross-feature items are for your review.)"

### 9. Apply Updates

Based on designer response:
- **"Apply all"** → Write edits to spec.md, plan.md, and design-language.md
- **"Review individually"** → Present each edit one at a time
- **"Skip"** → Warn about Article 5 violation

After applying:
- Report which files and sections were updated
- If design-language.md was updated, verify that `src/theme/theme.ts` still matches (flag if theme code needs regeneration)
- If any changes were skipped, list them as "Known drift — designer deferred"

### 10. Validate Post-Sync

After updates are applied:
- Re-read the updated spec.md
- Verify internal consistency (no contradictions introduced)
- Verify heading hierarchy is correct
- Verify accessibility annotations match implementation
- If design-language.md was updated, verify Section 6 (Theme Code) is still consistent with Sections 1–4
- Report final status:
  > "Sync complete:
  > - spec.md: N sections updated
  > - design-language.md: M overrides added
  > - Implementation TODOs: P items flagged
  > - Cross-feature review: Q features to check"

### 11. Update plan.md Component Mapping (if needed)

If component changes were detected (new, removed, or swapped components):
- Update the Fluent v9 component mapping table in plan.md
- Add rationale for any new component selections
- Remove entries for components no longer used

## Edge Cases

- **No drift detected**: Report "Spec, design language, and code are fully in sync. No updates needed."
- **No implementation exists yet**: Abort with "No implementation files found. Run `/speckit.implement` first."
- **Spec has sections missing entirely**: Flag as "Section missing — cannot sync. Consider running `/speckit.clarify` to add the missing section first."
- **Multiple features modified**: If user input specifies a feature name, sync only that feature. Otherwise, detect the current feature branch and sync accordingly.
- **Design language conflict**: If two features introduce conflicting overrides, flag to designer: "Feature A sets borderRadiusMedium to 6px but Feature B sets it to 8px. Which should be the project standard?"
- **No other features exist**: Skip cross-feature impact detection silently.
- **Shared component not referenced by any spec**: Note: "Component [X] was modified but no existing spec references it. If this is a new shared component, it will be picked up when features are specced."

## What This Command Does NOT Do

- Does NOT modify code to match specs (that's the designer's/developer's job)
- Does NOT modify tasks.md (tasks represent the plan, not current state)
- Does NOT create new spec sections — only updates existing ones
- Does NOT run without designer confirmation (Article 5 requires intentional sync)
- Does NOT auto-edit other features' specs — only reports cross-feature impact
