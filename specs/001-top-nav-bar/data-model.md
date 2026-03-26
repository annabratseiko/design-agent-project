# Data Model: Top Navigation Bar

**Branch**: `001-top-nav-bar` | **Date**: 2026-03-25

---

## Entities

### NavItem

Represents a single top-level navigation link.

| Field | Type | Validation | Notes |
|-------|------|-----------|-------|
| `id` | `string` | Required, unique | e.g., `"dashboard"`, `"projects"` |
| `label` | `string` | Required, non-empty | Display text: "Dashboard", "Projects", etc. |
| `href` | `string` | Required, starts with "/" | Route path: `"/dashboard"`, `"/projects"` |
| `isActive` | `boolean` | Required | Derived from current route; drives `selectedValue` on `TabList` |

**Fixed set** (no dynamic loading): `["dashboard", "projects", "reports", "settings"]`

---

### NotificationState

Represents the async-fetched unread notification count and its loading lifecycle.

| Field | Type | Validation | Notes |
|-------|------|-----------|-------|
| `count` | `number` | Integer ≥ 0 | Unread notification count from API |
| `isLoading` | `boolean` | Required | `true` during API fetch |
| `hasError` | `boolean` | Required | `true` if API call failed |

**Derived display values**:
- `isLoading === true` → render `Skeleton` shimmer, no `CounterBadge`
- `hasError === true` → no `CounterBadge` (silent fail)
- `count === 0` → no `CounterBadge` (hidden)
- `0 < count ≤ 99` → `CounterBadge` shows exact count
- `count > 99` → `CounterBadge` shows `"99+"`

**State transitions**:
```
IDLE → LOADING (on mount / fetch start)
LOADING → LOADED (on fetch success)
LOADING → ERROR (on fetch failure)
LOADED → LOADING (on manual refresh, if implemented)
```

---

### UserProfile

Represents the authenticated user's identity for the avatar display.

| Field | Type | Validation | Notes |
|-------|------|-----------|-------|
| `displayName` | `string` | Required, non-empty | Full name or username |
| `avatarUrl` | `string \| undefined` | Optional, valid URL | Profile image; `undefined` triggers initials fallback |
| `initials` | `string` | Required, 1–2 chars | Derived from `displayName`; shown when `avatarUrl` absent or fails to load |

---

### SearchSuggestion

Represents a single item in the inline search suggestion dropdown.

| Field | Type | Validation | Notes |
|-------|------|-----------|-------|
| `id` | `string` | Required, unique | Used as `Combobox` option `value` |
| `label` | `string` | Required, non-empty | Display text in dropdown |
| `category` | `"Projects" \| "Reports" \| "People"` | Required | Groups results into `OptionGroup` sections |
| `href` | `string` | Required, starts with "/" | Navigation target when suggestion is selected |

---

## Component State

### TopNav local state

| State | Type | Initial Value | Description |
|-------|------|--------------|-------------|
| `isSignOutDialogOpen` | `boolean` | `false` | Controls sign-out confirmation dialog visibility |
| `searchQuery` | `string` | `""` | Controlled value for the search `Combobox` |

---

## Props Interface Contract

```typescript
// Full file: contracts/TopNavProps.ts

export interface TopNavProps {
  /** Current route path — drives active tab highlighting */
  activeRoute: "/dashboard" | "/projects" | "/reports" | "/settings" | string;
  /** Unread notification count. null = not yet loaded */
  notificationCount: number | null;
  /** true while notification count API call is in flight */
  isNotificationLoading: boolean;
  /** Authenticated user profile for avatar display */
  user: UserProfile;
  /** Called when user types 3+ chars; returns categorized suggestions */
  onSearchQuery: (query: string) => SearchSuggestion[] | Promise<SearchSuggestion[]>;
  /** Called when user selects a suggestion or presses Enter; receives href */
  onSearchNavigate: (href: string) => void;
  /** Called when user navigates to a route via nav links */
  onNavigate: (href: string) => void;
  /** Called when sign-out confirmed; should handle session teardown + redirect */
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
