import React, { useState, useEffect } from "react";
import {
  CounterBadge,
  Skeleton,
  SkeletonItem,
} from "@fluentui/react-components";
import { Alert20Regular } from "@fluentui/react-icons";
import { useNavNotificationBellStyles } from "./NavNotificationBell.styles";

export interface NavNotificationBellProps {
  /**
   * Unread notification count.
   * - null → loading state
   * - 0    → badge hidden
   * - 1+   → badge shown (capped at 99+ display)
   */
  notificationCount: number | null;
  /** True while the notification count API call is in flight */
  isNotificationLoading: boolean;
}

// T033: 5-second timeout — if still loading after 5s, treat as error (hide badge)
const FETCH_TIMEOUT_MS = 5000;

function buildAriaLabel(count: number | null, timedOut: boolean): string {
  if (timedOut || count === null || count === 0) return "No unread notifications";
  return `${count > 99 ? "99+" : count} unread notification${count === 1 ? "" : "s"}`;
}

export const NavNotificationBell: React.FC<NavNotificationBellProps> = ({
  notificationCount,
  isNotificationLoading,
}) => {
  const styles = useNavNotificationBellStyles();

  // T033: track timeout — if loading takes > 5s, silently hide badge (SC-004)
  const [fetchTimedOut, setFetchTimedOut] = useState(false);

  useEffect(() => {
    if (!isNotificationLoading) {
      setFetchTimedOut(false);
      return;
    }
    const timer = setTimeout(() => {
      setFetchTimedOut(true);
    }, FETCH_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [isNotificationLoading]);

  const isLoading = isNotificationLoading && !fetchTimedOut;
  const showBadge =
    !isLoading &&
    !fetchTimedOut &&
    notificationCount !== null &&
    notificationCount > 0;

  const ariaLabel = buildAriaLabel(notificationCount, fetchTimedOut);

  return (
    // role="status" + aria-live="polite": count changes are announced without
    // moving focus. aria-atomic="true" ensures the full label is re-read.
    <span
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={ariaLabel}
      className={styles.wrapper}
    >
      <Alert20Regular className={styles.icon} aria-hidden="true" />

      {isLoading && (
        <span className={styles.skeleton}>
          <Skeleton>
            <SkeletonItem shape="circle" size={16} />
          </Skeleton>
        </span>
      )}

      {showBadge && (
        <CounterBadge
          count={notificationCount as number}
          overflowCount={99}
          appearance="filled"
          color="brand"
          size="small"
          className={styles.badge}
          // CounterBadge auto-hides at count=0 via showZero={false} (default)
        />
      )}
    </span>
  );
};
