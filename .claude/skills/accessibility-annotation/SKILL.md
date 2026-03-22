---
name: accessibility-annotation
description: >
  Systematically annotate screens and components with accessibility information.
  Use when writing the accessibility section of a spec, reviewing a prototype
  for a11y compliance, or when the designer asks about keyboard navigation,
  screen readers, or focus management. Covers WCAG 2.2 AA requirements
  mapped to Fluent UI v9 patterns.
user-invocable: true
---

# Skill: Accessibility Annotation

Follow this procedure to annotate every screen, state, and interactive
element in a spec. Do NOT skip steps — incomplete accessibility
annotations lead to inaccessible prototypes.

---

## Step 1: Map Landmark Regions

Every screen must have landmarks that give screen readers a structural
overview. Walk through the layout and assign roles.

| Role            | HTML Element | Fluent v9 Pattern           | When to Use                |
|-----------------|--------------|-----------------------------|----------------------------|
| `main`          | `<main>`     | Wrap primary content area   | Once per page, always      |
| `navigation`    | `<nav>`      | NavDrawer, TabList, Breadcrumb | Each navigation area    |
| `banner`        | `<header>`   | Page header / app bar       | Once per page              |
| `contentinfo`   | `<footer>`   | Page footer                 | Once per page              |
| `complementary` | `<aside>`    | Sidebar, help panel         | Supporting content         |
| `search`        | `<search>`   | SearchBox wrapper           | Search areas               |
| `region`        | `<section>`  | With aria-label             | Distinct content sections  |
| `form`          | `<form>`     | Form container              | Form areas                 |
| `toolbar`       | (role attr)  | Toolbar component           | Grouped action buttons     |

### Annotation Format
```
LANDMARKS for [Screen Name]:
┌─────────────────────────────────────────────┐
│ <header> banner: "App header"               │
├──────────┬──────────────────────────────────┤
│ <nav>    │ <main> "Feature name"            │
│ "Primary │  ┌─────────────────────────────┐ │
│  nav"    │  │ <section> "Content section" │ │
│          │  │ role="toolbar" "Actions"     │ │
│          │  └─────────────────────────────┘ │
│          │  <section> "Results"             │
├──────────┴──────────────────────────────────┤
│ <footer> contentinfo: "Page footer"         │
└─────────────────────────────────────────────┘
```

### Rules
- Every landmark MUST have an `aria-label` if there are multiple
  of the same type (e.g., two `<nav>` elements need distinct labels)
- `<main>` appears exactly once per page
- Landmarks must not be nested incorrectly (no `<main>` inside `<nav>`)

---

## Step 2: Define Heading Hierarchy

Headings provide the document outline for screen reader users.
They navigate by heading level to find content quickly.

### Rules
- Exactly ONE `<h1>` per page (the page/feature title)
- Levels are sequential: h1 → h2 → h3. NEVER skip (no h1 → h3)
- Every distinct content section needs a heading
- Headings should be descriptive (not "Section 1" but "User Details")

### Annotation Format
```
HEADING HIERARCHY for [Screen Name]:

h1: "User Management"
  h2: "Search and Filter"
  h2: "User List"
    h3: "Bulk Actions" (visible when items selected)
  h2: "Pagination"
```

### Fluent v9 Typography Mapping
| Heading | Fluent v9 Component | Token             |
|---------|--------------------|--------------------|
| h1      | `<Title2>` or `<Title1>` | fontSizeHero700+ |
| h2      | `<Title3>` or `<Subtitle1>` | fontSizeBase500-600 |
| h3      | `<Subtitle2>`      | fontSizeBase400    |
| h4      | `<Body1Strong>`    | fontSizeBase300 semibold |

Important: Fluent v9 typography components (`Title1`, `Subtitle1`, etc.)
do NOT render semantic heading elements by default. You MUST add the
`as="h1"` / `as="h2"` prop:

```tsx
<Title2 as="h1">User Management</Title2>
<Subtitle1 as="h2">Search and Filter</Subtitle1>
```

---

## Step 3: Map Focus Order

Define the exact tab sequence through all interactive elements.
This is the path a keyboard-only user follows.

### Rules
- Focus order MUST match visual reading order (top-to-bottom, left-to-right for LTR)
- Skip links should be first (if applicable)
- Modal/dialog focus is trapped inside the dialog
- After dynamic content appears, focus moves to it
- After dynamic content is removed, focus returns to trigger
- Non-interactive elements are NOT in the tab order
- Disabled elements are NOT in the tab order (use `aria-disabled`
  if you want them visible but inoperable)

