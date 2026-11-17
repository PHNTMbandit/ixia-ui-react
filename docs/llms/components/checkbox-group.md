# Checkbox Group

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

Checkbox Group manages shared selection state for multiple checkbox items. It is useful for preference panels, filters, and nested permission editors, and supports advanced patterns such as parent checkboxes and indeterminate sub-groups via `allValues`, `value`, and `onValueChange`. Child checkboxes can use either `elevated` or `inSurface` variants depending on container density.

## Import

```tsx
import { CheckboxGroup } from 'ixia-ui-react/checkbox-group'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `allValues`: Optional list of all child values used for parent or indeterminate patterns.
- `defaultValue`: Initial selected values for uncontrolled groups. Storybook-reported default: `[]`.

## Runtime exports

- `CheckboxGroup`

## Type exports

- `CheckboxGroupProps`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/checkbox-group/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/checkbox-group/checkbox-group.stories.tsx)
- [Getting started](../guides/getting-started.md)
