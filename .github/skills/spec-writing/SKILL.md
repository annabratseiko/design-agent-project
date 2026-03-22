---
name: spec-writing
description: >
  How to write a complete feature spec through designer conversation.
  Use during the /speckit.specify phase. Covers section-by-section
  guidance, depth standards, probe sequences, and quality checks
  for each spec section.
user-invocable: true
---

# Skill: Write a Feature Spec

Follow this when building a spec through conversation with a designer.
Work section by section. Do not skip ahead.

## Conversation Flow

```
1. Overview (2-3 turns)
   ↓
2. User Flows (3-5 turns)
   ↓
3. States & Data (2-4 turns)
   ↓
4. Edge Cases (2-3 turns, agent proposes most)
   ↓
5. Accessibility (2-3 turns, agent leads)
   ↓
6. Content & Copy (1-2 turns)
   ↓
7. Interactions (1-2 turns)
   ↓
8. Responsive (1-2 turns)
   ↓
9. Coverage check → gate → advance
```

## Section 1: Overview

### What to ask (1-2 questions per turn):
- "What feature are you building? One sentence."
- "Who uses this — what's their role and context?"
- "What problem does this solve? What do they do today without it?"
- "How will we know it works? What's the success metric?"

### Depth standard:
```
SHALLOW (not enough):
  "A file upload for users"

DEEP (sufficient):
  Feature: Bulk file uploader for document management
  Persona: Legal assistants uploading 10-50 contracts daily, desktop
  Problem: Currently email files to admin who uploads manually, 2-day delay
  Success: Self-service upload, <30 seconds per batch, zero admin involvement
```

### Anti-goals probe:
After the overview, always ask:
"What should this feature explicitly NOT do? Knowing boundaries prevents scope creep."

---

## Section 2: User Flows

### What to ask:
- "Walk me through the happy path step by step — what does the user do, what does the system respond?"
- "How does the user get here? What triggers this flow?"
- "What happens after they complete the action?"

### Then probe for alternatives:
- "Is there another way to accomplish this?"
- "What if the user changes their mind mid-flow? Can they cancel? Is data preserved?"

### Depth standard:
```
SHALLOW:
  "User uploads files and sees them in the list."

DEEP:
  Step 1: User clicks "Upload" button in toolbar → file picker opens
  Step 2: User selects 1-50 files (.pdf, .docx, .xlsx only) → selected files shown in staging area
  Step 3: User reviews file list, can remove individual files → remove button per row
  Step 4: User clicks "Upload all" → progress bar shows per-file progress
  Step 5: All files complete → success toast, files appear in document list
  
  Alternative: User drags files onto the drop zone instead of step 1-2
  Abort: User clicks "Cancel" at step 3-4 → confirmation dialog, staged files cleared
  Entry: Toolbar button on Document Management page, or drag onto page at any time
  Exit: Stay on Document Management page, new files highlighted in list
```

---

## Section 3: States & Data

### Walk through each state systematically:
- "What does this look like when there's NO data — first time, empty list?"
- "What appears while data is loading?"
- "What happens when the API fails?"
- "After a successful action, is there a confirmation?"

### Data boundaries probe:
- "What's the realistic range? 0 items? 1? Typical count? Maximum?"
- "What happens when text is too long — a file name that's 200 characters?"

### Depth standard per state:
```
EMPTY STATE:
  Visual: Illustration + "No documents yet" heading + "Upload your first document" subtext + Upload CTA button
  Aria: Region labeled "Empty state", heading level h2

LOADING STATE:
  Visual: Skeleton rows matching table layout (5 rows)
  Aria: role="status", aria-label="Loading documents"
  Duration: Show skeleton immediately, switch to data after load

ERROR STATE:
  Visual: MessageBar intent="error" above table: "Unable to load documents. Check your connection and try again."
  Action: "Retry" button in MessageBar
  Aria: role="alert", announced immediately
  Focus: Stays where it was (MessageBar announced via live region)
```

---

## Section 4: Edge Cases

### The agent PROPOSES most edge cases — don't wait for the designer.

Standard edge cases to cover for EVERY feature:

