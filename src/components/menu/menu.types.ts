import type { Menu as BaseMenu } from '@base-ui/react/menu'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

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
    'relative z-0 flex h-lg cursor-default items-center px-xs style-text-default-0 transition-colors duration-100 outline-none select-none before:absolute before:inset-x-3xs before:inset-y-[0px] before:z-[-1] before:rounded-md before:bg-transparent before:transition-colors before:duration-100 before:content-[""] hover:cursor-pointer',
    {
      defaultVariants: {
        tone: 'neutral',
      },
      variants: {
        tone: {
          accent:
            'text-accent-default data-highlighted:text-accent-on-container data-highlighted:before:bg-accent-container',
          brand:
            'text-brand-default data-highlighted:text-brand-on-container data-highlighted:before:bg-brand-container',
          error:
            'text-error-default data-highlighted:text-error-on-container data-highlighted:before:bg-error-container',
          info: 'text-info-default data-highlighted:text-info-on-container data-highlighted:before:bg-info-container',
          neutral:
            'text-on-surface data-highlighted:text-neutral-on-container data-highlighted:before:bg-neutral-container-high',
          success:
            'text-success-default data-highlighted:text-success-on-container data-highlighted:before:bg-success-container',
          warning:
            'text-warning-default data-highlighted:text-warning-on-container data-highlighted:before:bg-warning-container',
        },
      },
    },
  ),
  menuSubmenuTriggerVariants = cva(
    'relative z-0 grid h-lg cursor-default grid-cols-[1fr_2rem] items-center px-xs style-text-default-0 transition-colors duration-100 outline-none select-none before:absolute before:inset-x-3xs before:inset-y-[0px] before:z-[-1] before:rounded-md before:transition-colors before:duration-100 before:content-[""] hover:cursor-pointer',
    {
      defaultVariants: {
        tone: 'neutral',
      },
      variants: {
        tone: {
          accent:
            'text-accent-default data-highlighted:text-accent-on-container data-highlighted:before:bg-accent-container data-popup-open:text-accent-on-container data-popup-open:before:bg-accent-container data-highlighted:data-popup-open:before:bg-accent-container',
          brand:
            'text-brand-default data-highlighted:text-brand-on-container data-highlighted:before:bg-brand-container data-popup-open:text-brand-on-container data-popup-open:before:bg-brand-container data-highlighted:data-popup-open:before:bg-brand-container',
          error:
            'text-error-default data-highlighted:text-error-on-container data-highlighted:before:bg-error-container data-popup-open:text-error-on-container data-popup-open:before:bg-error-container data-highlighted:data-popup-open:before:bg-error-container',
          info: 'text-info-default data-highlighted:text-info-on-container data-highlighted:before:bg-info-container data-popup-open:text-info-on-container data-popup-open:before:bg-info-container data-highlighted:data-popup-open:before:bg-info-container',
          neutral:
            'text-on-surface data-highlighted:text-neutral-on-container data-highlighted:before:bg-neutral-container-high data-popup-open:text-neutral-on-container data-popup-open:before:bg-neutral-container-high data-highlighted:data-popup-open:before:bg-neutral-container-high',
          success:
            'text-success-default data-highlighted:text-success-on-container data-highlighted:before:bg-success-container data-popup-open:text-success-on-container data-popup-open:before:bg-success-container data-highlighted:data-popup-open:before:bg-success-container',
          warning:
            'text-warning-default data-highlighted:text-warning-on-container data-highlighted:before:bg-warning-container data-popup-open:text-warning-on-container data-popup-open:before:bg-warning-container data-highlighted:data-popup-open:before:bg-warning-container',
        },
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
