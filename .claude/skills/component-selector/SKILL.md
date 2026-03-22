---
name: component-selector
description: >
  Select the correct Fluent UI v9 component for any UI need. Use when
  mapping spec elements to components, when the designer describes a
  UI element, or when choosing between similar components. Implements
  a decision-tree approach inspired by the Fluent UI Storybook Component
  Selector (PR #32865 / #29140). Always explains rationale for selection.
user-invocable: true
---

# Skill: Fluent UI v9 Component Selector

Walk through these decision trees to select the right component.
ALWAYS explain your reasoning to the designer when you make a choice.

Reference: https://react.fluentui.dev (Storybook docs)
Import: `import { ComponentName } from "@fluentui/react-components"`

---

## Master Decision Tree

Start here. Ask yourself: **What is the designer trying to accomplish?**

```
What are you building?
├── User needs to take an action ──────────────► ACTIONS tree
├── User needs to enter data ──────────────────► INPUTS tree
├── User needs to choose from options ─────────► SELECTION tree
├── User needs to navigate somewhere ──────────► NAVIGATION tree
├── System needs to show data ─────────────────► DATA DISPLAY tree
├── System needs to give feedback ─────────────► FEEDBACK tree
├── System needs to show contextual content ───► OVERLAY tree
├── Content needs layout/structure ────────────► LAYOUT tree
└── Content needs text styling ────────────────► TYPOGRAPHY tree
```

---

## ACTIONS — User Needs to Take an Action

```
What kind of action?
│
├── Single action (click to do something)
│   ├── Primary / most important action
│   │   └── Button (appearance="primary")
│   ├── Secondary / less important action
│   │   └── Button (appearance="secondary")  [default]
│   ├── Subtle / minimal visual weight
│   │   └── Button (appearance="subtle")
│   ├── Transparent / no background
│   │   └── Button (appearance="transparent")
│   ├── Action with icon only (no label)
│   │   └── Button (icon={<Icon />} appearance="subtle")
│   │       ├── MUST have aria-label
│   │       └── Consider Tooltip wrapping for discoverability
│   ├── Action with icon + label
│   │   └── Button (icon={<Icon />})
│   └── Action with description below label
│       └── CompoundButton (secondaryContent="description")
│
├── Action that splits into sub-actions
│   ├── Primary action + dropdown of alternatives
│   │   └── SplitButton
│   └── Single trigger revealing menu of actions
│       └── MenuButton → Menu with MenuItems
│
├── Toggle action (on/off state)
│   └── ToggleButton (checked/unchecked)
│
├── Destructive action (delete, remove, revoke)
│   └── Button + confirmation Dialog
│       ├── If count > threshold → Dialog with list of affected items
│       ├── If irreversible → Dialog with explicit confirmation text
│       └── Consider: Undo via Toast (30s window) instead of pre-confirmation
│
├── Group of related actions
│   └── Toolbar (role="toolbar")
│       ├── Arrow keys navigate between tools
│       ├── Use ToolbarButton for each action
│       ├── Use ToolbarDivider to group logically
│       └── Accessibility: aria-label on Toolbar
│
└── Link (navigate to another page/section)
    ├── Inline within text → Link
    ├── Standalone navigation → Link (as standalone)
    └── External link → Link with external icon + aria-label
```

### Questions to Ask the Designer
- "Is this the primary action on the page? → appearance='primary'"
- "Is this action destructive (delete, remove)? → Need confirmation Dialog"
- "Does this action have sub-options? → SplitButton or MenuButton"
- "Are there multiple related actions grouped? → Toolbar"

---

## INPUTS — User Needs to Enter Data

**CRITICAL: ALL inputs MUST be wrapped in `<Field>`** for label, validation, and hint text.

```
What type of data?
│
├── Short text (name, email, URL)
│   └── Field > Input
│       ├── type="text" (default)
│       ├── type="email"
│       ├── type="password"
│       ├── type="url"
│       ├── type="tel"
│       └── type="number" → OR consider SpinButton for numeric
│
├── Long text (description, comment, bio)
│   └── Field > Textarea
│       └── Set resize="vertical" or resize="both"
│
├── Number with increment/decrement
│   └── Field > SpinButton
│       └── Set min, max, step
│
├── Value on a continuous range
│   └── Field > Slider
│       └── Set min, max, step, shows value
│
├── Search / filter
│   └── Field > SearchBox
│       └── Has built-in clear button and search icon
│
├── Date
│   └── Field > DatePicker
│
├── Time
│   └── Field > TimePicker
│
└── File upload
    └── Custom: Button triggering hidden <input type="file">
        └── No Fluent v9 file input component — build custom
```

### Questions to Ask the Designer
- "Is this free text or constrained choices? → Input vs Selection tree"
- "How long will the text be? Short (one line) vs long (multi-line)?"
- "Does it need real-time validation or submit-time?"
- "Is there a character limit? Show counter?"

---

## SELECTION — User Needs to Choose From Options

```
How many options and how to choose?
│
├── Yes/No or On/Off
│   ├── Toggle a setting → Switch (label describes the setting)
│   ├── Agree/consent → Checkbox (label describes what they agree to)
│   └── Include/exclude an item → Checkbox
│
├── One of few options (2–5)
│   ├── Options are mutually exclusive
│   │   └── RadioGroup
│   │       └── Use when all options should be visible at once
│   └── Options as tabs / views
│       └── TabList
│
├── One of several options (5–15)
│   ├── Limited space, options can be hidden
│   │   └── Field > Dropdown
│   │       └── Opens a listbox, user picks one
│   └── Options should stay visible
│       └── RadioGroup (if space allows)
│
├── One of many options (15+)
│   └── Field > Combobox
│       ├── Supports type-to-filter / search
│       ├── Consider virtualization for 100+ options
│       └── Can allow freeform input (freeform prop)
│
├── Multiple selections from a list
│   ├── Few items (2–10)
│   │   └── Group of Checkboxes (within a fieldset)
│   ├── Many items in a list/table
│   │   └── DataGrid with selection column (checkbox per row)
│   └── Tag-style multi-select
│       └── Combobox (multiselect) → selected shown as Tags
│
├── Select from a palette (colors, icons)
│   └── SwatchPicker
│
└── Native HTML select (last resort)
    └── Field > Select
        └── Use only if Dropdown/Combobox won't work
```

### Decision Helper
| # Options | Single Select     | Multi Select        |
|-----------|-------------------|---------------------|
| 2–5       | RadioGroup        | Checkbox group      |
| 5–15      | Dropdown          | Combobox multiselect|
| 15+       | Combobox (search) | Combobox multiselect|
| 100+      | Combobox (virtual)| DataGrid + selection|

### Questions to Ask the Designer
- "How many options? This determines the component."
- "Single select or multi-select?"
- "Do users need to search/filter the options?"
- "Should all options be visible, or hidden in a dropdown?"
- "Can the user enter a value that's NOT in the list? → freeform Combobox"

---

## NAVIGATION — User Needs to Navigate

```
What kind of navigation?
│
├── Primary app navigation (sidebar)
│   └── NavDrawer + NavCategory + NavItem + NavSubItem
│       ├── Hierarchical: NavCategory contains NavItems
│       ├── Flat: NavItems at top level
│       └── Collapsible sidebar: NavDrawer with hamburger
│
├── Section/tab navigation (within a page)
│   └── TabList + Tab
│       ├── Horizontal tabs (default)
│       ├── Vertical tabs (vertical prop)
│       └── Each tab → corresponding panel content
│
├── Breadcrumb trail (show current location)
│   └── Breadcrumb + BreadcrumbItem + BreadcrumbButton
│
├── Pagination (page through results)
│   └── Custom: build with Button group
│       └── No built-in Pagination component — use Buttons
│
├── In-page anchor link
│   └── Link (href="#section-id")
│
└── Step-by-step wizard
    └── Custom: build with TabList (appearance="subtle") or
        custom Stepper component
        └── No built-in Stepper — compose from primitives
```

### Questions to Ask the Designer
- "Is this app-level nav or within-page nav?"
- "Flat (all items equal) or hierarchical (categories > items)?"
- "How many nav items? If >8, consider collapsible groups."
- "Does the sidebar need to collapse on smaller screens?"

---

## DATA DISPLAY — System Shows Data

```
What kind of data?
│
├── Tabular data (rows and columns)
│   ├── Read-only table
│   │   └── Table + TableHeader + TableRow + TableCell
│   ├── Interactive table (sort, select, resize)
│   │   └── DataGrid + DataGridHeader + DataGridRow + DataGridCell
│   │       ├── Built-in: column sorting
│   │       ├── Built-in: row selection (single/multi)
│   │       ├── Built-in: column resizing
│   │       ├── Built-in: keyboard navigation (arrow keys)
│   │       └── a11y: role="grid" auto-applied
│   └── Need virtualization (1000+ rows)
│       └── DataGrid with react-window or custom virtualization
│
├── Hierarchical data (tree structure)
│   └── Tree + TreeItem + TreeItemLayout
│       ├── Expand/collapse branches
│       ├── Selectable items (single/multi)
│       └── Keyboard: Arrow keys navigate, Enter expands
│
├── Key-value pairs / metadata
│   └── Custom layout using Text + tokens
│       └── No dedicated component — compose with typography
│
├── Person / user identity
│   ├── Single person
│   │   ├── Just avatar → Avatar
│   │   ├── Avatar + name + details → Persona
│   │   └── Online status → Avatar + PresenceBadge
│   └── Group of people
│       └── AvatarGroup (shows overlapping avatars + overflow)
│
├── Status indicator
│   ├── Count → CounterBadge
│   ├── Label → Badge
│   ├── Online/offline → PresenceBadge
│   └── Dot indicator → Badge (shape="circular" size="tiny")
│
├── Tag / keyword / category
│   ├── Single tag → Tag
│   ├── List of tags → TagGroup + Tag
│   ├── Dismissible tags → Tag (dismissible)
│   └── Interactive tag picker → TagPicker
│
├── Expandable content sections
│   └── Accordion + AccordionItem + AccordionHeader + AccordionPanel
│
├── Separated content
│   └── Divider
│       ├── Horizontal (default)
│       ├── Vertical
│       └── With label text (inset)
│
└── Card / content container
    └── Card + CardHeader + CardPreview + CardFooter
        ├── Clickable card → Card (onClick)
        ├── Selectable card → Card (selected prop)
        └── a11y: focusable, role="article" or role="listitem"
```

### Questions to Ask the Designer
- "Is this data tabular (rows/columns)? → DataGrid"
- "Does the user need to sort, filter, or select rows?"
- "Is the data hierarchical (parent-child)? → Tree"
- "How many items? 10? 100? 10,000? (affects virtualization)"
- "Does each item have a visual preview? → Card"
- "Are these people/users? → Avatar / Persona"

---

## FEEDBACK — System Gives Feedback

```
What kind of feedback?
│
├── Something is loading
│   ├── Unknown duration → Spinner (size: tiny/small/medium/large)
│   ├── Known duration → ProgressBar (value + max)
│   ├── Content placeholder → Skeleton
│   │   └── Match the layout shape of the content being loaded
│   └── Full page loading → Spinner centered in main
│
├── Inline message (stays visible)
│   └── MessageBar
│       ├── intent="info" (blue) — informational
│       ├── intent="success" (green) — action succeeded
│       ├── intent="warning" (yellow) — caution needed
│       ├── intent="error" (red) — something failed
│       ├── Can include actions (dismiss, retry)
│       └── a11y: role="status" (info/success) or role="alert" (error/warning)
│
├── Transient notification (auto-dismisses)
│   └── Toast via Toaster
│       ├── Appears temporarily, auto-dismisses
│       ├── Can include action ("Undo")
│       ├── Multiple toasts queue
│       └── a11y: aria-live="polite"
│
├── Additional context / label explanation
│   └── InfoLabel
│       └── Label + info icon that opens Popover with explanation
│
├── Empty state
│   └── Custom: compose with Text + Button
│       ├── What this area is for
│       ├── Why it's empty
│       └── CTA to populate it
│
└── Inline validation
    └── Field (validationMessage + validationState)
        └── Shows error/warning/success below the input
```

### Questions to Ask the Designer
- "Is this message persistent (stays) or transient (disappears)?"
  → Persistent = MessageBar, Transient = Toast
- "Does the user need to take action on this message?"
  → Yes = MessageBar with action button or Dialog
- "Is this blocking (must act) or informational (can ignore)?"
  → Blocking = Dialog, Informational = MessageBar/Toast

---

## OVERLAY — Contextual Content on Top of Main Content

```
What triggers the overlay, and how prominent?
│
├── Blocking — user MUST respond before continuing
│   └── Dialog
│       ├── DialogSurface + DialogTitle + DialogBody + DialogActions
│       ├── Focus trapped inside
│       ├── Esc to close, returns focus to trigger
│       ├── Use for: confirmations, destructive actions, required input
│       └── Do NOT use for: information that doesn't require action
│
├── Side panel — supplementary content alongside main
│   └── Drawer
│       ├── position="start" (left) or position="end" (right)
│       ├── Can be overlay or inline
│       ├── Focus trapped when overlay
│       └── Use for: detail views, settings, filters, navigation
│
├── Small contextual info on hover
│   └── Tooltip
│       ├── Appears on hover/focus
│       ├── Text only (no interactive content)
│       ├── Dismisses on mouse leave / blur
│       └── Use for: icon explanations, truncated text, extra context
│
├── Contextual content on click (with interactive elements)
│   └── Popover
│       ├── Appears on click/trigger
│       ├── Can contain interactive elements (buttons, links)
│       ├── Dismissed by clicking outside or Esc
│       └── Use for: settings, filters, mini-forms, rich content
│
└── List of actions triggered by a button
    └── Menu + MenuTrigger + MenuPopover + MenuList + MenuItem
        ├── Opens on click
        ├── Arrow keys navigate items
        ├── Enter/Space selects
        ├── Can have submenus (MenuGroup)
        ├── Can have checkable items (MenuItemCheckbox/Radio)
        └── Use for: context menus, action menus, overflow menus
```

### Key Distinction
| Need               | Use        | NOT          |
|--------------------|------------|--------------|
| Must respond       | Dialog     | Popover      |
| Info on hover      | Tooltip    | Popover      |
| Rich content click | Popover    | Tooltip      |
| List of actions    | Menu       | Popover      |
| Side panel         | Drawer     | Dialog       |

### Questions to Ask the Designer
- "Does the user HAVE to respond, or can they ignore it?"
  → Must respond = Dialog, Can ignore = MessageBar/Toast
- "Is this triggered by hover or click?"
  → Hover = Tooltip, Click = Popover or Menu
- "Does the overlay contain interactive elements?"
  → Yes = Popover/Menu/Dialog, No = Tooltip

---

## LAYOUT — Content Structure

```
Layout need?
├── Card container → Card
├── Separator → Divider
├── Collapsible sections → Accordion
├── App shell with sidebar → NavDrawer + main content
├── Tab-based content → TabList + panels
└── Grid / flex → Use makeStyles with tokens
```

---

## TYPOGRAPHY — Text Styling

| Need                    | Component      | HTML Output     |
|-------------------------|----------------|-----------------|
| Page title              | Title1 as="h1" | `<h1>`          |
| Section heading         | Title3 as="h2" | `<h2>`          |
| Subsection heading      | Subtitle1 as="h3" | `<h3>`       |
| Body paragraph          | Body1          | `<p>`           |
| Body emphasis           | Body1Strong    | `<strong>`      |
| Caption / metadata      | Caption1       | `<span>`        |
| Small caption           | Caption2       | `<span>`        |
| Large display text      | Display        | `<span>`        |
| Code / monospace        | Text font="monospace" | `<code>` |

**CRITICAL:** Typography components don't render semantic headings by default.
Always add `as="h1"`, `as="h2"`, etc. for headings.

---

## Complete Component Reference (Alphabetical)

| Component         | Category    | Import From                  |
|-------------------|-------------|------------------------------|
| Accordion         | Layout      | @fluentui/react-components   |
| Avatar            | Data Display| @fluentui/react-components   |
| AvatarGroup       | Data Display| @fluentui/react-components   |
| Badge             | Data Display| @fluentui/react-components   |
| Breadcrumb        | Navigation  | @fluentui/react-components   |
| Button            | Actions     | @fluentui/react-components   |
| Card              | Layout      | @fluentui/react-components   |
| Checkbox          | Selection   | @fluentui/react-components   |
| Combobox          | Selection   | @fluentui/react-components   |
| CompoundButton    | Actions     | @fluentui/react-components   |
| CounterBadge      | Data Display| @fluentui/react-components   |
| DataGrid          | Data Display| @fluentui/react-components   |
| DatePicker        | Inputs      | @fluentui/react-datepicker-compat |
| Dialog            | Overlay     | @fluentui/react-components   |
| Divider           | Layout      | @fluentui/react-components   |
| Drawer            | Overlay     | @fluentui/react-components   |
| Dropdown          | Selection   | @fluentui/react-components   |
| Field             | Inputs      | @fluentui/react-components   |
| FluentProvider    | Core        | @fluentui/react-components   |
| Image             | Data Display| @fluentui/react-components   |
| InfoLabel         | Feedback    | @fluentui/react-components   |
| Input             | Inputs      | @fluentui/react-components   |
| Label             | Typography  | @fluentui/react-components   |
| Link              | Actions     | @fluentui/react-components   |
| Menu              | Overlay     | @fluentui/react-components   |
| MenuButton        | Actions     | @fluentui/react-components   |
| MessageBar        | Feedback    | @fluentui/react-components   |
| NavDrawer         | Navigation  | @fluentui/react-nav-preview  |
| Persona           | Data Display| @fluentui/react-components   |
| Popover           | Overlay     | @fluentui/react-components   |
| PresenceBadge     | Data Display| @fluentui/react-components   |
| ProgressBar       | Feedback    | @fluentui/react-components   |
| RadioGroup        | Selection   | @fluentui/react-components   |
| SearchBox         | Inputs      | @fluentui/react-search       |
| Select            | Selection   | @fluentui/react-components   |
| Skeleton          | Feedback    | @fluentui/react-components   |
| Slider            | Inputs      | @fluentui/react-components   |
| SpinButton        | Inputs      | @fluentui/react-components   |
| SplitButton       | Actions     | @fluentui/react-components   |
| SwatchPicker      | Selection   | @fluentui/react-components   |
| Switch            | Selection   | @fluentui/react-components   |
| TabList           | Navigation  | @fluentui/react-components   |
| Table             | Data Display| @fluentui/react-components   |
| Tag               | Data Display| @fluentui/react-components   |
| TagGroup          | Data Display| @fluentui/react-components   |
| TagPicker         | Selection   | @fluentui/react-tag-picker   |
| Textarea          | Inputs      | @fluentui/react-components   |
| TimePicker        | Inputs      | @fluentui/react-timepicker-compat |
| Toast / Toaster   | Feedback    | @fluentui/react-components   |
| ToggleButton      | Actions     | @fluentui/react-components   |
| Toolbar           | Actions     | @fluentui/react-components   |
| Tooltip           | Overlay     | @fluentui/react-components   |
| Tree              | Data Display| @fluentui/react-components   |

---

## Anti-Patterns (NEVER do these)

| Need                          | WRONG                      | RIGHT                     |
|-------------------------------|----------------------------|---------------------------|
| Form input                    | Bare `<input>`             | `<Field><Input /></Field>`|
| Table                         | Custom `<table>` markup    | `DataGrid`                |
| Dropdown                      | Custom `<select>`          | `Dropdown` or `Combobox`  |
| Modal                         | Custom overlay div         | `Dialog`                  |
| Tooltip                       | Custom hover div           | `Tooltip`                 |
| Notification                  | Custom fixed div           | `Toast` via `Toaster`     |
| Icon button without label     | `<Button icon={...} />`    | `<Tooltip><Button icon={...} aria-label="..." /></Tooltip>` |
| Navigation                    | Custom sidebar div         | `NavDrawer`               |
| Loading                       | Custom spinner CSS         | `Spinner` or `Skeleton`   |