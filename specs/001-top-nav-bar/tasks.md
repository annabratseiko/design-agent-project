# Tasks: Top Navigation Bar

**Input**: Design documents from `/specs/001-top-nav-bar/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Not requested in spec — no test tasks generated.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create component directory structure and verify foundational dependencies.

- [x] T001 Create component directories: `src/components/TopNav/`, `NavLinks/`, `NavSearch/`, `NavNotificationBell/`, `NavUserMenu/`, `NavSignOutDialog/` per plan.md Project Structure
- [x] T002 Verify `src/theme/theme.ts` exports `lightTheme` and `darkTheme` using `createLightTheme`/`createDarkTheme` with `brandVariants` from design-language.md §6
- [x] T003 [P] Create shared TypeScript types in `src/components/TopNav/types.ts`: `TopNavProps`, `UserProfile`, `SearchSuggestion`, `NavItem`, `NotificationState` from `specs/001-top-nav-bar/contracts/TopNavProps.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: TopNav shell with sticky positioning — required before any sub-component can be integrated.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T004 Implement `TopNav` shell in `src/components/TopNav/TopNav.tsx`: `<header>` landmark, `FluentProvider` consumer (does not own provider), flex row layout, accepts `TopNavProps`, renders placeholder slots for logo, NavLinks, NavSearch, NavNotificationBell, NavUserMenu
- [x] T005 Create `src/components/TopNav/TopNav.styles.ts` using `makeStyles`: `position: "sticky"`, `top: "0"`, `zIndex: 1000`, `display: "flex"`, `alignItems: "center"`, `backgroundColor: tokens.colorNeutralBackground1`, `borderBottom: \`${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}\``, `paddingInline: tokens.spacingHorizontalXXXL`, height ~48px using `tokens.spacingVerticalXXL`
- [x] T006 Create `src/components/TopNav/index.ts` with named export: `export { TopNav } from './TopNav'`
- [x] T007 [P] Add decorative logo `<img>` to `TopNav.tsx`: `aria-hidden="true"`, `alt=""`, `src` from props or static import; no click handler; positioned at flex start

**Checkpoint**: `<TopNav>` renders a sticky header with logo placeholder — no navigation yet.

---

## Phase 3: User Story 1 — Navigate Between Sections (Priority: P1) 🎯 MVP

**Goal**: Four nav links with active-state highlighting, keyboard navigation, and route-driven selection.

**Independent Test**: Render `<NavLinks activeRoute="/projects" onNavigate={fn} />` — confirm "Projects" tab is visually active (`aria-selected="true"`, bottom border visible), clicking "Dashboard" calls `onNavigate("/dashboard")`, arrow keys move between tabs.

- [x] T008 [US1] Implement `NavLinks` in `src/components/NavLinks/NavLinks.tsx`: `<nav aria-label="Main navigation">` wrapping `<TabList>` with four `<Tab>` items (Dashboard `/dashboard`, Projects `/projects`, Reports `/reports`, Settings `/settings`); `selectedValue` driven by `activeRoute` prop; `onTabSelect` calls `onNavigate(href)`; add `aria-current="page"` to the active Tab
- [x] T009 [P] [US1] Create `src/components/NavLinks/NavLinks.styles.ts` using `makeStyles`: active tab bottom border override — `::after` pseudo-element with `height: tokens.strokeWidthThick`, `backgroundColor: tokens.colorBrandForeground1`, `opacity: 0` default, `opacity: 1` when `[aria-selected='true']`; hover state `color: tokens.colorNeutralForeground2`; `@media (prefers-reduced-motion: reduce)` removes transition on `::after`
- [x] T010 [US1] Create `src/components/NavLinks/index.ts` with named export: `export { NavLinks } from './NavLinks'`
- [x] T011 [US1] Integrate `NavLinks` into `src/components/TopNav/TopNav.tsx`: replace NavLinks slot placeholder with `<NavLinks activeRoute={activeRoute} onNavigate={onNavigate} />`

