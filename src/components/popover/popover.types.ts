import { Popover as BasePopover } from '@base-ui/react/popover'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import type { Button } from '..'

const popoverPanelVariants = cva(
    'relative z-99 h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) overflow-hidden rounded-2xl text-on-surface transition-[width,height,opacity,scale] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-90 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-90 data-starting-style:opacity-0',
    {
      defaultVariants: {
        elevation: 'medium',
      },
      variants: {
        elevation: {
          high: 'bg-surface-3 shadow-lg',
          low: 'bg-surface shadow-sm',
          medium: 'bg-surface-2 shadow-md',
        },
      },
    },
  ),
  popoverHandle = BasePopover.createHandle<React.ComponentType>()

type PopoverProps = React.ComponentProps<typeof BasePopover.Root>
type PopoverTriggerProps = React.ComponentProps<typeof BasePopover.Trigger>
type PopoverPanelProps = React.ComponentProps<typeof BasePopover.Positioner> &
  VariantProps<typeof popoverPanelVariants>
type PopoverTitleProps = React.ComponentProps<typeof BasePopover.Title>
type PopoverDescriptionProps = React.ComponentProps<typeof BasePopover.Description>
type PopoverHeaderProps = React.ComponentProps<'div'>
type PopoverContentProps = React.ComponentProps<'div'>
type PopoverButtonProps = React.ComponentProps<typeof Button>

export type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverPanelProps,
  PopoverTitleProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverContentProps,
  PopoverButtonProps,
}
export { popoverHandle, popoverPanelVariants }
