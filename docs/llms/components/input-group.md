# Input Group

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

Input Group combines one editable input with optional addons (icons, text labels, shortcuts, spinners, and buttons) into a single cohesive control. It supports the same variants as Input (`primary`, `secondary`) and responds to invalid state using `aria-invalid`.

## Import

```tsx
import { InputGroup } from 'ixia-ui-react/input-group'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `aria-invalid`: Marks the group as invalid to trigger error state styling. Storybook-reported default: `false`.
- `variant`: Applies the same surface variant styles as the base Input component. Options: `primary`, `secondary`. Storybook-reported default: `primary`.

## Runtime exports

- `InputGroupAddon`
- `InputGroupInput`
- `InputGroupSeparator`
- `InputGroup`

## Type exports

- `InputGroupAddonProps`
- `InputGroupInputProps`
- `InputGroupProps`
- `InputGroupSeparatorProps`

## Compound parts

### InputGroup

- `InputGroup.Addon`
- `InputGroup.Input`
- `InputGroup.Separator`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/input-group/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/input-group/input-group.stories.tsx)
- [Getting started](../guides/getting-started.md)
