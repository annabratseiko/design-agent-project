# Research: Top Navigation Bar

**Branch**: `001-top-nav-bar` | **Date**: 2026-03-25

---

## Decision 1: Nav Links Component

**Decision**: `TabList` + `Tab` (appearance="subtle") with custom active indicator via `makeStyles`

**Rationale**: `TabList` provides built-in `selectedValue`/`onTabSelect` for active state management, keyboard navigation (arrow keys between tabs), and `aria-selected` semantics automatically. Augmenting with `aria-current="page"` makes it proper navigation semantics. The alternative — plain `Link` components — requires manual active-state tracking and keyboard-nav implementation, adding complexity without benefit.

**Alternatives considered**:
- `NavDrawer + NavItem` — designed for sidebar vertical navigation; inappropriate for horizontal top nav
- Plain `Link` components in a `<nav>` — correct semantically, but requires building keyboard navigation and active state tracking manually
- Custom `<ul><li><a>` — anti-pattern per constitution (should use Fluent components)

---

## Decision 2: Search Component

**Decision**: `Combobox` from `@fluentui/react-components` — no `<Field>` wrapper

**Rationale**: `Combobox` supports grouped options (via `OptionGroup`) which maps to categorized suggestions (Projects, Reports, People). The `freeform` prop allows Enter-to-submit behavior without requiring a selection from the list, enabling navigation to `/search?q=[query]`. The `<Field>` wrapper is intentionally omitted — it adds a visible label, hint text, and validation text layout that is inappropriate for an inline nav bar search. `aria-label="Search"` is provided directly on the `Combobox` element to satisfy WCAG 2.1 SC 1.3.1.

**Alternatives considered**:
- `SearchBox` from `@fluentui/react-search` — specialized for filtering; doesn't natively support categorized suggestion groups with navigation targets
- `Input` — no built-in suggestion/dropdown capability; would require composing a custom combobox
- `Field > Combobox` — Field wrapper adds visual label + validation layout incompatible with nav bar context

---

## Decision 3: Notification Bell (Non-Interactive)

**Decision**: `<span role="status" aria-live="polite" aria-label="[N] unread notifications">` containing `Bell20Regular` icon + `CounterBadge`

**Rationale**: The spec explicitly states no click action. Using a `Button` would create a keyboard-focusable element that does nothing — a WCAG 2.1 SC 4.1.2 violation. A `<span>` with `role="status"` and `aria-live="polite"` makes the count change announcement automatic when the count updates, satisfying the screen reader requirement without any interactive commitment.

`CounterBadge` auto-hides at `count={0}` (Fluent default), satisfying FR-009 without conditional rendering.

**Alternatives considered**:
- `Button appearance="subtle"` — interactive element; using a non-interactive button violates a11y
- Custom CSS badge over icon — anti-pattern (no makeStyles; would require raw CSS)
- `Badge` (non-counter) — doesn't support numeric display and auto-hide behavior

---

## Decision 4: Avatar Dropdown

**Decision**: `Menu` + `MenuTrigger` + `MenuPopover` + `MenuList` + `MenuItem` × 3 + `MenuDivider`, with a custom `Button appearance="subtle"` containing `Avatar` as the trigger

**Rationale**: `Menu` is the canonical Fluent v9 component for a list of actions triggered by a button. It handles: focus management (first item on open), keyboard navigation (arrow keys, Enter, Escape), click-outside dismissal, and `aria-haspopup="menu"` / `aria-expanded` on the trigger. Using `MenuButton` was considered but it renders a button with a chevron icon — not appropriate for an avatar-only trigger.

**Pattern**:
```tsx
<Menu>
  <MenuTrigger>
    <Button appearance="subtle" aria-label="Account menu">
      <Avatar name={user.displayName} image={{ src: user.avatarUrl }} />
    </Button>
  </MenuTrigger>
  <MenuPopover>
    <MenuList>
      <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
      <MenuItem onClick={() => navigate("/preferences")}>Preferences</MenuItem>
      <MenuDivider />
      <MenuItem onClick={handleSignOutClick}>Sign out</MenuItem>
    </MenuList>
  </MenuPopover>
</Menu>
```

**Alternatives considered**:
- `MenuButton` — renders a visible chevron caret; not appropriate for avatar-only trigger
- `Popover` — for content, not action lists; no arrow-key navigation built in
- Custom dropdown div — anti-pattern per constitution

---

## Decision 5: Sign-Out Confirmation Dialog

**Decision**: `Dialog` with `DialogSurface`, `DialogTitle`, `DialogBody`, `DialogActions`; "Cancel" button receives initial focus

**Rationale**: Confirmation of a destructive/session-ending action requires a blocking overlay — `Dialog` is the correct component per the component selector (user MUST respond). Initial focus to "Cancel" follows the WCAG safe-default pattern: the least destructive action gets focus, preventing accidental sign-out from a single Enter keypress.

**Focus flow**:
1. "Sign out" MenuItem clicked → Dialog opens → focus moves to "Cancel" button
2. User presses Enter → dialog closes → focus returns to avatar button (Menu trigger)
3. OR user tabs to "Sign out" primary button → presses Enter → signs out

**Alternatives considered**:
- `Popover` confirmation — not focus-trapped; user can Tab away; not blocking
- `MessageBar` confirmation inline — too subtle for a session-ending action
- No confirmation — flagged as required by spec (FR-015/FR-016)

---

## Decision 6: Sticky Positioning & Z-Index

**Decision**: `position: sticky; top: 0` with `zIndex: 1000` via `makeStyles`

**Rationale**: `position: sticky` keeps the nav bar in the document flow (unlike `fixed`, which removes it), preventing content from shifting under the bar. Z-index 1000 places it above regular page content. Fluent `Dialog` uses z-index 1000+ (via its own portal), so dialogs will correctly appear on top of the nav bar.

**Token usage**: Fluent v9 does not provide a z-index token. This is a documented raw value usage — the only justified exception to the "tokens only" rule.

**Alternatives considered**:
- `position: fixed` — removes bar from flow; requires `padding-top` on every page; fragile
- No z-index override — nav bar would be hidden behind sticky sidebar or modals

---

## Decision 7: design-language.md Overrides Required

**New overrides needed for this feature**: None. All styling uses Fluent v9 default tokens. The `makeStyles` active indicator and sticky positioning are component-level overrides, not design-system-level overrides.

**Tokens used from design-language.md Section 6 theme**:
- `lightTheme` for `FluentProvider` — already defined in `src/theme/theme.ts`
- Brand color `#0f6cbd` (brand stop 80) drives `tokens.colorBrandForeground1` and `tokens.colorBrandBackground`
