# Feature Spec: [Feature Name]

> **Status:** Draft | In Review | Approved
> **Author:** [Designer Name]
> **Date:** [Date]
> **Spec Kit Feature ID:** [auto-generated]

---

## 1. Overview

| Field            | Value                                |
|------------------|--------------------------------------|
| Feature name     |                                      |
| One-line summary |                                      |
| Primary persona  |                                      |
| Usage context    | Desktop / Tablet / Mobile / All      |
| Success criteria |                                      |

### Problem Statement
_What's broken or missing today? What workaround exists?_

### Anti-Goals
_What this feature is explicitly NOT._

---

## 2. User Flows

### 2.1 Entry Points
_How does the user arrive at this feature?_

### 2.2 Primary Flow (Happy Path)
```
Step 1: [User action] → [System response]
Step 2: [User action] → [System response]
Step 3: [User action] → [System response]
...
```

### 2.3 Alternative Flows
_Different paths to the same goal._

### 2.4 Abort Flow
_User cancels mid-action. What happens to partial data?_

### 2.5 Exit Points
_What happens after completion?_

---

## 3. States & Variations

| State       | Description                           | Visual             |
|-------------|---------------------------------------|---------------------|
| Default     |                                       |                     |
| Empty       | Zero items / first-time use           |                     |
| Loading     | Data being fetched                    |                     |
| Error       | API failure / validation error        |                     |
| Success     | Action completed                      |                     |
| Partial     | Incomplete data / mixed status        |                     |
| Unauthorized| User lacks permission                 |                     |

### Data Boundaries
| Boundary    | Count | Behavior                             |
|-------------|-------|--------------------------------------|
| Zero items  | 0     |                                      |
| One item    | 1     |                                      |
| Typical     | N     |                                      |
| Maximum     | Max   |                                      |
| Overflow    | Text  |                                      |

---

## 4. Edge Cases

| Scenario                      | Handling                             |
|-------------------------------|--------------------------------------|
| Network failure during action |                                      |
| Validation error              |                                      |
| Concurrent edit by other user |                                      |
| Session timeout mid-flow      |                                      |
| Browser back button           |                                      |
| Text overflow                 |                                      |
| Max data volume               |                                      |

---

## 5. Accessibility Annotations

### Screen: [Screen Name] — State: [State]

**Landmarks:**
| Role           | Element              | Label                     |
|----------------|----------------------|---------------------------|
| main           |                      |                           |
| nav            |                      |                           |
| complementary  |                      |                           |

**Heading Hierarchy:**
```
h1: [Page title]
  h2: [Section]
    h3: [Subsection]
```

**Focus Order:**
| #  | Element                | Keyboard Interaction          |
|----|------------------------|-------------------------------|
| 1  |                        | Tab to focus, Enter to activate|
| 2  |                        |                               |
| 3  |                        |                               |

**Live Regions:**
| Element        | Trigger              | aria-live   | Announcement       |
|----------------|----------------------|-------------|---------------------|
|                |                      | polite      |                     |

**Focus Management:**
| Action              | Focus Moves To                       |
|---------------------|--------------------------------------|
| Modal opens         | First focusable element in modal     |
| Modal closes        | Trigger element that opened it       |
| Item deleted        | Next item in list                    |
| Inline content added| New content                          |

---

## 6. Content & Copy

### Key Labels
| Element          | Text                                  |
|------------------|---------------------------------------|
| Page heading     |                                       |
| Primary CTA      |                                       |
| Secondary CTA    |                                       |

### Error Messages
| Scenario         | Message                               |
|------------------|---------------------------------------|
|                  |                                       |

### Empty State
| Element          | Text                                  |
|------------------|---------------------------------------|
| Heading          |                                       |
| Description      |                                       |
| CTA              |                                       |

### Truncation Rules
| Element          | Max Length | Truncation Method             |
|------------------|-----------|-------------------------------|
|                  |           | Ellipsis / Wrap / Tooltip     |

---

## 7. Interactions

### Interactive Elements
| Element          | Hover        | Focus        | Active   | Disabled     |
|------------------|-------------|--------------|----------|--------------|
|                  |             |              |          |              |

### Transitions
| Trigger          | Animation                | Duration | Easing        |
|------------------|--------------------------|----------|---------------|
|                  |                          |          |               |

---

## 8. Responsive Behavior

| Breakpoint       | Layout Changes                        |
|------------------|---------------------------------------|
| Desktop (1440+)  |                                       |
| Tablet (768-1439)|                                       |
| Mobile (320-767) |                                       |

---

## 9. Component Mapping

_Populated during the Plan phase._

| UI Element       | Fluent v9 Component | Why (not alternatives)  | Key Props    |
|------------------|---------------------|-------------------------|--------------|
|                  |                     |                         |              |

---

## 10. Open Questions

| #  | Question                              | Status  | Resolution      |
|----|---------------------------------------|---------|-----------------|
|    |                                       | Open    |                 |

---

## 11. Deferred Items

| Item                    | Reason                | Revisit When          |
|-------------------------|-----------------------|-----------------------|
|                         |                       |                       |
