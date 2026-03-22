# Design Language

> Single source of truth for all visual customizations.
> Tokens sourced directly from `@fluentui/tokens` v1.0.0-alpha.23 — the npm package that backs the Fluent 2 web Figma file (GvIcCw0tWaJVDSWD4f1OIW).
> The AI agent MUST reference this file when generating any UI code.

---

## 1. Brand Colors

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

### Alternative Brand Ramps (built-in to `@fluentui/tokens`)

| Name            | Stop 80 (primary) | Use case               |
|-----------------|-------------------|------------------------|
| brandTeams      | #5b5fc7           | Microsoft Teams purple |
| brandOffice     | #d83b01           | Microsoft Office red   |
| brandTeamsV21   | #654cf5           | Teams v2.1 violet      |

### Semantic Color Overrides

Only list tokens that differ from what `createLightTheme(brandVariants)` produces.

```typescript
// Example: uncomment and modify to override
// customTheme.colorStatusDangerBackground1  = "#FDE7E9";
// customTheme.colorStatusDangerForeground1  = "#B10E1C";
// customTheme.colorStatusSuccessBackground1 = "#DFF6DD";
// customTheme.colorStatusSuccessForeground1 = "#0E7A0D";
// customTheme.colorStatusWarningBackground1 = "#FFF4CE";
// customTheme.colorStatusWarningForeground1 = "#835C00";
```

### Key Semantic Color Tokens (Light theme, resolved values)

These are the most-used semantic tokens produced by `createLightTheme(brandWeb)`.
Full list lives in `@fluentui/tokens/lib-commonjs/alias/lightColor.js`.

| Token                          | Resolved value | Notes                     |
|--------------------------------|----------------|---------------------------|
| colorNeutralForeground1        | #242424        | Primary text              |
| colorNeutralForeground2        | #424242        | Secondary text            |
| colorNeutralForeground3        | #616161        | Tertiary / placeholder    |
| colorNeutralForegroundDisabled | #bdbdbd        | Disabled text             |
| colorNeutralBackground1        | #ffffff        | Canvas / page             |
| colorNeutralBackground2        | #fafafa        | Subtle layer              |
| colorNeutralBackground3        | #f5f5f5        | Recessed surface          |
| colorNeutralBackgroundDisabled | #f0f0f0        | Disabled surface          |
| colorNeutralStroke1            | #d1d1d1        | Default border            |
| colorNeutralStrokeAccessible   | #616161        | AA-compliant border       |
| colorBrandBackground           | #0f6cbd        | Primary button background |
| colorBrandForeground1          | #0f6cbd        | Brand text / icon         |
| colorBrandForegroundLink       | #115ea3        | Link color                |
| colorNeutralShadowAmbient      | rgba(0,0,0,0.12) | Shadow ambient layer    |
| colorNeutralShadowKey          | rgba(0,0,0,0.14) | Shadow key layer        |
| colorStrokeFocus1              | #ffffff        | Focus ring inner          |
| colorStrokeFocus2              | #000000        | Focus ring outer          |
| colorBackgroundOverlay         | rgba(0,0,0,0.40) | Modal scrim             |

### Additional Palette Colors

| Name       | Token / Variable | Hex | Usage |
|------------|-----------------|-----|-------|
| (none yet) |                 |     |       |

> Add non-brand-ramp colors here as your design system grows.


## 2. Typography

### Font Families (exact values from `@fluentui/tokens`)

| Token               | Value                                                                                                         |
|---------------------|---------------------------------------------------------------------------------------------------------------|
| fontFamilyBase      | `'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif` |
| fontFamilyMonospace | `Consolas, 'Courier New', Courier, monospace`                                                                |
| fontFamilyNumeric   | `Bahnschrift, 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif` |

> To change fonts, update the theme object in Section 8 and add a `fontFamilyBase` override.
> When using custom fonts (e.g., Inter), ensure they are loaded via Google Fonts CDN or `@font-face`.

### Font Weights

| Token               | Value |
|---------------------|-------|
| fontWeightRegular   | 400   |
| fontWeightMedium    | 500   |
| fontWeightSemibold  | 600   |
| fontWeightBold      | 700   |

### Type Scale (raw tokens)