**Checkpoint**: `<TopNav>` with working nav links — active state highlights, keyboard navigates, route changes fire. User Story 1 is fully functional.

---

## Phase 4: User Story 2 — Search for Content (Priority: P2)

**Goal**: Combobox search with inline categorized suggestions; Enter navigates to search results page.

**Independent Test**: Render `<NavSearch onSearchQuery={fn} onSearchNavigate={fn} />` — typing 3 chars calls `onSearchQuery`; returned suggestions appear grouped by category; Enter calls `onSearchNavigate("/search?q=...")` with the typed query; empty Enter does nothing; Escape closes dropdown.

- [x] T012 [US2] Implement `NavSearch` in `src/components/NavSearch/NavSearch.tsx`: `<Combobox aria-label="Search" freeform placeholder="Search" value={searchQuery} onChange={handleChange} onOptionSelect={handleSelect}>` with `<OptionGroup label={category}>` grouping (Projects, Reports, People); `onKeyDown` handler — Enter with non-empty value calls `onSearchNavigate(\`/search?q=${encodeURIComponent(query)}\`)`, Enter with empty value no-ops; Escape closes suggestion list; trigger search on 3+ chars via `onSearchQuery` prop
- [x] T013 [P] [US2] Create `src/components/NavSearch/NavSearch.styles.ts` using `makeStyles`: search box width `240px` at rest, `320px` on focus using `width` transition; `@media (prefers-reduced-motion: reduce)` removes width transition
- [x] T014 [US2] Create `src/components/NavSearch/index.ts` with named export: `export { NavSearch } from './NavSearch'`
- [x] T015 [US2] Integrate `NavSearch` into `src/components/TopNav/TopNav.tsx`: replace NavSearch slot with `<NavSearch onSearchQuery={onSearchQuery} onSearchNavigate={onSearchNavigate} />`

**Checkpoint**: `<TopNav>` with working search — suggestions appear, Enter navigates, keyboard works. User Story 2 is fully functional.

---

## Phase 5: User Story 4 — Access Account Actions (Priority: P2)

**Goal**: Avatar dropdown with Profile, Preferences, Sign out; sign-out guarded by confirmation Dialog.

**Independent Test**: Render `<NavUserMenu user={mockUser} onNavigate={fn} onSignOut={fn} />` — click avatar opens Menu; all three items present with divider before Sign out; clicking Sign out opens Dialog with correct copy; Cancel closes Dialog and returns focus to avatar button; confirming Sign out calls `onSignOut()`.

- [x] T016 [US4] Implement `NavUserMenu` in `src/components/NavUserMenu/NavUserMenu.tsx`: `<Menu>` with `<MenuTrigger>` containing `<Button appearance="subtle" aria-label="Account menu"><Avatar name={user.displayName} image={{ src: user.avatarUrl }} initials={user.initials} /></Button>`; `<MenuPopover><MenuList>`: `<MenuItem onClick={() => onNavigate("/profile")}>Profile</MenuItem>`, `<MenuItem onClick={() => onNavigate("/preferences")}>Preferences</MenuItem>`, `<MenuDivider />`, `<MenuItem onClick={handleSignOutClick}>Sign out</MenuItem>`; Escape closes menu, returns focus to avatar button
- [x] T017 [P] [US4] Create `src/components/NavUserMenu/NavUserMenu.styles.ts` using `makeStyles`: avatar button minimal padding; cursor pointer
- [x] T018 [US4] Implement `NavSignOutDialog` in `src/components/NavSignOutDialog/NavSignOutDialog.tsx`: `<Dialog open={open} onOpenChange={onOpenChange}>` with `<DialogSurface><DialogTitle>Sign out of [App]?</DialogTitle><DialogBody>Any unsaved changes will be lost.</DialogBody><DialogActions><Button appearance="primary" onClick={handleConfirm}>Sign out</Button><Button appearance="secondary" onClick={handleCancel} ref={cancelRef}>Cancel</Button></DialogActions></DialogSurface>`; `aria-labelledby` pointing to dialog title; focus moves to Cancel button on open (`autoFocus` on Cancel or `useEffect` with ref); Escape = Cancel
- [x] T019 [P] [US4] Create `src/components/NavSignOutDialog/NavSignOutDialog.styles.ts` using `makeStyles` (minimal — Dialog uses Fluent defaults)
- [x] T020 [US4] Create `src/components/NavUserMenu/index.ts` and `src/components/NavSignOutDialog/index.ts` with named exports
- [x] T021 [US4] Integrate `NavUserMenu` (containing `NavSignOutDialog`) into `src/components/TopNav/TopNav.tsx`: replace NavUserMenu slot with `<NavUserMenu user={user} onNavigate={onNavigate} onSignOut={onSignOut} />`

