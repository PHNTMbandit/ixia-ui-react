# Sidebar

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

Sidebar is a layout-aware navigation surface built from composable primitives such as groups, menu items, badges, and collapsible sections. Pair `SidebarProvider` with `Sidebar` to control side placement and collapse mode (`icon`, `offcanvas`, `none`). Use `SidebarToggle` to expose runtime control in app-shell layouts. Closed offcanvas sidebars (including mobile) hide their contents and remove them from keyboard navigation and the accessibility tree; desktop icon-collapse mode remains interactive.

## Import

```tsx
import { Sidebar } from 'ixia-ui-react/sidebar'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `width`: Expanded sidebar width in pixels. Storybook-reported default: `400`.

## Runtime exports

- `SidebarContent`
- `SidebarFooter`
- `SidebarGroup`
- `SidebarGroupContent`
- `SidebarGroupLabel`
- `SidebarHeader`
- `SidebarInset`
- `SidebarMenu`
- `SidebarProvider`
- `useSidebar`
- `SidebarToggle`
- `SidebarMenuBadge`
- `SidebarMenuButton`
- `SidebarMenuCollapsible`
- `SidebarMenuCollapsiblePanel`
- `SidebarMenuCollapsibleTrigger`
- `SidebarMenuItem`
- `getStoredSidebarOpen`
- `Sidebar`

## Type exports

- `SidebarContentProps`
- `SidebarFooterProps`
- `SidebarGroupContentProps`
- `SidebarGroupLabelProps`
- `SidebarGroupProps`
- `SidebarHeaderProps`
- `SidebarInsetProps`
- `SidebarMenuButtonProps`
- `SidebarMenuProps`
- `SidebarProps`
- `SidebarToggleProps`
- `SidebarMenuBadgeProps`
- `SidebarMenuCollapsiblePanelProps`
- `SidebarMenuCollapsibleProps`
- `SidebarMenuCollapsibleTriggerProps`
- `SidebarMenuItemProps`

## Compound parts

### Sidebar

- `Sidebar.Content`
- `Sidebar.Footer`
- `Sidebar.Group`
- `Sidebar.GroupContent`
- `Sidebar.GroupLabel`
- `Sidebar.Header`
- `Sidebar.Inset`
- `Sidebar.Menu`
- `Sidebar.MenuBadge`
- `Sidebar.MenuButton`
- `Sidebar.MenuCollapsible`
- `Sidebar.MenuCollapsiblePanel`
- `Sidebar.MenuCollapsibleTrigger`
- `Sidebar.MenuItem`
- `Sidebar.Provider`
- `Sidebar.Toggle`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/sidebar/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/sidebar/sidebar.stories.tsx)
- [Getting started](../guides/getting-started.md)
