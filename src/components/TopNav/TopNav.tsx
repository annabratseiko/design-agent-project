import React from "react";
import { Text } from "@fluentui/react-components";
import { useTopNavStyles } from "./TopNav.styles";
import { NavLinks } from "../NavLinks";
import { NavSearch } from "../NavSearch";
import { NavNotificationBell } from "../NavNotificationBell";
import { NavUserMenu } from "../NavUserMenu";
import type { TopNavProps } from "./types";

export const TopNav: React.FC<TopNavProps> = ({
  activeRoute,
  notificationCount,
  isNotificationLoading,
  user,
  appName = "this app",
  onSearchQuery,
  onSearchNavigate,
  onNavigate,
  onSignOut,
}) => {
  const styles = useTopNavStyles();

  return (
    <header className={styles.root}>
      {/* Logo — word mark, decorative, no click action */}
      <div className={styles.logo} aria-hidden="true">
        <Text className={styles.logoText} weight="semibold">
          {appName}
        </Text>
      </div>

      {/* Primary navigation */}
      <div className={styles.navLinks}>
        <NavLinks activeRoute={activeRoute} onNavigate={onNavigate} />
      </div>

      {/* Flexible spacer pushes right-side elements to the end */}
      <div className={styles.spacer} aria-hidden="true" />

      {/* Right section: search, notifications, avatar */}
      <div className={styles.rightSection}>
        <NavSearch
          onSearchQuery={onSearchQuery}
          onSearchNavigate={onSearchNavigate}
        />
        <NavNotificationBell
          notificationCount={notificationCount}
          isNotificationLoading={isNotificationLoading}
        />
        <NavUserMenu
          user={user}
          appName={appName}
          onNavigate={onNavigate}
          onSignOut={onSignOut}
        />
      </div>
    </header>
  );
};