**Checkpoint**: `<TopNav>` with working avatar menu and sign-out confirmation. User Story 4 is fully functional.

---

## Phase 6: User Story 3 — View Unread Notification Count (Priority: P3)

**Goal**: Notification bell with CounterBadge that shows count (1–99+), hides at 0, shows skeleton while loading, hides silently on error.

**Independent Test**: Render `<NavNotificationBell notificationCount={3} isNotificationLoading={false} />` — badge shows "3"; render with `count={0}` — badge hidden; render with `isNotificationLoading={true}` — skeleton shimmer, no badge; render with `count={null}` — no badge.

- [x] T022 [US3] Implement `NavNotificationBell` in `src/components/NavNotificationBell/NavNotificationBell.tsx`: `<span role="status" aria-live="polite" aria-label={buildAriaLabel(notificationCount)}>` containing `<Bell20Regular />`; conditionally render `<CounterBadge count={displayCount} overflowCount={99} showZero={false} appearance="filled" />` (hidden when 0 via `showZero={false}`); during `isNotificationLoading`: render `<Skeleton><SkeletonItem shape="circle" size={16} /></Skeleton>` instead of badge; `aria-label` returns `"${count} unread notifications"` or `"No unread notifications"` at 0; bell is NOT in tab order (`tabIndex` not set, no `onClick`)
- [x] T023 [P] [US3] Create `src/components/NavNotificationBell/NavNotificationBell.styles.ts` using `makeStyles`: `position: "relative"` on wrapper; `CounterBadge` absolutely positioned top-right of bell icon; `pointerEvents: "none"` on the entire component (non-interactive)
- [x] T024 [US3] Create `src/components/NavNotificationBell/index.ts` with named export: `export { NavNotificationBell } from './NavNotificationBell'`
- [x] T025 [US3] Integrate `NavNotificationBell` into `src/components/TopNav/TopNav.tsx`: replace NavNotificationBell slot with `<NavNotificationBell notificationCount={notificationCount} isNotificationLoading={isNotificationLoading} />`

**Checkpoint**: All four user stories are independently functional. `<TopNav>` renders with full feature set.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility hardening, reduced-motion compliance, and final export wiring.

