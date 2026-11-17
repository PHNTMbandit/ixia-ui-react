# Number Field

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Number Field component supports typed input, increment/decrement controls, and scrub-area dragging for fast numeric adjustments. Use `min`, `max`, and `step` to constrain value behavior and `format` for localized display (such as currency). The field automatically enters an invalid visual state when the current value is below `min` or above `max`, with optional manual override via `aria-invalid`.

## Import

```tsx
import { NumberField } from 'ixia-ui-react/number-field'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `aria-invalid`: Manual invalid override. The field also auto-invalidates when value is out of min/max bounds.
- `defaultValue`: Initial value used for uncontrolled usage.
- `disabled`: Disables manual input, scrubbing, and stepper controls.
- `label`: Optional label displayed in the scrub area above the input group.
- `max`: Maximum allowed numeric value.
- `min`: Minimum allowed numeric value.
- `size`: Controls the input and stepper height scale. Options: `small`, `medium`, `large`. Storybook-reported default: `medium`.
- `step`: Step size applied when pressing increment/decrement controls.

## Runtime exports

- `NumberField`

## Type exports

- `NumberFieldTypesProps`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/number-field/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/number-field/number-field.stories.tsx)
- [Getting started](../guides/getting-started.md)
