# Icon Container

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

IconContainer pairs an icon with a semantic background and foreground tone. Use it beside alert text, in empty states, or at the start of a feature card. It is a non-interactive div, not an icon button or a full alert.

Pass the icon as a direct child so the size styles reach its SVG. Sizes use the same outer spacing tokens as Avatar: small uses xl, medium uses 2xl, and large uses 3xl. Their icons use lg, xl, and 2xl respectively.

When adjacent text already explains the icon, mark the container aria-hidden. For a standalone meaningful icon, give the container role="img" and an aria-label, and hide the SVG itself. Do not rely on color alone to communicate status.

```tsx
<IconContainer tone="success" size="medium" aria-hidden="true">
  <CheckCircleIcon weight="bold" />
</IconContainer>
```

## Import

```tsx
import { IconContainer } from 'ixia-ui-react/icon-container'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `children`: An icon rendered as a direct child. Direct SVG children inherit the tone and receive the matching icon size.
- `tone`: Semantic background and foreground color pair. Options: `brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`. Storybook-reported default: `brand`.
- `shape`: Circular (rounded) or sharp-cornered (square) background. Options: `rounded`, `square`. Storybook-reported default: `rounded`.
- `size`: Scales both the background and its direct SVG child using spacing tokens. Options: `small`, `medium`, `large`. Storybook-reported default: `medium`.

## Runtime exports

- `IconContainer`

## Type exports

- `IconContainerProps`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/icon-container/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/icon-container/icon-container.stories.tsx)
- [Getting started](../guides/getting-started.md)
