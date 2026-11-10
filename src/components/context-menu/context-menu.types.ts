import type { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { menuItemBaseClasses, menuItemToneClasses, menuSubmenuToneClasses } from '../menu/menu-tone'

type ContextMenuProps = React.ComponentProps<typeof BaseContextMenu.Root>
type ContextMenuTriggerProps = React.ComponentProps<typeof BaseContextMenu.Trigger>
type ContextMenuPopupProps = React.ComponentProps<typeof BaseContextMenu.Popup>
type ContextMenuSeparatorProps = React.ComponentProps<typeof BaseContextMenu.Separator>
type ContextMenuSubmenuProps = React.ComponentProps<typeof BaseContextMenu.SubmenuRoot>
type ContextMenuShortcutProps = React.ComponentProps<'div'>
type ContextMenuGroupProps = React.ComponentProps<typeof BaseContextMenu.Group>
type ContextMenuGroupLabelProps = React.ComponentProps<typeof BaseContextMenu.GroupLabel>
type ContextMenuCheckboxItemProps = React.ComponentProps<typeof BaseContextMenu.CheckboxItem> &
  VariantProps<typeof contextMenuItemVariants>
type ContextMenuRadioItemProps = React.ComponentProps<typeof BaseContextMenu.RadioItem> &
  VariantProps<typeof contextMenuItemVariants>
type ContextMenuRadioGroupProps = React.ComponentProps<typeof BaseContextMenu.RadioGroup>

const contextMenuItemVariants = cva(`flex ${menuItemBaseClasses}`, {
    defaultVariants: {
      tone: 'neutral',
    },
    variants: {
      tone: menuItemToneClasses,
    },
  }),
  contextMenuSubmenuTriggerVariants = cva(`flex ${menuItemBaseClasses}`, {
    defaultVariants: {
      tone: 'neutral',
    },
    variants: {
      tone: menuSubmenuToneClasses,
    },
  })

type ContextMenuItemProps = React.ComponentProps<typeof BaseContextMenu.Item> &
  VariantProps<typeof contextMenuItemVariants>

type ContextMenuSubmenuTriggerProps = React.ComponentProps<typeof BaseContextMenu.SubmenuTrigger> &
  VariantProps<typeof contextMenuSubmenuTriggerVariants>

export type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuPopupProps,
  ContextMenuSeparatorProps,
  ContextMenuSubmenuProps,
  ContextMenuShortcutProps,
  ContextMenuGroupProps,
  ContextMenuGroupLabelProps,
  ContextMenuCheckboxItemProps,
  ContextMenuRadioItemProps,
  ContextMenuRadioGroupProps,
  ContextMenuItemProps,
  ContextMenuSubmenuTriggerProps,
}
export { contextMenuItemVariants, contextMenuSubmenuTriggerVariants }
