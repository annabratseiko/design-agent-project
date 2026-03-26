import { makeStyles, tokens } from "@fluentui/react-components";

export const useTopNavStyles = makeStyles({
  root: {
    position: "sticky",
    top: "0",
    // z-index 1000: no Fluent token exists for z-index; this value sits above
    // page content but below Fluent Dialog portals (which use 1000+).
    zIndex: 1000,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke1,
    paddingInline: tokens.spacingHorizontalXXXL,
    minHeight: "48px",
    boxSizing: "border-box",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    marginInlineEnd: tokens.spacingHorizontalL,
  },
  logoText: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorBrandForeground1,
    whiteSpace: "nowrap",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    flex: "0 0 auto",
  },
  spacer: {
    flex: "1 1 auto",
  },
  rightSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexShrink: 0,
  },
});
