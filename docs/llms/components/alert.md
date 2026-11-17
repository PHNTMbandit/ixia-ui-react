# Alert

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Alert component is a specialized container for displaying time-sensitive or important messages. It supports seven semantic tones (`brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`) and can optionally include a leading icon and action buttons via the `AlertActions` slot.

## Import

```tsx
import { Alert } from 'ixia-ui-react/alert'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `tone`: Sets the semantic tone and styling of the alert. Options: `brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`. Storybook-reported default: `brand`.

## Runtime exports

- `AlertDescription`
- `AlertTitle`
- `AlertAction`
- `AlertIcon`
- `Alert`

## Type exports

- `AlertActionProps`
- `AlertDescriptionProps`
- `AlertIconProps`
- `AlertProps`
- `AlertTitleProps`

## Compound parts

### Alert

- `Alert.Action`
- `Alert.Description`
- `Alert.Icon`
- `Alert.Title`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/alert/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/alert/alert.stories.tsx)
- [Getting started](../guides/getting-started.md)
