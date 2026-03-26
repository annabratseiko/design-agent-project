import { useState } from "react";
import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { TopNav } from "./components/TopNav";
import type { SearchSuggestion } from "./components/TopNav";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 1 auto",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalXXXL,
  },
});

const MOCK_USER = {
  displayName: "Alex Johnson",
  initials: "AJ",
  avatarUrl: undefined,
};

// Mock search suggestions for prototype
const MOCK_SUGGESTIONS: SearchSuggestion[] = [
  { id: "p1", label: "Q1 Campaign", category: "Projects", href: "/projects/1" },
  { id: "p2", label: "Website Redesign", category: "Projects", href: "/projects/2" },
  { id: "r1", label: "Monthly Summary", category: "Reports", href: "/reports/1" },
  { id: "r2", label: "Engagement Report", category: "Reports", href: "/reports/2" },
  { id: "u1", label: "Sam Rivera", category: "People", href: "/people/1" },
];

export function App() {
  const styles = useStyles();
  const [activeRoute, setActiveRoute] = useState("/dashboard");

  const handleNavigate = (href: string) => setActiveRoute(href);

  const handleSearchQuery = (query: string): SearchSuggestion[] =>
    MOCK_SUGGESTIONS.filter((s) =>
      s.label.toLowerCase().includes(query.toLowerCase())
    );

  const handleSearchNavigate = (href: string) => {
    console.log("Search navigate:", href);
  };

  const handleSignOut = async () => {
    console.log("Signed out");
  };

  return (
    <div className={styles.root}>
      <TopNav
        activeRoute={activeRoute}
        notificationCount={3}
        isNotificationLoading={false}
        user={MOCK_USER}
        appName="Design Prototypes"
        onNavigate={handleNavigate}
        onSearchQuery={handleSearchQuery}
        onSearchNavigate={handleSearchNavigate}
        onSignOut={handleSignOut}
      />
      <main className={styles.main}>
        <Text as="h1" size={800} weight="semibold">
          Design Prototypes
        </Text>
        <Text as="p" size={400} align="center">
          Active route: <strong>{activeRoute}</strong>
        </Text>
      </main>
    </div>
  );
}