| Token            | Size | Line Height | Usage                 |
|------------------|------|-------------|----------------------|
| fontSizeBase100  | 10px | 14px        | Captions, badges     |
| fontSizeBase200  | 12px | 16px        | Small text           |
| fontSizeBase300  | 14px | 20px        | Body text (default)  |
| fontSizeBase400  | 16px | 22px        | Subheadings          |
| fontSizeBase500  | 20px | 28px        | Section headers      |
| fontSizeBase600  | 24px | 32px        | Page titles          |
| fontSizeHero700  | 28px | 36px        | Hero text            |
| fontSizeHero800  | 32px | 40px        | Large hero           |
| fontSizeHero900  | 40px | 52px        | Display text         |
| fontSizeHero1000 | 68px | 92px        | Marketing hero       |

### Named Type Styles (from `typographyStyles` export)

Use these composite styles for consistent typography. Each bundles fontFamily + fontSize + fontWeight + lineHeight.

| Style name      | Size token       | Size  | Weight    | Line Height | Typical use              |
|-----------------|-----------------|-------|-----------|-------------|--------------------------|
| caption2        | fontSizeBase100  | 10px  | Regular   | 14px        | Fine print, overlines    |
| caption2Strong  | fontSizeBase100  | 10px  | Semibold  | 14px        |                          |
| caption1        | fontSizeBase200  | 12px  | Regular   | 16px        | Helper text, tooltips    |
| caption1Strong  | fontSizeBase200  | 12px  | Semibold  | 16px        |                          |
| caption1Stronger| fontSizeBase200  | 12px  | Bold      | 16px        |                          |
| body1           | fontSizeBase300  | 14px  | Regular   | 20px        | Default body text        |
| body1Strong     | fontSizeBase300  | 14px  | Semibold  | 20px        | Emphasized body          |
| body1Stronger   | fontSizeBase300  | 14px  | Bold      | 20px        |                          |
| body2           | fontSizeBase400  | 16px  | Regular   | 22px        | Larger body              |
| subtitle2       | fontSizeBase400  | 16px  | Semibold  | 22px        | Card titles, list heads  |
| subtitle2Stronger | fontSizeBase400 | 16px | Bold     | 22px        |                          |
| subtitle1       | fontSizeBase500  | 20px  | Semibold  | 28px        | Section headings         |
| title3          | fontSizeBase600  | 24px  | Semibold  | 32px        | Page sub-titles          |
| title2          | fontSizeHero700  | 28px  | Semibold  | 36px        | Page titles              |
| title1          | fontSizeHero800  | 32px  | Semibold  | 40px        | Primary page heading     |
| largeTitle      | fontSizeHero900  | 40px  | Semibold  | 52px        | Hero headings            |
| display         | fontSizeHero1000 | 68px  | Semibold  | 92px        | Marketing / splash       |

```typescript
// Usage in makeStyles
import { typographyStyles } from "@fluentui/react-components";
// ...
const useStyles = makeStyles({
  heading: typographyStyles.title2,
  body:    typographyStyles.body1,
});
```

### Type Scale Overrides

| Token Override | Custom Value | Fluent Default | Reason |
|----------------|-------------|----------------|--------|
| (none yet)     |             |                |        |


## 3. Spacing

### Spacing Scale (exact values from `@fluentui/tokens`)

| Token                   | Value | Token (Vertical)         | Value |
|-------------------------|-------|--------------------------|-------|
| spacingHorizontalNone   | 0     | spacingVerticalNone      | 0     |
| spacingHorizontalXXS    | 2px   | spacingVerticalXXS       | 2px   |
| spacingHorizontalXS     | 4px   | spacingVerticalXS        | 4px   |
| spacingHorizontalSNudge | 6px   | spacingVerticalSNudge    | 6px   |
| spacingHorizontalS      | 8px   | spacingVerticalS         | 8px   |
| spacingHorizontalMNudge | 10px  | spacingVerticalMNudge    | 10px  |
| spacingHorizontalM      | 12px  | spacingVerticalM         | 12px  |
| spacingHorizontalL      | 16px  | spacingVerticalL         | 16px  |
| spacingHorizontalXL     | 20px  | spacingVerticalXL        | 20px  |
| spacingHorizontalXXL    | 24px  | spacingVerticalXXL       | 24px  |
| spacingHorizontalXXXL   | 32px  | spacingVerticalXXXL      | 32px  |