### Annotation Format
```
FOCUS ORDER for [Screen Name] — [State]:

 #  Element                    Type        Keyboard Interaction
 1  Skip to main content       Link        Enter → jumps to main
 2  App logo / home link       Link        Enter → navigate home
 3  Search input               Input       Type to search, Esc to clear
 4  Filter dropdown            Dropdown    Enter/Space to open, Arrow to navigate
 5  Select all checkbox        Checkbox    Space to toggle
 6  Table header "Name"        Button      Enter to sort, announces sort direction
 7  Table header "Email"       Button      Enter to sort
 8  Row 1 checkbox             Checkbox    Space to toggle selection
 9  Row 1 "Name" link          Link        Enter to open detail
10  Row 2 checkbox             Checkbox    Space to toggle selection
11  Row 2 "Name" link          Link        Enter to open detail
 ...
20  Bulk action: Delete        Button      Enter to open confirmation dialog
21  Bulk action: Export        Button      Enter to trigger export
22  Pagination: Previous       Button      Enter to go to previous page
23  Pagination: Page 1         Button      Enter to go to page 1
24  Pagination: Next           Button      Enter to go to next page
```

### Keyboard Interaction Patterns (Fluent v9 Built-in)

| Component     | Keyboard Behavior                                        |
|---------------|----------------------------------------------------------|
| Button        | Enter/Space to activate                                  |
| Link          | Enter to activate                                        |
| Checkbox      | Space to toggle                                          |
| Switch        | Space to toggle                                          |
| RadioGroup    | Arrow keys to navigate between options                   |
| TabList       | Arrow keys between tabs, Enter/Space to select           |
| Menu          | Arrow keys to navigate, Enter to select, Esc to close    |
| Combobox      | Arrow keys to navigate, Enter to select, type to filter  |
| Dropdown      | Arrow keys to navigate, Enter to select, Esc to close    |
| Dialog        | Tab cycles through dialog, Esc to close                  |
| Drawer        | Tab cycles through drawer, Esc to close                  |
| Toolbar       | Arrow keys between tools, Enter/Space to activate        |
| DataGrid      | Arrow keys between cells, Enter to activate              |
| Tree          | Arrow keys to navigate, Enter to expand/collapse         |
| Accordion     | Enter/Space to expand/collapse                           |

---

## Step 4: Define Live Regions

When content updates dynamically, screen readers need to know.
Live regions announce changes without moving focus.

### Politeness Levels
| Level       | When to Use                              | Example                    |
|-------------|------------------------------------------|----------------------------|
| `polite`    | Non-urgent updates, can wait             | "3 items selected"         |
| `assertive` | Urgent, interrupt current speech         | "Error: Upload failed"     |
| `role="alert"` | Errors and warnings (assertive)       | Validation error           |
| `role="status"` | Status changes (polite)              | Loading complete, success  |

### Annotation Format
```
LIVE REGIONS for [Screen Name]:

Region                  Trigger                 Level      Announcement
─────────────────────   ──────────────────────  ─────────  ─────────────────
Selection counter       Row selection changes    polite     "3 items selected"
Bulk action bar         Appears on selection     polite     "Bulk actions available"
Delete confirmation     After deletion           assertive  "5 items deleted. Undo available."
Sort announcement       Column sort changes      polite     "Sorted by Name, ascending"
Search results count    Search input changes     polite     "12 results found"
Form validation error   On field blur / submit   assertive  "Email address is required"
Toast notification      After async action       polite     "Export complete. Download ready."
Loading indicator       Data fetch starts        polite     "Loading user list..."
```

### Implementation Pattern
```tsx
// Counter that updates (polite)
<Text aria-live="polite" aria-atomic="true">
  {selectedCount} items selected
</Text>

// Error that appears (assertive via role="alert")
{error && (
  <MessageBar intent="error" role="alert">
    <MessageBarBody>{error}</MessageBarBody>
  </MessageBar>
)}

// Status change (polite via role="status")
{isSuccess && (
  <div role="status" aria-live="polite">
    <MessageBar intent="success">
      <MessageBarBody>Action completed.</MessageBarBody>
    </MessageBar>
  </div>
)}

// Visually hidden but announced
<span
  aria-live="polite"
  style={{
    position: "absolute", width: "1px", height: "1px",
    padding: 0, margin: "-1px", overflow: "hidden",
    clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0,
  }}
>
  {announcement}
</span>
```

---

## Step 5: Document Focus Management

When UI changes dynamically (modal opens, item deleted, content loads),
focus must be managed explicitly.

### Common Focus Management Patterns

| Action                     | Focus Moves To                              |
|----------------------------|---------------------------------------------|
| Modal/Dialog opens         | First focusable element inside dialog       |
| Modal/Dialog closes        | Element that triggered the dialog           |
| Drawer opens               | First focusable element inside drawer       |
| Drawer closes              | Element that triggered the drawer           |
| Item deleted from list     | Next item; if last item, previous item      |
| Inline content added       | First element of new content                |
| Accordion section opens    | Content area of opened section              |
| Tab selected               | Tab panel content (Fluent does this)        |
| Toast appears              | Do NOT move focus (toast is aria-live)      |
| Search results update      | Do NOT move focus (results are aria-live)   |
| Page navigation            | Main content area (skip past nav)           |
| Error appears on submit    | First field with error                      |

