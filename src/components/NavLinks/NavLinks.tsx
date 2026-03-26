import React from "react";
import { TabList, Tab, mergeClasses } from "@fluentui/react-components";
import { useNavLinksStyles } from "./NavLinks.styles";

const NAV_ITEMS = [
  { value: "/dashboard", label: "Dashboard" },
  { value: "/projects", label: "Projects" },
  { value: "/reports", label: "Reports" },
  { value: "/settings", label: "Settings" },
] as const;

export interface NavLinksProps {
  /** Current route path — drives the active Tab */
  activeRoute: string;
  /** Called when user clicks a tab; receives the route href */
  onNavigate: (href: string) => void;
}

export const NavLinks: React.FC<NavLinksProps> = ({
  activeRoute,
  onNavigate,
}) => {
  const styles = useNavLinksStyles();

  const handleTabSelect = (
    _: React.SyntheticEvent,
    data: { value: unknown }
  ) => {
    if (typeof data.value === "string") {
      onNavigate(data.value);
    }
  };

  // Only set selectedValue when the route matches a known nav item
  const knownValues = NAV_ITEMS.map((item) => item.value) as readonly string[];
  const selectedValue = knownValues.includes(activeRoute)
    ? activeRoute
    : undefined;

  return (
    <nav aria-label="Main navigation" className={styles.nav}>
      <TabList
        selectedValue={selectedValue}
        onTabSelect={handleTabSelect}
        appearance="subtle"
      >
        {NAV_ITEMS.map((item) => (
          <Tab
            key={item.value}
            value={item.value}
            className={styles.tab}
            // aria-current="page" supplements aria-selected for navigation semantics
            aria-current={item.value === selectedValue ? "page" : undefined}
          >
            {item.label}
          </Tab>
        ))}
      </TabList>
    </nav>
  );
};
