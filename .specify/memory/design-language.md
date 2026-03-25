# Design Language — Project Overrides

> This file contains ONLY project-specific deviations from Fluent UI v9 defaults.
> For default token values, component APIs, props, slots, and accessibility patterns,
> fetch from the canonical Fluent v9 docs index:
> `https://storybooks.fluentui.dev/react/llms.txt`
>
> When the agent needs a specific component or token reference, fetch the relevant
> page (e.g., `https://storybooks.fluentui.dev/react//llms/components-dialog.txt`
> or `https://storybooks.fluentui.dev/react//llms/theme-colors.txt`).

---

## 1. Brand Palette

### Brand Variants — `brandWeb` (16-stop palette)

The default Fluent 2 Web brand ramp. Replace all 16 stops together when
customizing (use Fluent Theme Designer at https://react.fluentui.dev).

| Stop | Hex       | Usage                              |
|------|-----------|------------------------------------|
| 10   | #061724   | Darkest brand shade                |
| 20   | #082338   | Dark backgrounds                   |
| 30   | #0a2e4a   |                                    |
| 40   | #0c3b5e   |                                    |
| 50   | #0e4775   |                                    |
| 60   | #0f548c   |                                    |
| 70   | #115ea3   |                                    |
| 80   | #0f6cbd   | ← Primary brand color (rest state) |
| 90   | #2886de   |                                    |
| 100  | #479ef5   |                                    |
| 110  | #62abf5   |                                    |
| 120  | #77b7f7   |                                    |
| 130  | #96c6fa   |                                    |
| 140  | #b4d6fa   |                                    |
| 150  | #cfe4fa   |                                    |
| 160  | #ebf3fc   | Lightest brand tint                |

> To swap to a different brand (e.g., Teams purple), replace all 16 stops.
> Alternative built-in ramps: `brandTeams` (#5b5fc7), `brandOffice` (#d83b01), `brandTeamsV21` (#654cf5).

### Semantic Color Overrides

Only list tokens that differ from what `createLightTheme(brandVariants)` produces.

```typescript
// Uncomment and modify to override:
// customTheme.colorStatusDangerBackground1  = "#FDE7E9";
// customTheme.colorStatusDangerForeground1  = "#B10E1C";
// customTheme.colorStatusSuccessBackground1 = "#DFF6DD";
// customTheme.colorStatusSuccessForeground1 = "#0E7A0D";
// customTheme.colorStatusWarningBackground1 = "#FFF4CE";
// customTheme.colorStatusWarningForeground1 = "#835C00";
```

### Additional Palette Colors

| Name       | Token / Variable | Hex | Usage |
|------------|-----------------|-----|-------|
| (none yet) |                 |     |       |

> Add non-brand-ramp colors here as your design system grows.


## 2. Token Overrides

All Fluent v9 default token values (typography, spacing, border radius, stroke
widths, shadows, motion) are documented in the canonical docs. Fetch them from:
- Typography: `https://storybooks.fluentui.dev/react//llms/theme-typography.txt`
- Spacing: `https://storybooks.fluentui.dev/react//llms/theme-spacing.txt`
- Border radii: `https://storybooks.fluentui.dev/react//llms/theme-border-radii.txt`
- Colors: `https://storybooks.fluentui.dev/react//llms/theme-colors.txt`
- Shadows: `https://storybooks.fluentui.dev/react//llms/theme-shadows.txt`
- Stroke widths: `https://storybooks.fluentui.dev/react//llms/theme-stroke-widths.txt`
- Fonts: `https://storybooks.fluentui.dev/react//llms/theme-fonts.txt`

**Only document overrides below — values that differ from Fluent defaults.**

### Typography Overrides

| Token Override | Custom Value | Fluent Default | Reason |
|----------------|-------------|----------------|--------|
| (none yet)     |             |                |        |

### Spacing Overrides

| Token Override | Custom Value | Fluent Default | Reason |
|----------------|-------------|----------------|--------|
| (none yet)     |             |                |        |

### Border Radius Overrides

| Token Override | Custom Value | Fluent Default | Reason |
|----------------|-------------|----------------|--------|
| (none yet)     |             |                |        |

### Shadow Overrides

| Token Override | Custom Value | Fluent Default | Reason |
|----------------|-------------|----------------|--------|
| (none yet)     |             |                |        |

### Motion Overrides

| Token Override | Custom Value | Fluent Default | Reason |
|----------------|-------------|----------------|--------|
| (none yet)     |             |                |        |

> CRITICAL: All animations MUST respect `prefers-reduced-motion: reduce`.


## 3. Layout Spacing Rules

Project-specific layout decisions (not Fluent defaults).

| Context               | Value    | Token                        |
|-----------------------|----------|------------------------------|
| Page margin (desktop) | 32px     | spacingHorizontalXXXL        |
| Page margin (tablet)  | 24px     | spacingHorizontalXXL         |
| Page margin (mobile)  | 16px     | spacingHorizontalL           |
| Card internal padding | 16px     | spacingHorizontalL all sides |
| Section gap           | 24px     | spacingVerticalXXL           |
| Form field gap        | 12px     | spacingVerticalM             |
| Inline element gap    | 8px      | spacingHorizontalS           |
| Table cell padding    | 8px 12px | Vertical: S, Horizontal: M   |


## 4. Component-Level Overrides

Document `makeStyles` overrides below **only when your design deviates from
Fluent defaults**. For default component behavior, fetch the component's doc
from `llms.txt` (e.g., `components-button-button.txt`).

> AGENT RULE: Before implementing any component, check this section.
> If an override exists, apply it via `makeStyles`. If not, use Fluent 2 defaults.
> When the designer specifies custom styling during a conversation,
> ADD the override here and reference it in the generated code.

```typescript
// No component overrides yet — using Fluent 2 defaults for all components.
//
// When an override is needed, document it like this:
//
// ### Button
// const useButtonOverrides = makeStyles({
//   primary: {
//     minHeight: "36px",  // Fluent default: 32px — increased for touch targets
//     borderRadius: tokens.borderRadiusMedium,
//   },
// });
```


## 5. Iconography

| Property          | Value                                                        |
|-------------------|--------------------------------------------------------------|
| Icon library      | `@fluentui/react-icons`                                      |
| Default icon size | 20px — use `<Icon20Regular>` / `<Icon20Filled>` variants    |
| Small icon size   | 16px — use `<Icon16Regular>`                                 |
| Large icon size   | 24px — use `<Icon24Regular>`                                 |
| Icon style        | **Regular** for most UI states                               |
|                   | **Filled** for selected / active states                      |
| Icon color        | Inherits from parent (`currentColor`) — do not hardcode      |

```typescript
// Correct usage
import { CheckmarkCircle20Regular, CheckmarkCircle20Filled } from "@fluentui/react-icons";

// In render:
{isSelected ? <CheckmarkCircle20Filled /> : <CheckmarkCircle20Regular />}
```


## 6. Theme Code (Generated)

Import in your application entry point. The agent MUST use these
theme objects — NEVER `webLightTheme` or `webDarkTheme` directly.

```typescript
import {
  createLightTheme,
  createDarkTheme,
  BrandVariants,
  Theme,
} from "@fluentui/react-components";

// --- Brand Palette (from Section 1) ---
const brandVariants: BrandVariants = {
  10: "#061724",
  20: "#082338",
  30: "#0a2e4a",
  40: "#0c3b5e",
  50: "#0e4775",
  60: "#0f548c",
  70: "#115ea3",
  80: "#0f6cbd",
  90: "#2886de",
  100: "#479ef5",
  110: "#62abf5",
  120: "#77b7f7",
  130: "#96c6fa",
  140: "#b4d6fa",
  150: "#cfe4fa",
  160: "#ebf3fc",
};

// --- Light Theme ---
export const lightTheme: Theme = {
  ...createLightTheme(brandVariants),

  // Apply overrides from Sections 1–2 here.
  // Uncomment to customize:
  // fontFamilyBase: "'Inter', 'Segoe UI', sans-serif",
  // spacingHorizontalL: "20px",
  // borderRadiusMedium: "6px",
  // colorStatusDangerBackground1: "#FDE7E9",
};

// --- Dark Theme ---
export const darkTheme: Theme = {
  ...createDarkTheme(brandVariants),

  // Apply same structural overrides as light theme.
  // Dark-specific color overrides go here if needed.
};
```

> AGENT RULE: Import `lightTheme` and `darkTheme` from `src/theme/theme.ts`.
> NEVER use `webLightTheme` or `webDarkTheme` directly.
> When the designer specifies custom values, update the relevant override
> section above AND uncomment/add the override in the theme code.


## 7. Figma Sync

### Source File
- **Figma file:** Fluent 2 web
- **File key:** `GvIcCw0tWaJVDSWD4f1OIW`
- **Direct URL:** https://www.figma.com/design/GvIcCw0tWaJVDSWD4f1OIW/Fluent-2-web
- **npm package:** `@fluentui/tokens` (v1.0.0-alpha.23)
