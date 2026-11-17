# Layer Tree

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Layer Tree component displays hierarchical data using TanStack Table. It supports:

- **Drag-and-drop** reordering between folders
- **Expandable/collapsible** folder nodes
- **Search filtering** across the tree
- **Custom toggle columns** (e.g., visibility, lock state)

The component is data-agnostic—you provide your own data structure with `id` and optional `children` fields. Use the exported utility functions (`moveLayerTreeNode`, `removeLayerTreeNode`, etc.) or bring your own logic for tree manipulation.

## Import

```tsx
import { LayerTree } from 'ixia-ui-react/layer-tree'
```

## Runtime exports

- `createLayerTreeColumnHelper`
- `useLayerTreeTable`
- `useLayerTreeCellContext`
- `useLayerTreeHeaderContext`
- `useLayerTreeContext`
- `layerTreeFeatures`
- `LayerTree`
- `useLayerTree`
- `LayerTreeBody`
- `LayerTreeExpandAll`
- `LayerTreeFooter`
- `LayerTreeIconCell`
- `LayerTreeLockedAll`
- `LayerTreeLockedCell`
- `LayerTreeTextCell`
- `LayerTreeTriggerCell`
- `LayerTreeRow`
- `LayerTreeSearch`
- `LayerTreeSort`
- `LayerTreeVisibilityAll`
- `LayerTreeVisibilityCell`
- `LayerTreeNodeIcon`
- `findLayerTreeNode`
- `insertLayerTreeNode`
- `moveLayerTreeNode`
- `moveLayerTreeNodeToRoot`
- `removeLayerTreeNode`
- `rowLockedFeature`
- `rowVisibilityFeature`

## Type exports

- `LayerTreeBodyProps`
- `LayerTreeColumnMeta`
- `LayerTreeExpandAllProps`
- `LayerTreeFooterProps`
- `LayerTreeIconCellProps`
- `LayerTreeLockedAllProps`
- `LayerTreeLockedCellProps`
- `LayerTreeTextCellProps`
- `LayerTreeProps`
- `LayerTreeRowProps`
- `LayerTreeSearchProps`
- `LayerTreeSortProps`
- `LayerTreeTableMeta`
- `LayerTreeTriggerCellProps`
- `LayerTreeVisibilityAllProps`
- `LayerTreeVisibilityCellProps`
- `RowLockedState`
- `RowVisibilityState`
- `LayerTreeNodeIconProps`
- `LayerTreeNodeBase`

## Optional peer dependencies

`@tanstack/react-table` `@dnd-kit/react` `@dnd-kit/dom`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/layer-tree/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/layer-tree/layer-tree.stories.tsx)
- [Getting started](../guides/getting-started.md)
