import type { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { menuItemToneClasses, menuSubmenuToneClasses } from '../menu/menu-tone'

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

const contextMenuItemVariants = cva(
    'relative z-0 flex cursor-default items-center px-xs py-3xs style-text-default-0 transition-colors duration-100 outline-none select-none before:absolute before:inset-x-3xs before:inset-y-[0px] before:z-[-1] before:rounded-md before:bg-transparent before:transition-colors before:duration-100 before:content-[""] hover:cursor-pointer',
    {
      defaultVariants: {
        tone: 'neutral',
      },
      variants: {
        tone: menuItemToneClasses,
      },
    },
  ),
  contextMenuSubmenuTriggerVariants = cva(
    'relative z-0 flex cursor-default items-center px-xs py-3xs style-text-default-0 transition-colors duration-100 outline-none select-none before:absolute before:inset-x-3xs before:inset-y-[0px] before:z-[-1] before:rounded-md before:bg-transparent before:transition-colors before:duration-100 before:content-[""] hover:cursor-pointer',
    {
      defaultVariants: {
        tone: 'neutral',
      },
      variants: {
        tone: menuSubmenuToneClasses,
      },
    },
  )

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
