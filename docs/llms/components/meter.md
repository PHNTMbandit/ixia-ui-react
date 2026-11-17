# Meter

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Meter component visualizes bounded values such as upload progress, quota usage, battery levels, and background task completion. It supports vertical and horizontal layouts, three track sizes (`small`, `medium`, `large`), and semantic tones (`brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`). Compose it with `MeterHeader`, `MeterLabel`, and `MeterValue` to build informative status UIs.

## Import

```tsx
import { Meter } from 'ixia-ui-react/meter'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `max`: Upper bound used when calculating value percentage. Storybook-reported default: `100`.
- `min`: Lower bound used when calculating value percentage. Storybook-reported default: `0`.
- `orientation`: Layout direction of meter content and track. Options: `vertical`, `horizontal`. Storybook-reported default: `vertical`.
- `size`: Visual thickness of the meter track. Options: `small`, `medium`, `large`. Storybook-reported default: `medium`.
- `tone`: Semantic color of the meter indicator. Options: `brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`. Storybook-reported default: `brand`.
- `value`: Current progress value displayed by the meter. Storybook-reported default: `25`.

## Runtime exports

- `MeterHeader`
- `MeterIndicator`
- `MeterLabel`
- `MeterTrack`
- `MeterValue`
- `MeterFooter`
- `MeterSubtitle`
- `Meter`

## Type exports

- `MeterHeaderProps`
- `MeterIndicatorProps`
- `MeterLabelProps`
- `MeterProps`
- `MeterTrackProps`
- `MeterValueProps`
- `MeterFooterProps`
- `MeterSubtitleProps`

## Compound parts

### Meter

- `Meter.Footer`
- `Meter.Header`
- `Meter.Indicator`
- `Meter.Label`
- `Meter.Subtitle`
- `Meter.Track`
- `Meter.Value`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/meter/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/meter/meter.stories.tsx)
- [Getting started](../guides/getting-started.md)