### Spacing Overrides

| Token Override | Custom Value | Fluent Default | Reason |
|----------------|-------------|----------------|--------|
| (none yet)     |             |                |        |

### Layout Spacing Rules

| Context               | Value    | Notes                      |
|-----------------------|----------|----------------------------|
| Page margin (desktop) | 32px     | spacingHorizontalXXXL      |
| Page margin (tablet)  | 24px     | spacingHorizontalXXL       |
| Page margin (mobile)  | 16px     | spacingHorizontalL         |
| Card internal padding | 16px     | spacingHorizontalL all sides|
| Section gap           | 24px     | spacingVerticalXXL         |
| Form field gap        | 12px     | spacingVerticalM           |
| Inline element gap    | 8px      | spacingHorizontalS         |
| Table cell padding    | 8px 12px | Vertical: S, Horizontal: M |


## 4. Shape & Elevation

### Border Radius (exact values from `@fluentui/tokens`)

| Token                 | Value   | Usage                           |
|-----------------------|---------|---------------------------------|
| borderRadiusNone      | 0       | Sharp corners (dividers)        |
| borderRadiusSmall     | 2px     | Subtle rounding (tags, badges)  |
| borderRadiusMedium    | 4px     | Buttons, inputs, checkboxes     |
| borderRadiusLarge     | 6px     | Cards, dropdowns                |
| borderRadiusXLarge    | 8px     | Dialogs, drawers, tooltips      |
| borderRadius2XLarge   | 12px    | Larger panels                   |
| borderRadius3XLarge   | 16px    | Bottom sheets                   |
| borderRadius4XLarge   | 24px    | Floating surfaces               |
| borderRadius5XLarge   | 32px    | Large modals                    |
| borderRadius6XLarge   | 40px    | Extra-large surfaces            |
| borderRadiusCircular  | 10000px | Avatars, FABs, progress rings   |

### Border Radius Overrides

| Token Override | Custom Value | Fluent Default | Reason |
|----------------|-------------|----------------|--------|
| (none yet)     |             |                |        |

### Stroke Widths

| Token                | Value | Usage                        |
|----------------------|-------|------------------------------|
| strokeWidthThin      | 1px   | Default borders              |
| strokeWidthThick     | 2px   | Focus rings, emphasis        |
| strokeWidthThicker   | 3px   | Strong emphasis              |
| strokeWidthThickest  | 4px   | Maximum emphasis             |

### Shadow / Elevation (exact values from `createShadowTokens` in `@fluentui/tokens`)

Ambient: `rgba(0,0,0,0.12)` · Key: `rgba(0,0,0,0.14)` · Brand ambient: `rgba(0,0,0,0.30)` · Brand key: `rgba(0,0,0,0.25)`

| Token    | CSS value                                                    | Usage              |
|----------|--------------------------------------------------------------|--------------------|
| shadow2  | `0 0 2px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)`     | Subtle hover lift  |
| shadow4  | `0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)`     | Cards              |
| shadow8  | `0 0 2px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.14)`     | Popovers, dropdowns|
| shadow16 | `0 0 2px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.14)`    | Dialogs            |
| shadow28 | `0 0 8px rgba(0,0,0,0.12), 0 14px 28px rgba(0,0,0,0.14)`   | Drawers, modals    |
| shadow64 | `0 0 8px rgba(0,0,0,0.12), 0 32px 64px rgba(0,0,0,0.14)`   | Full-screen panels |

Brand shadow variants (`shadow2Brand` … `shadow64Brand`) follow the same shape with brand ambient/key.

### Shadow Overrides

| Token Override | Custom Value | Fluent Default | Reason |
|----------------|-------------|----------------|--------|
| (none yet)     |             |                |        |


## 5. Component-Level Overrides

