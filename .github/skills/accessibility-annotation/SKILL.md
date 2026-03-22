---
name: accessibility-annotation
description: >
  How to create accessibility annotations for design specs.
  Use when documenting any screen, component, or flow. Covers landmarks,
  headings, focus order, ARIA, live regions, keyboard interactions,
  screen reader scripts, and focus management.
user-invocable: true
---

# Skill: Accessibility Annotation

Follow this for EVERY screen and state. Do not skip sections.

## Step 1: Map Landmarks

Every region on screen maps to an ARIA landmark:

| Role            | Element      | When                        | Max |
|-----------------|--------------|-----------------------------|-----|
| main            | `<main>`     | Primary content             | 1   |
| navigation      | `<nav>`      | Nav menus, breadcrumbs      | N   |
| complementary   | `<aside>`    | Sidebar, related            | N   |
| banner          | `<header>`   | Site header (in body)       | 1   |
| contentinfo     | `<footer>`   | Site footer (in body)       | 1   |
| search          | `<search>`   | Search UI                   | N   |
| region          | `<section>`  | Named section (needs label) | N   |

Rules: Every pixel belongs to a landmark. One `<main>` per page.
Multiple `<nav>` need unique aria-labels.

## Step 2: Heading Hierarchy

- Exactly ONE h1 per page
- NEVER skip levels (h1→h2→h3, not h1→h3)
- Read just headings top-to-bottom — should form a table of contents

```
h1: User Management
  h2: Filters
  h2: User Table
    h3: Selected Users (3)
  h2: Bulk Actions
```

## Step 3: Focus Order

Number every interactive element in visual reading order:

```
 #  Element                  Keyboard Interaction
 1  Skip to main content     Enter → jump to main
 2  Search box               Type, Escape to clear
 3  Filter dropdown          Enter → open, Arrows → options, Escape → close
 4  Select all checkbox      Space → toggle
 5  Row 1 checkbox           Space → toggle
 6  Row 1 name link          Enter → navigate
 ...
```

Rules: Focus order matches visual order. Note focus traps (modals).

## Step 4: Keyboard Interactions

Standard Fluent v9 patterns:

| Pattern   | Keys                                           |
|-----------|------------------------------------------------|
| Button    | Enter/Space → activate                         |
| Link      | Enter → navigate                               |
| Checkbox  | Space → toggle                                 |
| Dropdown  | Enter/Space open, Arrows navigate, Escape close|
| Menu      | Enter/Space open, Arrows navigate, Escape close|
| Tabs      | Arrow Left/Right switch tabs                   |
| Toolbar   | Arrows between items, Tab exits toolbar         |
| Dialog    | Tab cycles within, Escape closes                |
| DataGrid  | Arrows navigate cells, Space selects row        |

Document any CUSTOM keyboard interactions added by the feature.

## Step 5: Live Regions

Decision tree:
- Content changes dynamically? No → skip
- User attention needed immediately? Yes → assertive / No → polite

| Element           | Trigger            | aria-live | Announcement              |
|-------------------|--------------------|-----------|---------------------------|
| Selection counter | Row toggled        | polite    | "3 items selected"        |
| Error banner      | API failure        | assertive | "Error: Could not load."  |
| Toast             | Action done        | polite    | "Export started."         |

Rules: Live region DOM must exist BEFORE content changes.
Don't over-announce — too many regions overwhelm.

## Step 6: Focus Management

| Action                | Focus Moves To                    |
|-----------------------|-----------------------------------|
| Modal opens           | First focusable inside modal      |
| Modal closes          | Trigger element                   |
| Item deleted          | Next item (or previous if last)   |
| Inline edit activated | Input field                       |
| Error on form submit  | First invalid field               |
| Tab switched          | First element in tab panel        |

## Step 7: Error Strategy

For each error, document:
```
ERROR: [Scenario]
  Visual: [What user sees]
  Announcement: [Screen reader text]
  Mechanism: [aria-describedby / role="alert" / aria-live]
  Focus: [Where focus moves]
  Recovery: [How user fixes it]
```

## Step 8: Color Independence

For every element using color for meaning:

| Element        | Color Meaning  | Non-Color Alternative      |
|----------------|---------------|----------------------------|
| Error field    | Red border     | + error icon + error text  |
| Success status | Green badge    | + checkmark + "Done" text  |
| Selected row   | Blue bg        | + checkbox checked state   |

## Annotation Template (copy per screen)

```markdown
### Screen: [Name] — State: [State]

**Landmarks:**
- banner: [description]
- nav "[label]": [description]
- main "[label]": [description]

**Headings:**
- h1: [text]
  - h2: [text]

**Focus Order:**
| # | Element | Keyboard |
|---|---------|----------|

**Live Regions:**
| Element | Trigger | aria-live | Announcement |
|---------|---------|-----------|--------------|

**Focus Management:**
| Action | Focus Target |
|--------|-------------|

**Errors:**
| Scenario | Visual | Announcement | Mechanism | Recovery |
|----------|--------|-------------|-----------|----------|

**Color Independence:**
| Element | Color | Alternative |
|---------|-------|-------------|
```
