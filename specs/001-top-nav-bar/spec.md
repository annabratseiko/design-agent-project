# Feature Specification: Top Navigation Bar

**Feature Branch**: `001-top-nav-bar`
**Created**: 2026-03-25
**Status**: Draft
**Input**: User description: "Top navigation bar with logo, main links (Dashboard, Projects, Reports, Settings), a search box, notification bell with badge, and user avatar dropdown. Highlights active page. Desktop only."

---

## Overview

A persistent top navigation bar that provides global wayfinding, search, unread notification awareness, and account management for a desktop web application used by knowledge workers.

**Persona**: Logged-in knowledge worker; uses the app as a primary work tool, multiple times daily.
**Device**: Desktop browser only (mobile out of scope).
**Success criteria**: Users can orient themselves (know where they are), reach any section in one click, and act on notifications without losing context.

---

## User Scenarios & Testing

### User Story 1 — Navigate Between Sections (Priority: P1)

A user working in Projects wants to check their Dashboard summary. They click the "Dashboard" nav link and land on the Dashboard page. The active indicator moves from "Projects" to "Dashboard".

**Why this priority**: Primary function of a nav bar — wayfinding. Without this, the component has no value.

**Independent Test**: Render the nav bar with an active route prop; confirm the correct link is highlighted and clicking a different link triggers the route change.

**Acceptance Scenarios**:

1. **Given** the user is on the Projects page, **When** they click "Dashboard" in the nav, **Then** the app navigates to `/dashboard` and the "Dashboard" link receives the active visual treatment.
2. **Given** the user is on any page, **When** they click any of the four nav links (Dashboard, Projects, Reports, Settings), **Then** the app navigates to the corresponding route.
3. **Given** the user has just logged in, **When** the app loads, **Then** they land on `/dashboard` and the "Dashboard" link is active by default.

---

### User Story 2 — Search for Content (Priority: P2)

A user needs to find a specific project. They click the search box, type a query, and see inline suggestions appear. Pressing Enter navigates to the full search results page.

**Why this priority**: Search is the fastest path to any piece of content; reduces reliance on knowing the nav hierarchy.

**Independent Test**: Render the search box; confirm typing produces suggestions and Enter navigates to `/search?q=[query]`.

**Acceptance Scenarios**:

1. **Given** the user clicks the search box, **When** they type 3+ characters, **Then** a suggestion dropdown appears with categorized results (e.g., Projects, Reports, People).
2. **Given** the user has typed a query, **When** they press Enter, **Then** the app navigates to `/search?q=[query]`.
3. **Given** the search box is focused and empty, **When** the user presses Enter, **Then** nothing happens — no navigation, focus stays in the search box.
4. **Given** the suggestion dropdown is open, **When** the user presses Escape, **Then** the dropdown closes and focus returns to the search input.

---

### User Story 3 — View Unread Notification Count (Priority: P3)

A user glances at the nav bar and sees a badge on the notification bell indicating they have unread items. The badge is informational only — no click action.

**Why this priority**: Awareness feature only; no interaction required. Valuable but non-blocking.

**Independent Test**: Render the nav bar with a notification count prop; confirm badge renders when count > 0 and is hidden when count = 0.

**Acceptance Scenarios**:

1. **Given** the user has 3 unread notifications, **When** the nav bar renders, **Then** the notification bell shows a badge with the count "3".
2. **Given** the user has 0 unread notifications, **When** the nav bar renders, **Then** no badge is shown on the notification bell.
3. **Given** the notification count is loading, **When** the nav bar renders, **Then** the bell shows with no badge (skeleton shimmer on the count area).
4. **Given** the notification count API call fails, **When** the nav bar renders, **Then** the bell shows with no badge (silently degraded — no error shown to the user).
5. **Given** the notification count is > 99, **When** the nav bar renders, **Then** the badge shows "99+" to prevent overflow.

---

### User Story 4 — Access Account Actions (Priority: P2)

A user wants to view their profile or sign out. They click their avatar in the top-right corner; a dropdown menu opens with account options.

**Why this priority**: Sign out and profile access are essential for any authenticated surface.

**Independent Test**: Render the avatar button; confirm clicking it opens the dropdown, all items are present, and Sign Out triggers a confirmation dialog.

**Acceptance Scenarios**:

1. **Given** the user clicks the avatar button, **When** the dropdown opens, **Then** it shows: Profile, Preferences, a visual divider, and Sign out.
2. **Given** the dropdown is open, **When** the user clicks "Sign out", **Then** a confirmation dialog appears: "Sign out of [App]? Any unsaved changes will be lost." with a "Sign out" primary button and "Cancel" secondary button.
3. **Given** the sign-out dialog is open, **When** the user clicks "Cancel", **Then** the dialog closes and focus returns to the avatar button.
4. **Given** the sign-out dialog is open, **When** the user clicks "Sign out", **Then** the user is signed out and redirected to the login page.
5. **Given** the dropdown is open, **When** the user presses Escape, **Then** the dropdown closes and focus returns to the avatar button.

