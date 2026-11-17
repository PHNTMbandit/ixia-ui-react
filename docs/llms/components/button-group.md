# Button Group

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Button Group component combines related buttons into one cohesive unit. Button children inherit size, tone, and variant unless explicitly overridden. Native buttons and links rendered with Button render receive the same styling; use nativeButton={false} for links. Disabled links use aria-disabled styling and cannot activate. Icon-only buttons automatically become square and padding-free. It supports multiple variants, tones, and orientations.

## Import

```tsx
import { ButtonGroup } from 'ixia-ui-react/button-group'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `orientation`: Lays out the group horizontally or vertically. Options: `horizontal`, `vertical`. Storybook-reported default: `horizontal`.
- `size`: Controls child button height, padding, and icon sizing. Icon-only children automatically become square with no padding. Options: `large`, `medium`, `small`, `extraSmall`. Storybook-reported default: `medium`.
- `tone`: Applies a semantic tone across the entire group. Options: `brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`. Storybook-reported default: `brand`.
- `variant`: Controls the shared visual style of the grouped buttons. Options: `fill`, `secondary`, `outline`, `ghost`, `elevated`. Storybook-reported default: `fill`.

## Runtime exports

- `ButtonGroup`

## Type exports

- `ButtonGroupProps`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/button-group/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/button-group/button-group.stories.tsx)
- [Getting started](../guides/getting-started.md)