Component pages in the Fluent 2 web Figma file (GvIcCw0tWaJVDSWD4f1OIW):
Accordion · Avatars · Badge · Breadcrumb · Button · Card · Carousel · Checkbox ·
DataGrid · Dialog · Divider · Drawer · Dropdown · Field · Info label · Input ·
Label · Link · List · Material acrylic · Menu · Message bar · Nav · Persona ·
Popover · Progress bar · RadioGroup · Rating · SearchBox · Skeleton · Slider ·
Spin button · Spinner · Status indicator · SwatchPicker · Switch · TabList ·
Tag & Interaction tag · TagPicker · Teaching PopOver · Textarea · Toast ·
Toolbar · Tooltip · Tree

Document `makeStyles` overrides below **only when your design deviates from Fluent defaults**.

> AGENT RULE: Before implementing any component, check this section.
> If an override exists, apply it via `makeStyles`. If not, use Fluent 2 defaults.
> When the designer specifies custom styling during a conversation,
> ADD the override here and reference it in the generated code.

### Accordion

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Avatars (Avatar, AvatarGroup)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Badge (Badge, CounterBadge, PresenceBadge)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Breadcrumb

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Button (Button, CompoundButton, MenuButton, SplitButton, ToggleButton)

```typescript
// No custom overrides — using Fluent 2 defaults.
// Example when override is needed:
//
// const useButtonOverrides = makeStyles({
//   primary: {
//     minHeight: "36px",  // Fluent default: 32px
//     borderRadius: tokens.borderRadiusMedium,
//   },
// });
```

### Card (Card, CardHeader, CardFooter, CardPreview)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Carousel

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Checkbox

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### DataGrid / Table

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Dialog (Dialog, DialogSurface, DialogTitle, DialogBody, DialogActions)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Divider

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Drawer (DrawerOverlay, DrawerInline)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Dropdown

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Field (wraps Input, Textarea, Combobox, etc.)

```typescript
// No custom overrides — using Fluent 2 defaults.
// ALWAYS wrap form inputs in <Field> — required by constitution.
```

### Info label

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Input

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Label

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Link

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### List (List, ListItem)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Menu (Menu, MenuList, MenuItem, MenuDivider, MenuGroup)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Message bar

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Nav (NavDrawer, NavItem, NavCategory)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Persona

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Popover (Popover, PopoverTrigger, PopoverSurface)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Progress bar

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### RadioGroup (RadioGroup, Radio)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Rating (Rating, RatingDisplay)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### SearchBox

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Skeleton (Skeleton, SkeletonItem)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Slider

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Spin button

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Spinner

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Status indicator

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### SwatchPicker

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Switch

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### TabList (TabList, Tab)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Tag & Interaction tag (Tag, InteractionTag, TagGroup)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### TagPicker

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Teaching PopOver

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Textarea

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Toast (Toaster, Toast, ToastTitle, ToastBody, ToastFooter)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Toolbar (Toolbar, ToolbarButton, ToolbarDivider, ToolbarGroup)

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Tooltip

```typescript
// No custom overrides — using Fluent 2 defaults.
```

### Tree (Tree, TreeItem, FlatTree)

```typescript
// No custom overrides — using Fluent 2 defaults.
```


## 6. Iconography

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


## 7. Motion & Animation

### Duration tokens (exact values from `@fluentui/tokens`)

| Token              | Value | Typical use                           |
|--------------------|-------|---------------------------------------|
| durationUltraFast  | 50ms  | Micro-interactions, ripples           |
| durationFaster     | 100ms | Hover states, focus rings             |
| durationFast       | 150ms | Small reveals (tooltip, badge)        |
| durationNormal     | 200ms | Standard transitions (menu open)      |
| durationGentle     | 250ms | Larger reveals (panel, accordion)     |
| durationSlow       | 300ms | Page-level transitions                |
| durationSlower     | 400ms | Complex multi-step animations         |
| durationUltraSlow  | 500ms | Full-screen overlays, teaching moments|

### Easing curves (exact values from `@fluentui/tokens`)