### Annotation Format
```
FOCUS MANAGEMENT for [Screen Name]:

Action                          Focus Target              Method
──────────────────────────────  ────────────────────────  ──────────────
"Delete" button clicked         Confirmation Dialog        Fluent Dialog auto-traps
Dialog "Confirm" clicked        Next row in DataGrid       Manual: ref.focus()
Dialog "Cancel" clicked         Original "Delete" button   Fluent Dialog auto-returns
Bulk export completes           Toast (no focus move)      aria-live="polite"
Search input cleared            Search input retains       No change needed
New item added to list          New item row               Manual: ref.focus()
Filter applied                  Results region             Manual: ref.focus()
```

---

## Step 6: Annotate Error Handling

Every error state needs both visual AND programmatic indicators.

### Rules
- Error messages MUST be associated with their inputs via `aria-describedby`
- Error messages MUST be visible (not tooltip-only)
- Color MUST NOT be the sole indicator (add icon + text)
- Field-level errors announced via `aria-live` on blur or submit
- Page-level errors get `role="alert"`

### Implementation via Fluent v9 Field
```tsx
<Field
  label="Email address"
  validationMessage={error}                    // Visible error text
  validationState={error ? "error" : undefined} // Red border + icon
  validationMessageIcon={<ErrorCircleRegular />}
  required
>
  <Input
    type="email"
    aria-invalid={!!error}
    aria-describedby={error ? "email-error" : undefined}
  />
</Field>
```

### Error Message Format
Every error message has two parts:
1. **What went wrong** (clear, non-technical)
2. **What to do about it** (actionable)

```
✗ "Error" — too vague
✗ "Invalid input" — no guidance
✓ "Email address is required. Enter your work email to continue."
✓ "File must be under 10MB. Try compressing the image or choosing a smaller file."
✓ "Unable to save changes. Check your connection and try again."
```

---

## Step 7: Color & Contrast Verification

### Rules (WCAG 2.2 AA)
| Element            | Minimum Contrast | Token Guidance                        |
|--------------------|-----------------|---------------------------------------|
| Normal text (<18px)| 4.5:1           | colorNeutralForeground1 on Background1 |
| Large text (≥18px bold, ≥24px) | 3:1 | Most heading tokens pass              |
| UI components      | 3:1             | Borders, icons, focus indicators      |
| Disabled elements  | No requirement  | But should be visually distinct       |

### Color-Independence Check
For every place color conveys meaning, verify there's a secondary indicator:
- Error: Red + error icon + error text
- Success: Green + checkmark icon + success text
- Warning: Yellow/orange + warning icon + warning text
- Selected: Brand color + checkmark or bold border
- Active/Focus: Brand color + 2px focus ring

---

## Step 8: Responsive Accessibility

### Touch Targets
| Platform   | Minimum | Fluent v9 Default Button Height |
|------------|---------|--------------------------------|
| iOS / Web  | 44×44px | 32px (may need override)       |
| Android    | 48×48px | 32px (may need override)       |

If default Fluent v9 component is smaller than 44×44px, add padding
or use `minHeight`/`minWidth` to meet the target.

### Zoom & Reflow
- Content must reflow at 320px width (WCAG 1.4.10)
- Text must be resizable up to 200% without loss of content
- No horizontal scrolling at 320px viewport

---

## Step 9: Reduced Motion

```tsx
// In makeStyles — disable animations
"@media (prefers-reduced-motion: reduce)": {
  root: {
    animationDuration: "0.01ms !important",
    animationIterationCount: "1 !important",
    transitionDuration: "0.01ms !important",
  },
},

// In code — check preference
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

---

## Complete Annotation Template

Copy this for each screen/state in the spec:

```markdown
### Accessibility: [Screen Name] — [State Name]

**Landmarks:**
- main: "[descriptive label]"
- nav: "[descriptive label]" (if applicable)
- region: "[section label]" (for each distinct section)
- toolbar: "[toolbar label]" (if applicable)

**Headings:**
- h1: "[Page title]"
  - h2: "[Section]"
    - h3: "[Subsection]" (if applicable)

**Focus Order:**
| #  | Element          | Type     | Keyboard               |
|----|------------------|----------|------------------------|
| 1  |                  |          |                        |
| 2  |                  |          |                        |

**Live Regions:**
| Element | Trigger | Level | Announcement |
|---------|---------|-------|--------------|
|         |         |       |              |

**Focus Management:**
| Action | Focus Moves To |
|--------|---------------|
|        |               |

**Errors:**
| Field | Error Message | Association |
|-------|--------------|-------------|
|       |              | aria-describedby |

**Color Independence:**
- [status indicator]: [color] + [icon] + [text]

**Touch Targets:** All interactive elements ≥ 44×44px
**Reduced Motion:** All animations disabled when prefers-reduced-motion
**Contrast:** All text meets 4.5:1 (normal) / 3:1 (large)
```