```
NETWORK:
- "What if the network drops mid-upload? Partial progress lost?"
- "What about timeout — file takes 60+ seconds?"

CONCURRENCY:
- "Can two people upload to the same folder simultaneously?"
- "What if someone deletes a file while another person is viewing it?"

VALIDATION:
- "Wrong file type? Too large? What are the exact limits and error messages?"

NAVIGATION:
- "Browser back button during upload — warning dialog or lose progress?"
- "Session timeout during multi-file upload?"

PERFORMANCE:
- "50 files at once — do we show individual progress or aggregate?"
- "1000 files in the list — pagination or virtualization?"

OVERFLOW:
- "File name is 200 characters — truncate with tooltip?"
- "100 tags on a document — how displayed?"
```

### Probing technique:
Don't just list edge cases — propose a handling recommendation:
"If the network drops during upload, I'd suggest: pause the queue,
show a retry button per failed file, and preserve completed uploads.
Does that work?"

---

## Section 5: Accessibility Annotations

### Use the accessibility-annotation skill here.
For each screen/state discussed in sections 2-4, create the full annotation.

### Key prompts for the designer:
- "For keyboard users, the tab order through this screen should be: [list]. Does that match your layout?"
- "When [dynamic element] updates, should screen readers announce it immediately or wait?"
- "After closing this dialog, focus should return to the button that opened it. Correct?"

The agent should LEAD this section — propose all annotations and ask
the designer to confirm, rather than asking the designer to invent them.

---

## Section 6: Content & Copy

### Get exact text for:
- Button labels: "Upload", "Cancel", "Retry", "Delete"
- Headings: page title, section headers
- Error messages: exact wording for each error scenario
- Empty state: heading + description + CTA label
- Success messages: confirmation text
- Truncation: how to shorten long text

### Depth standard:
```
SHALLOW:
  "Show an error if upload fails"

DEEP:
  Error: File too large
  Message: "'{filename}' exceeds the 25 MB limit. Try compressing the file or splitting it into smaller parts."
  Placement: Inline below the file row in the staging area
  Severity: error
  Dismissible: no (clears when file is removed)
```

---

## Section 7: Interactions

### For each interactive element, confirm:
- Hover state: what changes visually?
- Focus state: visible focus ring (Fluent default usually sufficient)
- Active/pressed: what visual feedback?
- Disabled: when is it disabled? What does it look like?

### For transitions:
- Opening a panel: slide from right? fade in?
- Loading → loaded: skeleton to content swap
- Success notification: toast duration, auto-dismiss?

---

## Section 8: Responsive

### Ask once, get three breakpoints:
"This is designed for desktop. On tablet (768px) and mobile (320px):
- What stacks vertically?
- What collapses into a menu or drawer?
- What gets hidden entirely?
- Do interaction patterns change (e.g., swipe)?"

If designer defers: mark as [DEFERRED] with a note. Design the
desktop version to use flexible layout (flex, grid) so it won't
fight mobile adaptation later.

---

## Quality Check Before Advancing

Before moving from specify → plan, verify:

### Required (all must pass):
- [ ] Persona defined with role and context
- [ ] Problem statement with current workaround
- [ ] Success criteria (measurable)
- [ ] Happy path flow — step by step
- [ ] Entry and exit points
- [ ] Default, empty, loading, error states — all with visual + a11y details
- [ ] All destructive actions flagged
- [ ] Network failure handling per async operation
- [ ] Validation errors with exact messages
- [ ] Landmark roles mapped
- [ ] Heading hierarchy defined
- [ ] Focus order numbered
- [ ] Keyboard interactions documented
- [ ] Key button/heading labels written
- [ ] Error messages with exact wording

### Should (≥70% or explicitly deferred):
- [ ] Anti-goals
- [ ] Alternative flows
- [ ] Abort flow
- [ ] Success/confirmation state
- [ ] Data boundaries
- [ ] Concurrent editing
- [ ] Browser back/forward
- [ ] Overflow/truncation
- [ ] Screen reader announcements for dynamic content
- [ ] Focus management after dynamic changes
- [ ] Responsive at ≥2 breakpoints