---

### Edge Cases

- **Badge overflow**: Notification count > 99 displays as "99+" to prevent badge from growing beyond its container.
- **Notification API failure**: Bell renders without badge; no visible error state shown to the user.
- **Notification count loading**: Bell renders without badge during the async fetch; skeleton shimmer on count area.
- **Empty search query**: Pressing Enter with empty search box does nothing; focus stays in search input.
- **Very long user name**: Avatar displays initials or profile image — not the user's name — so overflow is not a concern in the nav bar.
- **Sign-out during unsaved work**: Confirmation dialog warns "Any unsaved changes will be lost."
- **Active route not matching any nav link**: None of the four links receive the active style (e.g., on `/notifications` or `/search` pages).

---

## Requirements

### Functional Requirements

- **FR-001**: The nav bar MUST always be visible at the top of every authenticated page.
- **FR-002**: The nav bar MUST display a logo (decorative, no click action, `aria-hidden`).
- **FR-003**: The nav bar MUST display four navigation links: Dashboard, Projects, Reports, Settings.
- **FR-004**: The currently active route's nav link MUST receive a distinct visual treatment (active state) that differs from hover and default states, using a non-color indicator in addition to color.
- **FR-005**: The nav bar MUST include a search box that accepts text input and displays inline suggestions as the user types (minimum 3 characters to trigger suggestions).
- **FR-006**: Pressing Enter in a non-empty search box MUST navigate to `/search?q=[query]`.
- **FR-007**: Pressing Enter in an empty search box MUST do nothing (no navigation, focus remains in input).
- **FR-008**: The nav bar MUST include a notification bell icon with a `CounterBadge` showing the unread notification count.
- **FR-009**: The notification bell `CounterBadge` MUST be hidden when the unread count is 0.
- **FR-010**: When the notification count is > 99, the badge MUST display "99+".
- **FR-011**: The notification bell MUST NOT be interactive (no click handler, not included in keyboard tab order).
- **FR-012**: The notification bell MUST have an accessible label readable by screen readers (e.g., `aria-label="3 unread notifications"`), updated dynamically when the count changes.
- **FR-013**: The nav bar MUST include an avatar button in the top-right corner that opens a dropdown menu on click.
- **FR-014**: The avatar dropdown MUST contain: Profile, Preferences, a visual divider, and Sign out.
- **FR-015**: Clicking "Sign out" in the dropdown MUST open a confirmation dialog before signing the user out.
- **FR-016**: The sign-out confirmation dialog MUST contain: title "Sign out of [App]?", body "Any unsaved changes will be lost.", a primary "Sign out" button, and a secondary "Cancel" button.
- **FR-017**: The nav bar is desktop-only; no responsive or mobile layout is required.
- **FR-018**: The nav bar MUST be fixed/sticky — it remains visible at the top of the viewport as the user scrolls down the page.

### Key Entities

- **NavLink**: A route entry with `label`, `href`, and `isActive` flag.
- **NotificationCount**: An async-fetched integer representing unread notification count; drives the badge display.
- **UserProfile**: Provides `displayName` and `avatarUrl` (or initials fallback) for the avatar button.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users reach any of the four main sections in exactly 1 click from any authenticated page.
- **SC-002**: The active nav link is visually distinguishable from non-active links at all times, without relying on color alone.
- **SC-003**: Search suggestions appear within 300ms of the user's last keypress (debounce interval, 3+ characters entered).
- **SC-004**: The notification count reflects the server-side unread count within 5 seconds of page load.
- **SC-005**: 100% of interactive elements (nav links, search box, avatar button, dropdown items, sign-out dialog buttons) are operable via keyboard alone.
- **SC-006**: The sign-out flow completes in 2 clicks (avatar → Sign out → confirm) with no data loss for confirmed sign-outs.

---

## Accessibility Annotations

### SCREEN: Top Navigation Bar — Default State

**Landmarks**:
- `<header>`: Top navigation bar region
- `<nav aria-label="Main navigation">`: Wraps the four nav links

**Heading Hierarchy**:
- No headings in the nav bar itself. Each page provides its own `h1`.

**Focus Order** (Tab sequence):
1. Dashboard link — Enter navigates to `/dashboard`
2. Projects link — Enter navigates to `/projects`
3. Reports link — Enter navigates to `/reports`
4. Settings link — Enter navigates to `/settings`
5. Search input — typing triggers suggestions; Enter submits; Escape closes suggestions
6. Avatar button — Enter/Space opens dropdown

**Elements excluded from tab order**:
- Logo — `aria-hidden="true"`, no tab stop
- Notification bell — no interaction; accessible via static `aria-label` on wrapper span

