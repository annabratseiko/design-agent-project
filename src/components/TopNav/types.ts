/**
 * Shared types for the TopNav component and its sub-components.
 * Source of truth: specs/001-top-nav-bar/contracts/TopNavProps.ts
 */

export interface UserProfile {
  /** Full name or username — used for Avatar display and initials fallback */
  displayName: string;
  /** Profile image URL. When absent or fails to load, `initials` is shown */
  avatarUrl?: string;
  /** 1–2 character fallback shown when avatarUrl is absent or errors */
  initials: string;
}

export interface SearchSuggestion {
  /** Unique ID — used as Combobox option value */
  id: string;
  /** Display text in the suggestion dropdown */
  label: string;
  /** Determines which OptionGroup the result appears under */
  category: "Projects" | "Reports" | "People";
  /** Route path to navigate to when suggestion is selected */
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
}

export interface NotificationState {
  count: number;
  isLoading: boolean;
  hasError: boolean;
}

export interface TopNavProps {
  /**
   * Current active route path — drives which Tab receives the active style.
   * Unknown routes show no active tab.
   */
  activeRoute: "/dashboard" | "/projects" | "/reports" | "/settings" | (string & {});
  /**
   * Unread notification count.
   * - null  → loading (show skeleton, hide badge)
   * - 0     → hide badge
   * - 1-99  → show exact count
   * - 100+  → show "99+"
   */
  notificationCount: number | null;
  /** True while notification count API call is in flight */
  isNotificationLoading: boolean;
  /** Authenticated user — drives Avatar display */
  user: UserProfile;
  /** Application name used in sign-out dialog title */
  appName?: string;
  /** Called when user types 3+ chars; returns categorized suggestions */
  onSearchQuery: (query: string) => SearchSuggestion[] | Promise<SearchSuggestion[]>;
  /** Called when user selects a suggestion or presses Enter on non-empty query */
  onSearchNavigate: (href: string) => void;
  /** Called when user clicks a nav link; receives the route href */
  onNavigate: (href: string) => void;
  /** Called after user confirms sign-out */
  onSignOut: () => Promise<void>;
}
