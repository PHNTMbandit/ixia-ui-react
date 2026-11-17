# Drawer

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Drawer component presents supplementary content in a panel that slides in from the edge of the screen. It supports swipe-to-dismiss gestures on touch devices, modal or non-modal behavior, and integrates with the app layout via the Provider/Indent pattern for smooth push animations. Use drawers for settings panels, navigation menus, detail views, and multi-step flows that shouldn't replace the main content.

**Positioning:** Use the `swipeDirection` prop on `Drawer` to control which edge the drawer appears from: `right` (default), `left`, `down` (bottom sheet), or `up` (top sheet).

## Import

```tsx
import { Drawer } from 'ixia-ui-react/drawer'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `defaultOpen`: Whether the drawer is initially open in uncontrolled mode. Storybook-reported default: `false`.
- `disablePointerDismissal`: Prevents closing the drawer by clicking outside. Users must use the explicit close button. Storybook-reported default: `false`.
- `modal`: Whether the drawer should trap focus and block interaction with the rest of the page. Storybook-reported default: `true`.
- `showDescription`: Show the drawer description (story control only). Storybook-reported default: `true`.
- `showTitle`: Show the drawer title (story control only). Storybook-reported default: `true`.
- `swipeDirection`: The direction to swipe to dismiss the drawer, which also determines the edge it slides in from. `right` = right edge, `left` = left edge, `down` = bottom edge, `up` = top edge. Options: `right`, `left`, `up`, `down`. Storybook-reported default: `right`.

## Runtime exports

- `DrawerClose`
- `DrawerContent`
- `DrawerDescription`
- `DrawerProvider`
- `DrawerTrigger`
- `DrawerPopup`
- `DrawerTitle`
- `DrawerHeader`
- `Drawer`

## Type exports

- `DrawerProps`
- `DrawerCloseProps`
- `DrawerContentProps`
- `DrawerDescriptionProps`
- `DrawerProviderProps`
- `DrawerTriggerProps`
- `DrawerPopupProps`
- `DrawerTitleProps`
- `DrawerHeaderProps`

## Compound parts

### Drawer

- `Drawer.Close`
- `Drawer.Content`
- `Drawer.Description`
- `Drawer.Header`
- `Drawer.Popup`
- `Drawer.Provider`
- `Drawer.Title`
- `Drawer.Trigger`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/drawer/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/drawer/drawer.stories.tsx)
- [Getting started](../guides/getting-started.md)
