---
name: spec-writing
description: >
  Write comprehensive feature specifications through designer conversation.
  Use when starting a new feature spec, filling in spec gaps, or reviewing
  spec completeness. Covers all sections from overview through accessibility
  annotations, with examples of shallow vs deep coverage and exact
  question prompts for each section.
user-invocable: true
---

# Skill: Write a Feature Specification

Follow this procedure to build a complete spec through conversation.
Use the conversational router (`.specify/memory/router.md`) to track
coverage and gate phase transitions.

---

## Step 1: Open the Conversation

Start by understanding the feature at a high level.
Ask these questions ONE AT A TIME (never dump all at once):

```
Q1: "What feature are you designing? Give me the elevator pitch."
Q2: "Who's the primary user? What's their role and how tech-savvy are they?"
Q3: "Where will they use this — desktop, tablet, mobile, or all?"
Q4: "What problem does this solve? What's the workaround today?"
Q5: "How will we know it's working? What's the measurable outcome?"
```

After these 5 answers, summarize what you've heard and confirm:
> "Here's what I understand: [summary]. Ready to dig into the details?"

---

## Step 2: Map User Flows

Walk through the feature step by step.

### Happy Path
```
"Walk me through the happy path. The user opens [entry point] and..."
```
Document each step as: **User Action → System Response**

### Entry & Exit Points
```
"How does the user get here? Button on another page, nav item, notification, deep link?"
"What happens after they complete the action? Stay here, redirect, confirmation?"
```

### Alternative Flows
```
"Are there other ways to accomplish this? For example, [suggest based on context]."
```

### Abort Flow
```
"What if they change their mind at step 3? Cancel button? Confirmation? Data lost?"
```

### Depth Check
Shallow: "User uploads a file"
Deep: "User clicks 'Upload' button (primary, in toolbar) → file picker opens (native OS) → user selects 1+ files (max 10, max 10MB each, accepts .jpg .png .pdf) → upload progress bar appears per file (ProgressBar, determinate) → on success, file appears in the list with thumbnail → on failure, inline error with retry button"

Always push for deep coverage on flows.

---

## Step 3: Enumerate States

For every screen/component, systematically cover ALL states.

### Prompts for Each State

**Default:** "What does this look like in normal use, with typical data?"

**Empty:** "What about first-time use with no data? I'd suggest a helpful
message with a CTA button — something like 'No [items] yet. [Add your first one].'"

**Loading:** "While data loads, what does the user see? I'd suggest skeleton
screens matching the table layout — they preserve spatial context better than
a spinner. Estimated load time?"

**Error:** "If the API fails, what happens? I need three things:
1. What the user sees (inline error, toast, full error page?)
2. Whether they can retry
3. Whether any data is lost"

**Success:** "After completing the action, how do we confirm?
Toast notification (transient), MessageBar (persistent), or redirect?"

**Partial:** "What if some items succeed and others fail? Mixed state?"

**Permission:** "Are there user roles that see this differently?
What does an unauthorized user see — hidden feature, disabled with tooltip,
or error message?"

### Data Boundaries
```
"Let's talk boundaries:
- Zero items: [empty state behavior]
- One item: [any special case?]
- Typical count: [how many?]
- Maximum: [is there a hard limit? What happens at 10,000?]
- Long text: [what truncates? Ellipsis? Tooltip? Wrap?]"
```

---

## Step 4: Surface Edge Cases

Proactively suggest edge cases the designer hasn't thought of.
Don't wait to be asked — propose them.

### Network & Reliability
```
"For [async operation]: what happens if the network drops mid-request?
I'd suggest an inline error with retry: 'Unable to save. [Retry]'"
```

### Concurrency
```
"Can multiple users edit this at the same time? If user A deletes a row
that user B is viewing, what happens?"
```

### Navigation
```
"If the user hits browser back at step 2 of this flow — go to step 1
with data preserved? Exit the flow? Show a 'discard changes?' warning?"
```

### Performance
```
"If there are 10,000 rows in this table, do we need pagination, infinite
scroll, or virtualization? What about the bulk select-all — does it select
all visible or all 10,000?"
```

### Timing
```
"This action could take 30+ seconds. After 3 seconds I'd switch from
inline spinner to a progress indicator with cancel. Sound right?"
```

---

## Step 5: Write Accessibility Annotations

For EVERY screen and state, annotate using the accessibility-annotation
skill. Don't skip this — invoke `/accessibility-annotation` mentally
and work through each step:

