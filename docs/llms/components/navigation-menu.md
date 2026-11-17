# Navigation Menu

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

A collection of links and menus for website navigation, built on top of
[Base UI NavigationMenu](https://base-ui.com/react/components/navigation-menu).

**Anatomy**

```
<NavigationMenu>           — Root <nav>
  <NavigationMenuList>     — <ul> of items
    <NavigationMenuItem>   — <li>
      <NavigationMenuTrigger>
        <NavigationMenuIcon />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuContentLink />
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about" />
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuPopup />  — Shared floating popup (Portal → Positioner → Popup → Viewport)
</NavigationMenu>
```

> **Important:** `<NavigationMenuPopup />` must be placed **outside** of
> `<NavigationMenuList>` as a sibling. It is shared across all items in the list.

Use `NavigationMenu.Link` for top-level navigation without a popup. It renders an anchor
and supports `href`, `active`, `render` (for router links), and `closeOnClick`.
`NavigationMenu.ContentLink` is a non-interactive `<div>` card for content inside the popup.

## Import

```tsx
import { NavigationMenu } from 'ixia-ui-react/navigation-menu'
```

## Runtime exports

- `NavigationMenuContent`
- `NavigationMenuContentLink`
- `NavigationMenuIcon`
- `NavigationMenuItem`
- `NavigationMenuLink`
- `NavigationMenuList`
- `NavigationMenuPopup`
- `NavigationMenuTrigger`
- `NavigationMenu`

## Type exports

- `NavigationMenuContentLinkProps`
- `NavigationMenuContentProps`
- `NavigationMenuIconProps`
- `NavigationMenuItemProps`
- `NavigationMenuLinkProps`
- `NavigationMenuListProps`
- `NavigationMenuPopupProps`
- `NavigationMenuProps`
- `NavigationMenuTriggerProps`

## Compound parts

### NavigationMenu

- `NavigationMenu.Content`
- `NavigationMenu.ContentLink`
- `NavigationMenu.Icon`
- `NavigationMenu.Item`
- `NavigationMenu.Link`
- `NavigationMenu.List`
- `NavigationMenu.Popup`
- `NavigationMenu.Trigger`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/navigation-menu/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/navigation-menu/navigation-menu.stories.tsx)
- [Getting started](../guides/getting-started.md)
