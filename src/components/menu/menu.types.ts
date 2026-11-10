import type { Menu as BaseMenu } from '@base-ui/react/menu'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { menuItemBaseClasses, menuItemToneClasses, menuSubmenuToneClasses } from './menu-tone'

type MenuProps = React.ComponentProps<typeof BaseMenu.Root>
type MenuTriggerProps = React.ComponentProps<typeof BaseMenu.Trigger>
type MenuPopupProps = React.ComponentProps<typeof BaseMenu.Positioner>
type MenuSeparatorProps = React.ComponentProps<typeof BaseMenu.Separator>
type MenuCheckboxItemProps = React.ComponentProps<typeof BaseMenu.CheckboxItem>
type MenuRadioGroupProps = React.ComponentProps<typeof BaseMenu.RadioGroup>
type MenuRadioItemProps = React.ComponentProps<typeof BaseMenu.RadioItem>
type MenuGroupProps = React.ComponentProps<typeof BaseMenu.Group>
type MenuGroupLabelProps = React.ComponentProps<typeof BaseMenu.GroupLabel>
type MenuSubmenuProps = React.ComponentProps<typeof BaseMenu.SubmenuRoot>
type MenuShortcutProps = React.ComponentProps<'div'>

const menuItemVariants = cva(`flex ${menuItemBaseClasses}`, {
    defaultVariants: {
      tone: 'neutral',
    },
    variants: {
      tone: menuItemToneClasses,
    },
  }),
  menuSubmenuTriggerVariants = cva(`grid grid-cols-[1fr_0.75rem] ${menuItemBaseClasses}`, {
    defaultVariants: {
      tone: 'neutral',
    },
    variants: {
      tone: menuSubmenuToneClasses,
    },
  })

type MenuItemProps = React.ComponentProps<typeof BaseMenu.Item> &
  VariantProps<typeof menuItemVariants>
type MenuSubmenuTriggerProps = React.ComponentProps<typeof BaseMenu.SubmenuTrigger> &
  VariantProps<typeof menuSubmenuTriggerVariants>

export type {
  MenuProps,
  MenuTriggerProps,
  MenuPopupProps,
  MenuSeparatorProps,
  MenuCheckboxItemProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuGroupProps,
  MenuGroupLabelProps,
  MenuSubmenuProps,
  MenuShortcutProps,
  MenuItemProps,
  MenuSubmenuTriggerProps,
}
export { menuItemVariants, menuSubmenuTriggerVariants }