**ARIA Labels**:
- Notification bell wrapper: `aria-label="[N] unread notifications"` (dynamic, updated when count changes; `aria-live="polite"`)
- Avatar button: `aria-label="Account menu"`
- Search input: `aria-label="Search"` (or visually hidden `<label>`)

**Live Regions**:
- Notification count area: `aria-live="polite"` — announces count updates
- Search suggestion list: `aria-live="polite"` — announces "N results" when suggestions load

**Color Independence**:
- Active nav link MUST use a non-color indicator (bottom border, bold weight, or underline) in addition to color.
- Badge pairs count number with background color — the number alone conveys the information.

**Touch Targets**:
- All interactive elements must be minimum 44×44px.

---

### SCREEN: Avatar Dropdown — Open State

**Focus Order**:
1. Profile — Enter navigates to profile page
2. Preferences — Enter navigates to preferences page
3. Sign out — Enter opens confirmation dialog

**Keyboard Interactions**:
- `ArrowDown` / `ArrowUp`: move between menu items
- `Enter` / `Space`: activate focused item
- `Escape`: close dropdown, return focus to avatar button
- `Tab`: close dropdown, move to next focusable element in page

**Focus Management**:
- On open: focus moves to first menu item (Profile)
- On close (Escape / click-outside): focus returns to avatar button

---

### SCREEN: Sign-Out Confirmation Dialog

**Landmark**: `role="dialog"` with `aria-labelledby` pointing to dialog title element

**Focus Management**:
- On open: focus moves to "Cancel" button (safe default)
- Focus is trapped within the dialog while open
- On "Cancel" or Escape: dialog closes, focus returns to avatar button
- On "Sign out" confirm: user redirected to login page

**Screen Reader Announcement on open**:
- "Sign out of [App]? Any unsaved changes will be lost. Dialog."

---

## Content & Copy

### Navigation Labels

| Element | Copy |
|---------|------|
| Logo | (decorative — `aria-hidden`, no visible text) |
| Nav link 1 | Dashboard |
| Nav link 2 | Projects |
| Nav link 3 | Reports |
| Nav link 4 | Settings |
| Search placeholder | Search |
| Notification bell (sr-only) | "[N] unread notifications" |
| Avatar button (sr-only) | Account menu |
| Dropdown item 1 | Profile |
| Dropdown item 2 | Preferences |
| Dropdown item 3 | Sign out |

### Sign-Out Dialog Copy

| Element | Copy |
|---------|------|
| Dialog title | Sign out of [App]? |
| Dialog body | Any unsaved changes will be lost. |
| Primary button | Sign out |
| Secondary button | Cancel |

### Notification Badge States

| Count | Display |
|-------|---------|
| 0 | Badge hidden |
| 1–99 | Exact count |
| 100+ | 99+ |
| Loading | No badge (skeleton shimmer on count area) |
| API error | No badge (silent fail) |

---

## Interactions

### Nav Links

| State | Visual Treatment |
|-------|-----------------|
| Default | Neutral foreground, regular weight |
| Hover | Brand foreground, cursor pointer |
| Active (current route) | Brand color + bottom border (non-color indicator) |
| Focus | Fluent default visible focus ring |

### Search Box

| Trigger | Behavior |
|---------|----------|
| Click / Tab | Focus input, cursor visible |
| Type 3+ chars | Suggestion dropdown opens, results grouped by category |
| Type < 3 chars | No suggestions shown |
| Enter (non-empty) | Navigate to `/search?q=[value]` |
| Enter (empty) | No-op |
| Escape | Close suggestions, keep focus in input |
| Click suggestion | Navigate to that result |
| ArrowDown / ArrowUp | Move focus between suggestions |

### Avatar Dropdown

| Trigger | Behavior |
|---------|----------|
| Click / Enter / Space | Dropdown opens, focus moves to first item (Profile) |
| Escape | Dropdown closes, focus returns to avatar button |
| Click outside | Dropdown closes |
| Click "Sign out" | Opens confirmation dialog |

---

## Clarifications

### Session 2026-03-25

- Q: Is the nav bar sticky (fixed at top as user scrolls) or static (scrolls with the page)? → A: Fixed/sticky — stays visible at the top of the viewport at all times.

---

## Assumptions

- Mobile layout (320–767px) is out of scope for this version.
- The application already has an authenticated session system; the nav bar renders only for logged-in users.
- The notification count is fetched from an existing API on page load; no polling or real-time updates are required for v1.
- The app already has routing infrastructure; the nav bar receives the current active route as a prop or reads from router state.
- Logo asset (SVG or image) will be provided separately and referenced in the implementation.
- "[App]" in the sign-out dialog will be replaced with the actual product name at implementation time.
- User avatar image is served from an existing profile API; initials are used as a fallback when the image is unavailable.
