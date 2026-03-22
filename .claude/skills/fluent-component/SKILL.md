---
name: fluent-component
description: >
  How to build a Fluent UI v9 React component. Use when creating
  any new component, feature, or prototype screen. Covers file
  structure, makeStyles, props, state handling, Field wrapping,
  accessibility, and implementation checklists.
user-invocable: true
---

# Skill: Build a Fluent UI v9 Component

## Step 1: Classify & Scaffold

| Type      | Structure                                        |
|-----------|--------------------------------------------------|
| Primitive | `src/components/Name/Name.tsx + Name.styles.ts + index.ts` |
| Composite | Same as primitive, composes multiple Fluent parts |
| Feature   | `src/features/Name/Name.tsx + components/ + hooks/ + types.ts` |
| Layout    | `src/layouts/Name/Name.tsx + Name.styles.ts`     |

## Step 2: Write Styles First

```typescript
// Name.styles.ts
import { makeStyles, tokens, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
  },
  loading: { opacity: 0.6, pointerEvents: "none" },
  error: { borderColor: tokens.colorStatusDangerBorder1 },
  disabled: { opacity: 0.4, pointerEvents: "none", cursor: "not-allowed" },
});
```

**RULES:**
- ALL values use tokens — never raw hex, px, or string literals
- NEVER inline styles on JSX
- Use `mergeClasses()` for conditional class composition
- Separate `.styles.ts` file — never co-locate styles in component file
- Use `@media` queries inside makeStyles for responsive behavior

## Step 3: Component Template

```typescript
// Name.tsx
import React from "react";
import { Button, Text, Spinner, MessageBar, MessageBarBody,
         MessageBarActions, mergeClasses } from "@fluentui/react-components";
import { useStyles } from "./Name.styles";

export interface NameProps {
  title: string;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const Name: React.FC<NameProps> = ({
  title, isLoading = false, error = null, onRetry,
}) => {
  const styles = useStyles();

  if (isLoading) {
    return (
      <div className={styles.root} role="status" aria-label="Loading">
        <Spinner size="medium" label="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.root}>
        <MessageBar intent="error">
          <MessageBarBody>{error}</MessageBarBody>
          {onRetry && (
            <MessageBarActions>
              <Button onClick={onRetry} size="small">Retry</Button>
            </MessageBarActions>
          )}
        </MessageBar>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Text as="h2" size={500} weight="semibold">{title}</Text>
    </div>
  );
};
```

## Step 4: Form Components — ALWAYS Use Field

```typescript
<Field
  label="Email address"
  validationMessage={error ?? undefined}
  validationState={error ? "error" : "none"}
  required
>
  <Input
    value={value}
    onChange={(_, data) => setValue(data.value)}
    type="email"
  />
</Field>
```

NEVER render `<Input>`, `<Textarea>`, `<Combobox>`, `<Dropdown>`,
`<DatePicker>`, `<Switch>`, `<Checkbox>`, `<RadioGroup>`, `<Slider>`,
or `<SpinButton>` without wrapping in `<Field>`.

## Step 5: State Coverage

Every component MUST handle:
- **Default** — data loaded, interactive
- **Loading** — Skeleton or Spinner with `role="status"` + `aria-label`
- **Error** — MessageBar with retry action
- **Empty** — message + CTA
- **Disabled** — visual + `aria-disabled="true"` + `pointerEvents: "none"`

If a state doesn't apply, comment why in code.

## Step 6: Self-Check Before Presenting

- [ ] No raw hex colors — all tokens
- [ ] No inline styles — all makeStyles
- [ ] No webLightTheme — custom theme only
- [ ] All inputs in `<Field>`
- [ ] All interactives keyboard-accessible
- [ ] All 5 states handled
- [ ] TypeScript interface for props
- [ ] Named export only
- [ ] Styles in .styles.ts
- [ ] design-language.md Section 5 checked for overrides

## Common Patterns

### Responsive
```typescript
root: {
  padding: tokens.spacingHorizontalXXXL,
  "@media (max-width: 768px)": { padding: tokens.spacingHorizontalL },
  "@media (max-width: 480px)": { padding: tokens.spacingHorizontalM },
}
```

### Focus management
```typescript
const triggerRef = React.useRef<HTMLButtonElement>(null);
const handleDismiss = () => { setOpen(false); triggerRef.current?.focus(); };
```

### aria-live updates
```tsx
<div aria-live="polite" aria-atomic="true">
  {count > 0 && <span>{count} items selected</span>}
</div>
```
