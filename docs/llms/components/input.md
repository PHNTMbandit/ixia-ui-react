# Input

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Input component is a foundational form control for entering text and selecting colors. Text inputs and the regular color picker support `primary`, `secondary`, `ghost`, and `outline` visual variants. Text inputs also support invalid styling via `aria-invalid` and disabled states.

## Import

```tsx
import { Input } from 'ixia-ui-react/input'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `disabled`: Disables interaction and applies disabled styling. Storybook-reported default: `false`.
- `size`: Adjusts the height, padding, and typography of the input. Options: `small`, `medium`, `large`. Storybook-reported default: `medium`.
- `type`: Native input type. Options: `text`, `email`, `password`, `search`, `url`, `tel`, `color`. Storybook-reported default: `text`.
- `variant`: Controls the visual surface style of the input. Options: `primary`, `secondary`, `ghost`, `outline`. Storybook-reported default: `primary`.

## Runtime exports

- `Input`

## Type exports

- `InputProps`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/input/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/input/input.stories.tsx)
- [Getting started](../guides/getting-started.md)
