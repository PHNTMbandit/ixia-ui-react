# Progress

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Progress component helps represent multi-step workflows such as onboarding, checkout, and setup flows. Compose steps with `ProgressIndicator` and connectors with `ProgressBar`, then control the highlighted state with `currentIndex`. Indicators support optional titles and descriptions for richer guidance.

## Import

```tsx
import { Progress } from 'ixia-ui-react/progress'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `currentIndex`: Current active step index (1-based). Storybook-reported default: `1`.

## Runtime exports

- `ProgressBar`
- `ProgressDescription`
- `ProgressIndicator`
- `ProgressLabel`
- `ProgressTitle`
- `Progress`

## Type exports

- `ProgressBarProps`
- `ProgressDescriptionProps`
- `ProgressIndicatorProps`
- `ProgressLabelProps`
- `ProgressProps`
- `ProgressTitleProps`

## Compound parts

### Progress

- `Progress.Bar`
- `Progress.Description`
- `Progress.Indicator`
- `Progress.Label`
- `Progress.Title`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/progress/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/progress/progress.stories.tsx)
- [Getting started](../guides/getting-started.md)
