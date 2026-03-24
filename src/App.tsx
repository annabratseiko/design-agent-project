import { makeStyles, Text, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    gap: tokens.spacingVerticalL,
  },
});

export default function App() {
  const styles = useStyles();

  return (
    <main className={styles.root}>
      <Text as="h1" size={800} weight="semibold">
        Design Prototypes
      </Text>
      <Text as="p" size={400} align="center">
        Features will appear here as they are built.
      </Text>
    </main>
  );
}