- [x] T026 [P] Audit all `makeStyles` files in `src/components/NavLinks/`, `NavSearch/` for `transition` or `animation` declarations — wrap each with `@media (prefers-reduced-motion: reduce) { transition: none; animation: none; }` per constitution Article 2
- [x] T027 [P] Verify `aria-current="page"` is set on the active `Tab` in `NavLinks.tsx` (supplements `aria-selected` with navigation semantics per WCAG SC 4.1.2)
- [x] T028 Verify `NavNotificationBell` `aria-label` updates dynamically when `notificationCount` prop changes — confirm `aria-live="polite"` region wraps the count text node, not the entire bell
- [x] T029 End-to-end accessibility pass: confirm tab order (Dashboard → Projects → Reports → Settings → Search → Avatar), no focus traps outside Dialog, Dialog focus returns to avatar button on close, all 44×44px touch target minimums met
- [x] T030 [P] Update `src/components/TopNav/index.ts` to re-export `TopNavProps`, `UserProfile`, `SearchSuggestion` alongside `TopNav` so consumers can import all public types from a single path
- [x] T031 [US2] Add 300ms debounce to the `onSearchQuery` call in `src/components/NavSearch/NavSearch.tsx`: use `useEffect` with `setTimeout`/`clearTimeout`; only fire `onSearchQuery` after user stops typing for 300ms (measured from last keypress); satisfies SC-003
- [x] T032 [US3] Add `appName` prop (type `string`, default `'this app'`) to `NavSignOutDialog` in `src/components/NavSignOutDialog/NavSignOutDialog.tsx`; replace the `[App]` literal in dialog title with `{appName}`; update `TopNavProps` in `src/components/TopNav/types.ts` to include `appName?: string`; update `specs/001-top-nav-bar/contracts/TopNavProps.ts` to match
- [x] T033 [US3] Document notification fetch timeout: add JSDoc comment in `src/components/NavNotificationBell/NavNotificationBell.tsx` specifying that the parent must resolve `notificationCount` within 5 seconds (SC-004); add `useEffect` with a 5s fallback that sets `hasError` state if `isNotificationLoading` is still `true` after 5000ms, hiding the badge gracefully

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US1/US2/US3/US4 (Phases 3–6)**: All depend on Phase 2; can proceed in priority order or parallel
- **Polish (Phase 7)**: Depends on all user story phases complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — no dependency on other stories
- **US2 (P2)**: Can start after Phase 2 — no dependency on other stories
- **US4 (P2)**: Can start after Phase 2 — no dependency on other stories
- **US3 (P3)**: Can start after Phase 2 — no dependency on other stories

### Within Each Phase

- Tasks marked [P] within the same phase can run concurrently (different files)
- `*.styles.ts` [P] tasks can always run in parallel with their sibling `.tsx` task
- `index.ts` tasks depend on the `.tsx` file being complete
- Integration tasks (T011, T015, T021, T025) depend on the sub-component being complete

---

## Parallel Opportunities

### Phase 3 (US1)
```
Parallel: T008 (NavLinks.tsx) + T009 (NavLinks.styles.ts)
Sequential after: T010 (index.ts) → T011 (integrate into TopNav)
```

### Phase 4 (US2)
```
Parallel: T012 (NavSearch.tsx) + T013 (NavSearch.styles.ts)
Sequential after: T014 (index.ts) → T015 (integrate into TopNav)
```

### Phase 5 (US4)
```
Parallel group A: T016 (NavUserMenu.tsx) + T017 (NavUserMenu.styles.ts)
Parallel group B: T018 (NavSignOutDialog.tsx) + T019 (NavSignOutDialog.styles.ts)
Sequential after both groups: T020 (index files) → T021 (integrate into TopNav)
```

### Phase 6 (US3)
```
Parallel: T022 (NavNotificationBell.tsx) + T023 (NavNotificationBell.styles.ts)
Sequential after: T024 (index.ts) → T025 (integrate into TopNav)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (sticky `<TopNav>` shell with logo)
3. Complete Phase 3: US1 — NavLinks with active state
4. **STOP and VALIDATE**: TabList renders, active route highlights, keyboard nav works
5. Demo: A sticky nav bar with working section navigation

### Incremental Delivery

1. Setup + Foundational → sticky shell renders
2. Add US1 → nav links with active state ✓
3. Add US2 → search with suggestions ✓
4. Add US4 → avatar menu + sign-out dialog ✓
5. Add US3 → notification badge ✓
6. Polish → accessibility hardening ✓

---

## Notes

- `[P]` tasks = target different files, have no blocking dependencies within the phase
- `[Story]` label maps each task to its user story for traceability back to spec.md
- No test tasks generated — not requested in spec.md
- The `[App]` placeholder is addressed by T032 — `appName` prop with default `'this app'`
- Z-index value `1000` in `TopNav.styles.ts` (T005) is the only justified raw value usage — Fluent v9 has no z-index token; document this inline in the styles file
