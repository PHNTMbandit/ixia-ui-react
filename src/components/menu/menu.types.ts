import type { Menu as BaseMenu } from '@base-ui/react/menu'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { menuItemToneClasses, menuSubmenuToneClasses } from './menu-tone'

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

const menuItemVariants = cva(
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
  menuSubmenuTriggerVariants = cva(
    'relative z-0 grid cursor-default grid-cols-[1fr_2rem] items-center px-xs py-3xs style-text-default-0 transition-colors duration-100 outline-none select-none before:absolute before:inset-x-3xs before:inset-y-[0px] before:z-[-1] before:rounded-md before:transition-colors before:duration-100 before:content-[""] hover:cursor-pointer',
    {
      defaultVariants: {
        tone: 'neutral',
      },
      variants: {
        tone: menuSubmenuToneClasses,
      },
    },
  )

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
