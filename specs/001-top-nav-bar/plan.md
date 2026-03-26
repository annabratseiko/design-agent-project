# Implementation Plan: Top Navigation Bar

**Branch**: `001-top-nav-bar` | **Date**: 2026-03-25 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-top-nav-bar/spec.md`

## Summary

Implement a sticky, desktop-only top navigation bar for an authenticated web app. The bar contains a decorative logo, four `TabList`-based route links with active-state highlighting, a global search `Combobox` with inline categorized suggestions, a read-only notification bell with `CounterBadge`, and an avatar `Menu` with Profile, Preferences, and Sign-out (guarded by a confirmation `Dialog`). All interactive elements are keyboard accessible and WCAG 2.2 AA compliant.

## Technical Context

**Language/Version**: TypeScript (strict mode), React 18+
**Primary Dependencies**: `@fluentui/react-components` (v9), `@fluentui/react-icons`
**Storage**: N/A — notification count fetched from existing API; user profile from existing session
**Testing**: Jest + React Testing Library
**Target Platform**: Desktop browser (1440px+), Chromium/Firefox/Safari
**Project Type**: React component library (single feature component with sub-components)
**Performance Goals**: Search suggestions render within 300ms of typing pause (3+ chars); notification count populated within 5s of page load
**Constraints**: WCAG 2.2 AA, desktop only, sticky positioning, no raw hex colors, no inline styles, no default Fluent themes
**Scale/Scope**: Single top-level component (`TopNav`) rendered once per authenticated page

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Rule | Status | Notes |
|------|--------|-------|
| Use `@fluentui/react-components` v9 only | ✅ PASS | All components from v9; `@fluentui/react-icons` for icons |
| Import `lightTheme`/`darkTheme` from `src/theme/theme.ts` | ✅ PASS | Never `webLightTheme`/`webDarkTheme` |
| `makeStyles()` for all custom styling | ✅ PASS | No inline styles, no CSS modules |
| All colors via Fluent design tokens | ✅ PASS | `tokens.colorBrandBackground`, `tokens.colorNeutralBackground1`, etc. |
| All spacing via Fluent spacing tokens | ✅ PASS | `tokens.spacingHorizontalL`, etc. |
| All form inputs wrapped in `<Field>` | ✅ PASS | `Combobox` in nav bar is not a form input — `aria-label` provided directly (documented exception) |
| Named exports only (no default exports) | ✅ PASS | All components use named exports |
| TypeScript strict mode | ✅ PASS | Strict null checks, no `any` |
| Semantic HTML landmarks | ✅ PASS | `<header>`, `<nav aria-label="Main navigation">` |
| WCAG 2.2 AA | ✅ PASS | Landmark roles, focus order, keyboard interactions, live regions all specified |
| Handle all states: default, loading, error, empty | ✅ PASS | Notification badge: loading (skeleton), error (silent hide), 0 (hidden), >0 (shown) |

**Violations requiring justification**: None

## Project Structure

### Documentation (this feature)

```text
specs/001-top-nav-bar/
├── plan.md              ← This file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── contracts/
│   └── TopNavProps.ts   ← Phase 1 output (component interface contract)
└── tasks.md             ← Phase 2 output (/speckit.tasks command)
```

### Source Code

```text
src/
  components/
    TopNav/
      TopNav.tsx                    ← Root component (<header> shell + layout)
      TopNav.styles.ts              ← makeStyles: sticky bar, flex layout, z-index
      TopNav.test.tsx
      index.ts
    NavLinks/
      NavLinks.tsx                  ← TabList + Tab for 4 route links
      NavLinks.styles.ts            ← Active state bottom border override
      NavLinks.test.tsx
      index.ts
    NavSearch/
      NavSearch.tsx                 ← Combobox with categorized option groups
      NavSearch.styles.ts           ← Width, suggestion dropdown positioning
      NavSearch.test.tsx
      index.ts
    NavNotificationBell/
      NavNotificationBell.tsx       ← Bell icon + CounterBadge (non-interactive)
      NavNotificationBell.styles.ts ← Badge positioning (overlay on icon)
      NavNotificationBell.test.tsx
      index.ts
    NavUserMenu/
      NavUserMenu.tsx               ← Menu trigger (Avatar button) + MenuList
      NavUserMenu.styles.ts
      NavUserMenu.test.tsx
      index.ts
    NavSignOutDialog/
      NavSignOutDialog.tsx          ← Dialog confirmation for sign-out
      NavSignOutDialog.styles.ts
      NavSignOutDialog.test.tsx
      index.ts
  theme/
    theme.ts                        ← lightTheme / darkTheme (already exists)
