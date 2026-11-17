# Radio Group

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Radio Group component lets users choose one value from a list of options. Use `RadioGroup` as the state container and compose each option with `Radio`. This pattern works well for forms, filters, and settings where exactly one choice is required. Radio items support visual variants (`elevated` and `inSurface`) for different surface contexts.

## Import

```tsx
import { RadioGroup } from 'ixia-ui-react/radio-group'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `defaultValue`: Initial selected value when the component is uncontrolled. Storybook-reported default: `option1`.
- `disabled`: Disables all radio options in the group. Storybook-reported default: `false`.
- `name`: Shared field name used for form submission.
- `required`: Marks the group as required in form contexts. Storybook-reported default: `false`.

## Runtime exports

- `Radio`
- `RadioGroup`

## Type exports

- `RadioGroupProps`
- `RadioProps`

## Compound parts

### RadioGroup

- `RadioGroup.Radio`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/radio-group/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/radio-group/radio-group.stories.tsx)
- [Getting started](../guides/getting-started.md)
