# Button

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Button component is the primary action trigger across the interface. It supports six visual variants (`fill`, `secondary`, `outline`, `ghost`, `elevated`, `link`), seven semantic tones (`brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`), and four sizes (`large`, `medium`, `small`, `extraSmall`). Secondary is a borderless, lower-emphasis fill using the ghost hover tint at rest. Tailwind automatically makes buttons with a single SVG child square and padding-free; use the same size for text and icon-only buttons. Icon-only buttons must have an accessible label.

## Import

```tsx
import { Button } from 'ixia-ui-react/button'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `children`: Button label. Omit the label for an icon-only button and provide an aria-label.
- `disabled`: Disables interaction and applies disabled styling. Storybook-reported default: `false`.
- `size`: Controls the button height, padding, and icon size. A single SVG child automatically receives square, padding-free styling. Options: `large`, `medium`, `small`, `extraSmall`. Storybook-reported default: `medium`.
- `tone`: Applies the semantic color tone for the action. Options: `brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`. Storybook-reported default: `brand`.
- `variant`: Controls the visual treatment of the button. Options: `fill`, `secondary`, `outline`, `ghost`, `elevated`, `link`. Storybook-reported default: `fill`.

## Runtime exports

- `Button`

## Type exports

- `ButtonExtendedProps`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/button/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/button/button.stories.tsx)
- [Getting started](../guides/getting-started.md)
