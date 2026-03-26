import { makeStyles, tokens } from "@fluentui/react-components";

export const useNavLinksStyles = makeStyles({
  nav: {
    display: "flex",
    alignItems: "center",
  },
  tab: {
    position: "relative",
    // Active state bottom border (non-color indicator — satisfies WCAG 1.4.1)
    "::after": {
      content: "''",
      position: "absolute",
      bottom: "0",
      left: tokens.spacingHorizontalS,
      right: tokens.spacingHorizontalS,
      height: tokens.strokeWidthThick,
      backgroundColor: tokens.colorBrandForeground1,
      opacity: "0",
      transitionProperty: "opacity",
      transitionDuration: tokens.durationNormal,
      transitionTimingFunction: tokens.curveEasyEase,
    },
    "&[aria-selected='true']::after": {
      opacity: "1",
    },
    // Reduced motion — remove transition
    "@media (prefers-reduced-motion: reduce)": {
      "::after": {
        transitionDuration: "0.01ms",
      },
    },
  },
});
