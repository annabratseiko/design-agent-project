import { makeStyles, tokens } from "@fluentui/react-components";

export const useNavUserMenuStyles = makeStyles({
  trigger: {
    // Minimal padding so Avatar fills the button naturally
    padding: tokens.spacingHorizontalXS,
    // Ensure 44×44px touch target (constitution Article 2)
    minHeight: "44px",
    minWidth: "44px",
  },
});
