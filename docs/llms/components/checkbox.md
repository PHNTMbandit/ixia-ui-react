# Checkbox

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Checkbox component supports binary and partial selection states for forms, filters, and settings. It pairs a styled checkbox control with an optional external label, supports disabled and indeterminate states, and provides two visual variants: `elevated` (default) and `inSurface`.

## Import

```tsx
import { Checkbox } from 'ixia-ui-react/checkbox'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `checked`: Controlled checked state for the checkbox root.
- `disabled`: Disables interaction and associated label click behavior. Storybook-reported default: `false`.
- `indeterminate`: Displays the indeterminate indicator for partial selection states.
- `variant`: Visual variant of the checkbox. Options: `elevated`, `inSurface`. Storybook-reported default: `elevated`.

## Runtime exports

- `CheckboxIndicator`
- `Checkbox`

## Type exports

- `CheckboxIndicatorProps`
- `CheckboxRootProps`

## Compound parts

### Checkbox

- `Checkbox.Indicator`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/checkbox/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/checkbox/checkbox.stories.tsx)
- [Getting started](../guides/getting-started.md)