1. Landmark roles
2. Heading hierarchy
3. Focus order (numbered)
4. Live regions
5. Focus management after dynamic changes
6. Error association
7. Color independence check
8. Touch targets
9. Reduced motion

### Key Questions for Designer
```
"When [dynamic element] appears, should screen readers announce it
immediately (assertive) or wait for a pause (polite)?
I'd suggest polite for [reason]."

"After the user deletes an item, where should keyboard focus go?
I'd suggest the next item in the list."

"Are there keyboard shortcuts for power users? If yes, how are they
discoverable — tooltip on hover, Ctrl+/ help panel?"
```

---

## Step 6: Write Content & Copy

Get exact text for every string in the UI.

### Labels
```
"What's the page heading?"
"What does the primary button say? I'd suggest [verb] + [noun]:
'Create project', 'Send invitation', 'Delete selected items'."
"What does the secondary button say? Usually 'Cancel' or 'Back'."
```

### Error Messages (exact wording)
Every error message needs:
1. What went wrong (clear, non-technical)
2. What to do about it (actionable)

```
"For [validation scenario], the error should say:
'[What went wrong]. [What to do about it].'
For example: 'Email address is required. Enter your work email to continue.'"
```

### Empty States (three parts)
```
"The empty state needs:
1. What this area is for: 'Projects'
2. Why it's empty: 'You haven't created any projects yet.'
3. CTA: 'Create project' button
Sound right?"
```

### Truncation Rules
```
"When [element text] is longer than [container], what happens?
- Truncate with ellipsis + tooltip on hover?
- Wrap to next line?
- Expand/collapse?"
```

---

## Step 7: Define Responsive Behavior

```
"We've designed this for desktop. At tablet/mobile widths:
- What stacks vertically?
- What collapses into a menu or drawer?
- What gets hidden entirely?
- Does the interaction model change (swipe instead of hover)?"
```

### Breakpoint Template
| Element              | Desktop (1440+) | Tablet (768-1439) | Mobile (320-767) |
|---------------------|-----------------|-------------------|------------------|
| Sidebar navigation  | Visible          | Collapsed/drawer  | Hidden/hamburger |
| Data table          | Full columns     | Fewer columns     | Card layout      |
| Bulk action bar     | Horizontal       | Horizontal        | Bottom sheet     |
| Form layout         | Side-by-side     | Stacked           | Stacked          |
| Dialog              | Centered modal   | Centered modal    | Full-screen      |

---

## Step 8: Check Coverage & Gate

Before moving to the Plan phase, run the gate check:

### Required Items (ALL must be covered)
```
□ Primary persona defined
□ Usage context established
□ Problem statement clear
□ Success criteria measurable
□ At least one complete user flow
□ Entry and exit points defined
□ Default state described
□ Empty state described
□ Loading state described
□ Error state described
□ All interactive elements identified
□ All destructive actions flagged
□ Network failure handling per async operation
□ Validation errors with exact messages
□ Landmark roles assigned
□ Heading hierarchy defined
□ Focus order mapped
□ Keyboard interactions documented
□ Key labels and error messages written
□ Design-language.md referenced
```

### Should Items (≥70% covered or deferred)
```
□ Secondary personas
□ Anti-goals
□ Alternative flows
□ Abort flow
□ Error recovery flow
□ Success/confirmation state
□ Data boundaries
□ Hover/focus/active/disabled per element
□ Concurrent editing handling
□ Browser back/forward behavior
□ Text overflow / truncation
□ Screen reader announcements
□ Focus management after dynamic changes
□ Empty state copy
□ Responsive behavior
□ New component overrides
```

### Report Status
> "Spec coverage: [X]/20 required, [Y]/16 recommended.
> [Gaps remaining]. Ready to move to planning?"

---

## Depth Quality Guide

For each spec item, judge whether coverage is shallow or deep:

| Section        | Shallow (needs follow-up)          | Deep (sufficient)                 |
|----------------|-----------------------------------|------------------------------------|
| State          | "Show an error"                    | Exact message, placement, retry   |
| Flow step      | "User uploads file"                | File types, size limit, progress  |
| Edge case      | "Handle network failure"           | Error UI, retry, data preservation|
| A11y           | "Make it accessible"               | Landmarks, focus order, aria-live |
| Copy           | "Show a message"                   | Exact wording, tone, CTA          |
| Responsive     | "It's responsive"                  | Per-element behavior per breakpoint|

Always push for deep. If designer gives shallow, follow up:
> "You mentioned 'show an error' — I need to know: What exact message?
> Where does it appear (inline, toast, dialog)? Can the user retry?
> Is any data lost?"
