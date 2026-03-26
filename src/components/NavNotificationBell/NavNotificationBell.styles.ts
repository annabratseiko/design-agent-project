import { makeStyles, tokens } from "@fluentui/react-components";

export const useNavNotificationBellStyles = makeStyles({
  wrapper: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    // Non-interactive — block pointer events entirely
    pointerEvents: "none",
    // Ensure 44×44px minimum area for visual alignment with other nav items
    minWidth: "44px",
    minHeight: "44px",
  },
  icon: {
    color: tokens.colorNeutralForeground2,
    fontSize: "20px",
  },
  badge: {
    position: "absolute",
    top: tokens.spacingVerticalXS,
    insetInlineEnd: tokens.spacingHorizontalXS,
  },
  skeleton: {
    position: "absolute",
    top: tokens.spacingVerticalXS,
    insetInlineEnd: tokens.spacingHorizontalXS,
  },
});
