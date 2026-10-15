import { AlertDialog as BaseAlertDialog } from '@base-ui/react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import type { ButtonProps } from '../button/button.types'

const alertDialogVariants = cva(
    'fixed top-1/2 left-1/2 z-999 max-w-[lg(100vw-3rem)] min-w-1/3 -translate-1/2 space-y-md overflow-hidden rounded-3xl bg-surface-3 p-md transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0',
    {
      defaultVariants: {
        tone: 'brand',
      },
      variants: {
        tone: {
          accent:
            '[&_[data-slot=alert-dialog-confirm]]:bg-accent-default [&_[data-slot=alert-dialog-confirm]]:text-accent-on-default [&_[data-slot=alert-dialog-confirm]]:hover:bg-accent-muted [&_svg]:text-accent-default',
          brand:
            '[&_[data-slot=alert-dialog-confirm]]:bg-brand-default [&_[data-slot=alert-dialog-confirm]]:text-brand-on-default [&_[data-slot=alert-dialog-confirm]]:hover:bg-brand-muted [&_svg]:text-brand-default',
          error:
            '[&_[data-slot=alert-dialog-confirm]]:bg-error-default [&_[data-slot=alert-dialog-confirm]]:text-error-on-default [&_[data-slot=alert-dialog-confirm]]:hover:bg-error-muted [&_svg]:text-error-default',
          info: '[&_[data-slot=alert-dialog-confirm]]:bg-info-default [&_[data-slot=alert-dialog-confirm]]:text-info-on-default [&_[data-slot=alert-dialog-confirm]]:hover:bg-info-muted [&_svg]:text-info-default',
          neutral:
            '[&_[data-slot=alert-dialog-confirm]]:bg-neutral-default [&_[data-slot=alert-dialog-confirm]]:text-neutral-on-default [&_[data-slot=alert-dialog-confirm]]:hover:bg-neutral-muted [&_svg]:text-neutral-default',
          success:
            '[&_[data-slot=alert-dialog-confirm]]:bg-success-default [&_[data-slot=alert-dialog-confirm]]:text-success-on-default [&_[data-slot=alert-dialog-confirm]]:hover:bg-success-muted [&_svg]:text-success-default',
          warning:
            '[&_[data-slot=alert-dialog-confirm]]:bg-warning-default [&_[data-slot=alert-dialog-confirm]]:text-warning-on-default [&_[data-slot=alert-dialog-confirm]]:hover:bg-warning-muted [&_svg]:text-warning-default',
        },
      },
    },
  ),
  alertDialogHandle = BaseAlertDialog.createHandle<React.ComponentType>()

type AlertDialogProps = React.ComponentProps<typeof BaseAlertDialog.Root>
type AlertDialogTriggerProps = React.ComponentProps<typeof BaseAlertDialog.Trigger>
type AlertDialogPopupProps = React.ComponentProps<typeof BaseAlertDialog.Popup> &
  VariantProps<typeof alertDialogVariants>
type AlertDialogHeaderProps = React.ComponentProps<'div'>
type AlertDialogTitleProps = React.ComponentProps<typeof BaseAlertDialog.Title>
type AlertDialogDescriptionProps = React.ComponentProps<typeof BaseAlertDialog.Description>
type AlertDialogCloseProps = React.ComponentProps<typeof BaseAlertDialog.Close> &
  Pick<ButtonProps, 'tone' | 'variant' | 'size'>
type AlertDialogFooterProps = React.ComponentProps<'div'>
type AlertDialogConfirmProps = React.ComponentProps<typeof BaseAlertDialog.Close> &
  Pick<ButtonProps, 'tone' | 'variant' | 'size'>
type AlertDialogIconProps = React.ComponentProps<'div'>

export type {
  AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogPopupProps,
  AlertDialogHeaderProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogCloseProps,
  AlertDialogFooterProps,
  AlertDialogConfirmProps,
  AlertDialogIconProps,
}
export { alertDialogHandle, alertDialogVariants }
