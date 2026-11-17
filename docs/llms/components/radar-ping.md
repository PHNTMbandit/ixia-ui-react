# Radar Ping

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The RadarPing renders an absolutely-positioned pulsing dot anchored to the top-right corner of its relative container. It is well-suited for notification badges, unread indicators, and live-status signals. Use `tone` to communicate semantic intent, `size` to align with the parent element, `hidePing` to suppress the animation, and `children` to display a numeric count inside the dot.

## Import

```tsx
import { RadarPing } from 'ixia-ui-react/radar-ping'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `children`: Optional count or label rendered inside the dot (e.g. notification count).
- `hidePing`: Suppresses the pulsing animation, showing only the static dot. Storybook-reported default: `false`.
- `size`: Controls the badge dot, text size, and offset from its anchor element. Options: `small`, `medium`, `large`. Storybook-reported default: `medium`.
- `tone`: Semantic color applied to the dot and its pulsing animation. Options: `brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`. Storybook-reported default: `brand`.

## Runtime exports

- `RadarPing`

## Type exports

- `RadarPingProps`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/radar-ping/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/radar-ping/radar-ping.stories.tsx)
- [Getting started](../guides/getting-started.md)
