import type { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

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
  contextMenuSubmenuTriggerVariants = cva(
    'relative z-0 flex cursor-default items-center px-xs py-3xs style-text-default-0 transition-colors duration-100 outline-none select-none before:absolute before:inset-x-3xs before:inset-y-[0px] before:z-[-1] before:rounded-md before:bg-transparent before:transition-colors before:duration-100 before:content-[""] hover:cursor-pointer',
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