| Token              | CSS cubic-bezier                  | Use                          |
|--------------------|-----------------------------------|------------------------------|
| curveEasyEase      | `cubic-bezier(0.33,0,0.67,1)`    | Default — most transitions   |
| curveEasyEaseMax   | `cubic-bezier(0.8,0,0.2,1)`      | Emphasized ease              |
| curveDecelerateMax | `cubic-bezier(0.1,0.9,0.2,1)`    | Enter animations             |
| curveDecelerateMid | `cubic-bezier(0,0,0,1)`          | Enter — quick decel          |
| curveDecelerateMin | `cubic-bezier(0.33,0,0.1,1)`     | Enter — subtle               |
| curveAccelerateMax | `cubic-bezier(0.9,0.1,1,0.2)`    | Exit animations              |
| curveAccelerateMid | `cubic-bezier(1,0,1,1)`          | Exit — quick accel           |
| curveAccelerateMin | `cubic-bezier(0.8,0,0.78,1)`     | Exit — subtle                |
| curveLinear        | `cubic-bezier(0,0,1,1)`          | Progress bars, spinners      |

> CRITICAL: MUST disable all animations when `prefers-reduced-motion: reduce`.

```typescript
const useStyles = makeStyles({
  animated: {
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: "0ms",
    },
  },
});
```


## 8. Theme Code (Generated)

Import in your application entry point. The agent MUST use these
theme objects — NEVER `webLightTheme` or `webDarkTheme` directly.

```typescript
import {
  createLightTheme,
  createDarkTheme,
  BrandVariants,
  Theme,
} from "@fluentui/react-components";

// --- Brand Palette (from Section 1 — brandWeb) ---
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

  // Typography overrides (Section 2) — uncomment to customize
  // fontFamilyBase: "'Inter', 'Segoe UI', sans-serif",
  // fontFamilyMonospace: "'Cascadia Code', Consolas, monospace",

  // Spacing overrides (Section 3) — uncomment to customize
  // spacingHorizontalL: "20px",

  // Shape overrides (Section 4) — uncomment to customize
  // borderRadiusMedium: "6px",

  // Semantic color overrides (Section 1) — uncomment to customize
  // colorStatusDangerBackground1: "#FDE7E9",
};

// --- Dark Theme ---
export const darkTheme: Theme = {
  ...createDarkTheme(brandVariants),

  // Apply same structural overrides as light theme
  // (typography, spacing, shape — color tokens differ automatically)
  // Dark-specific color overrides go here if needed
};
```

> AGENT RULE: Import `lightTheme` and `darkTheme` from `src/theme/theme.ts`.
> NEVER use `webLightTheme` or `webDarkTheme` directly.
> When the designer specifies custom values, update the relevant section
> above AND uncomment/add the override in the theme code.


## 9. Figma Sync

### Source File
- **Figma file:** Fluent 2 web
- **File key:** `GvIcCw0tWaJVDSWD4f1OIW`
- **Direct URL:** https://www.figma.com/design/GvIcCw0tWaJVDSWD4f1OIW/Fluent-2-web
- **npm package:** `@fluentui/tokens` (v1.0.0-alpha.23) — tokens in this file are kept in sync with the package

### Token source files in `@fluentui/tokens`

| File                                     | Contents                                  |
|------------------------------------------|-------------------------------------------|
| `global/brandColors.js`                  | brandWeb, brandTeams, brandOffice ramps   |
| `global/fonts.js`                        | fontFamilies, fontSizes, lineHeights, fontWeights |
| `global/spacings.js`                     | horizontalSpacings, verticalSpacings      |
| `global/borderRadius.js`                 | borderRadius tokens                       |
| `global/strokeWidths.js`                 | strokeWidth tokens                        |
| `global/durations.js`                    | duration tokens                           |
| `global/curves.js`                       | easing curve tokens                       |
| `global/colors.js`                       | grey, whiteAlpha, blackAlpha palettes     |
| `alias/lightColor.js`                    | Semantic color tokens (light mode)        |
| `alias/lightColorPalette.js`             | Status and persona palette tokens         |
| `utils/shadows.js`                       | Shadow token factory                      |
| `utils/createLightTheme.js`              | Full light theme composition              |
| `global/typographyStyles.js`             | Named type style composites               |

### Export Workflow (manual)
1. Open Figma file → Plugins → Fluent Tokens Exporter
2. Select variable collection and mode (Light / Dark)
3. Export as JSON → place in `scripts/figma-tokens/`
4. Run `node scripts/transform-tokens.js` to regenerate this file

### Auto-Sync (Optional)
Configure GitHub Action to pull tokens via `@fluentui/tokens` npm on schedule.
Pin the version in `package.json` and run `node scripts/transform-tokens.js` in CI.