```

## Fluent UI v9 Component Mapping

| Spec Element | Component(s) | Package | Rationale |
|---|---|---|---|
| Nav bar shell | `<header>` + `makeStyles` | — | Semantic HTML landmark; sticky via `position: sticky; top: 0` |
| Logo | `<img aria-hidden="true">` | — | Decorative only; no interactive component needed |
| Nav links (4) | `TabList` + `Tab` | `@fluentui/react-components` | Built-in `selectedValue` for active state; arrow-key nav; `aria-selected` auto-applied; add `aria-current="page"` to active tab |
| Search box | `Combobox` | `@fluentui/react-components` | Supports inline suggestion groups; `freeform` prop allows Enter-to-navigate; no `Field` wrapper (nav bar context, not form) |
| Notification bell | `<span>` + `Bell20Regular` + `CounterBadge` | `@fluentui/react-icons`, `@fluentui/react-components` | Non-interactive display; `CounterBadge` auto-hides at `count={0}`; wrapper carries dynamic `aria-label` |
| Notification skeleton | `Skeleton` + `SkeletonItem` | `@fluentui/react-components` | Loading state for badge count area |
| Avatar button | `Button appearance="subtle"` containing `Avatar` | `@fluentui/react-components` | Opens Menu on click; `aria-label="Account menu"` |
| Avatar dropdown | `Menu` + `MenuTrigger` + `MenuPopover` + `MenuList` | `@fluentui/react-components` | List of actions; arrow-key nav; Escape to close |
| Dropdown items | `MenuItem` × 3 + `MenuDivider` | `@fluentui/react-components` | Standard menu items; `MenuDivider` before Sign out |
| Sign-out dialog | `Dialog` + `DialogSurface` + `DialogTitle` + `DialogBody` + `DialogActions` | `@fluentui/react-components` | Blocking confirmation; focus trap; `aria-labelledby` dialog title |
| Sign out button | `Button appearance="primary"` | `@fluentui/react-components` | Primary destructive confirm |
| Cancel button | `Button appearance="secondary"` | `@fluentui/react-components` | Dismiss dialog safely |

## Design Token Usage

| Property | Token | Value |
|---|---|---|
| Nav bar background | `tokens.colorNeutralBackground1` | White/near-white in light theme |
| Nav bar bottom border | `tokens.colorNeutralStroke1` | Subtle separator from page content |
| Nav bar height | `tokens.spacingVerticalXXL` × 2 (≈48px) | Consistent with Fluent app shell patterns |
| Nav bar horizontal padding | `tokens.spacingHorizontalXXXL` | 32px — matches page margin (per design-language.md §3) |
| Active tab indicator | `tokens.colorBrandForeground1` (color) + `tokens.strokeWidthThick` (border) | Brand color + non-color indicator |
| Inactive tab hover | `tokens.colorNeutralForeground2` | Subtle foreground on hover |
| Badge background | `tokens.colorBrandBackground` | Brand red/blue; standard for counter badges |
| Z-index (sticky bar) | Custom: `zIndex: 1000` | Above page content; below `Dialog` (Fluent Dialog uses 1000+) |

## Active State Implementation Detail

The `TabList` active state uses Fluent's built-in `selectedValue`. We override the `Tab` indicator via `makeStyles` to add the bottom border (non-color indicator required by WCAG 1.4.1):

```typescript
// NavLinks.styles.ts (pseudocode — actual tokens in implementation)
tab: {
  "::after": {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: tokens.strokeWidthThick,
    backgroundColor: tokens.colorBrandForeground1,
    opacity: 0,
  },
  ":is([aria-selected='true'])::after": {
    opacity: 1,
  },
},
```

## Component Props Interface (Preview)

```typescript
// Full contracts in contracts/TopNavProps.ts
export interface TopNavProps {
  activeRoute: "/dashboard" | "/projects" | "/reports" | "/settings";
  notificationCount: number | null;  // null = loading, undefined = error (treated as 0)
  isNotificationLoading: boolean;
  user: UserProfile;
  onSearch: (query: string) => SearchSuggestion[];
  onNavigate: (href: string) => void;
  onSignOut: () => Promise<void>;
}

export interface UserProfile {
  displayName: string;
  avatarUrl?: string;
  initials: string;
}

export interface SearchSuggestion {
  id: string;
  label: string;
  category: "Projects" | "Reports" | "People";
  href: string;
}
```

## Accessibility Implementation Plan

| Requirement | Implementation |
|---|---|
| `<header>` landmark | Native `<header>` element |
| `<nav>` landmark | `<nav aria-label="Main navigation">` wrapping `TabList` |
| Active nav link | `TabList selectedValue` + `aria-current="page"` on active `Tab` |
| Notification bell (non-interactive) | `<span role="status" aria-label="[N] unread notifications" aria-live="polite">` wrapping icon + badge |
| Search input label | `<Combobox aria-label="Search" ...>` |
| Avatar button label | `<Button aria-label="Account menu">` |
| Avatar menu focus | `Menu` handles focus movement to first item on open |
| Avatar menu close | `Menu` returns focus to trigger on Escape |
| Sign-out dialog focus | Focus moves to "Cancel" on open; focus trapped inside; returns to avatar button on close |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` in makeStyles — remove transitions |

## Complexity Tracking

No constitution violations — no entries required.
