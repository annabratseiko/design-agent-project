import { makeStyles, tokens } from "@fluentui/react-components";

export const useNavSearchStyles = makeStyles({
  combobox: {
    width: "240px",
    transitionProperty: "width",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    ":focus-within": {
      width: "320px",
    },
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: "0.01ms",
    },
  },
});
