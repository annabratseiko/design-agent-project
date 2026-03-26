/**
 * TopNav Component Interface Contract
 *
 * Branch: 001-top-nav-bar
 * Feature: Top Navigation Bar
 * Spec: specs/001-top-nav-bar/spec.md
 *
 * This file is the source of truth for the TopNav component's public API.
 * All prop changes must be reflected in spec.md per Article 5 (Spec Sync).
 */

export interface UserProfile {
  /** Full name or username — used for avatar display name and initials fallback */
  displayName: string;
  /** Profile image URL. When absent or fails to load, `initials` is used */
  avatarUrl?: string;
  /** 1–2 character fallback, shown when avatarUrl is absent or errors */
  initials: string;
}

export interface SearchSuggestion {
  /** Unique ID — used as Combobox option value */
  id: string;
  /** Display text shown in suggestion dropdown */
  label: string;
  /** Determines which OptionGroup the result appears under */
  category: "Projects" | "Reports" | "People";
  /** Route path to navigate to when suggestion is selected */
  href: string;
}

export interface TopNavProps {
  /**
   * Current active route path. Drives which Tab receives the active visual treatment.
   * Accepts known routes or any string (unknown routes show no active tab).
   */
  activeRoute: "/dashboard" | "/projects" | "/reports" | "/settings" | (string & {});

  /**
   * Unread notification count for the badge.
   * - null  → loading state (render skeleton shimmer, hide badge)
   * - 0     → no badge shown
   * - 1–99  → exact count on badge
   * - 100+  → badge shows "99+"
   */
  notificationCount: number | null;

  /** True while the notification count API call is in flight */
  isNotificationLoading: boolean;

  /** Authenticated user's identity — drives Avatar display */
  user: UserProfile;

  /**
   * Called when the user types 3+ characters in the search box.
   * Returns categorized suggestions synchronously or as a Promise.
   */
  onSearchQuery: (query: string) => SearchSuggestion[] | Promise<SearchSuggestion[]>;

  /**
   * Called when the user selects a suggestion or presses Enter with a non-empty query.
   * Receives the full href for navigation (suggestion.href or `/search?q=[query]`).
   */
  onSearchNavigate: (href: string) => void;

  /** Called when user clicks a nav link tab. Receives the route href. */
  onNavigate: (href: string) => void;

  /**
   * Called after the user confirms sign-out in the confirmation dialog.
   * Should handle session teardown and redirect to login page.
   */
  onSignOut: () => Promise<void>;
}
