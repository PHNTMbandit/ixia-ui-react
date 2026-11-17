# Resizeable

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Resizeable components are built for creating split-pane interfaces such as dashboards, editors, and tool workspaces. `ResizeablePanelGroup` defines the layout axis, `ResizeablePanel` contains content, and `ResizeableHandle` allows drag resizing between panels. You can use horizontal or vertical orientation, optional grip handles, and nested groups for IDE-style layouts.

## Import

```tsx
import { ResizeableHandle } from 'ixia-ui-react/resizeable'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `orientation`: Axis used to lay out and resize child panels. Options: `horizontal`, `vertical`. Storybook-reported default: `horizontal`.

## Runtime exports

- `ResizeableHandle`
- `ResizeablePanel`
- `ResizeablePanelGroup`

## Type exports

- `ResizeableHandleProps`
- `ResizeablePanelGroupProps`
- `ResizeablePanelProps`

## Optional peer dependencies

`react-resizable-panels`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/resizeable/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/resizeable/resizeable.stories.tsx)
- [Getting started](../guides/getting-started.md)
