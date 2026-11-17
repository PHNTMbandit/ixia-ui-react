# Badge

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Badge component conveys small pieces of information, such as statuses, categories, or counts. It supports seven semantic tones and three visual variants (`fill`, `outline`, `soft`). The two sizes (`large`, `medium`) work for both text and icon-only content. A single SVG child automatically becomes square and padding-free, preserving the compact icon dimensions.

## Import

```tsx
import { Badge } from 'ixia-ui-react/badge'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `size`: Shared size for text and icon-only badges. A single SVG child automatically receives square, padding-free styling. Options: `large`, `medium`.
- `tone`: Sets the semantic tone and color of the badge. Options: `brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`. Storybook-reported default: `brand`.
- `variant`: Sets the visual style: solid fill, bordered, or soft container. Options: `fill`, `outline`, `soft`. Storybook-reported default: `fill`.

## Runtime exports

- `Badge`

## Type exports

- `BadgeProps`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/badge/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/badge/badge.stories.tsx)
- [Getting started](../guides/getting-started.md)
