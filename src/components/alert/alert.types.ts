import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const alertVariants = cva(
  'group grid auto-rows-min items-center justify-start gap-x-xs rounded-xl border p-xs transition-all has-data-[slot=alert-action]:grid-cols-[1fr_auto] has-data-[slot=alert-description]:grid-rows-[auto_auto] has-data-[slot=alert-icon]:grid-cols-[auto_1fr] has-data-[slot=alert-icon]:has-data-[slot=alert-action]:grid-cols-[auto_1fr_auto] has-data-[slot=alert-description]:**:data-[slot=alert-icon]:row-span-2',
  {
    defaultVariants: {
      tone: 'brand',
    },
    variants: {
      tone: {
        accent:
          'border-accent-border bg-accent-container [&_[data-slot=alert-description]]:text-accent-on-container-muted [&_[data-slot=alert-icon]]:text-accent-on-container [&_[data-slot=alert-title]]:text-accent-on-container',
        brand:
          'border-brand-border bg-brand-container [&_[data-slot=alert-description]]:text-brand-on-container-muted [&_[data-slot=alert-icon]]:text-brand-on-container [&_[data-slot=alert-title]]:text-brand-on-container',
        error:
          'border-error-border bg-error-container [&_[data-slot=alert-description]]:text-error-on-container-muted [&_[data-slot=alert-icon]]:text-error-on-container [&_[data-slot=alert-title]]:text-error-on-container',
        info: 'border-info-border bg-info-container [&_[data-slot=alert-description]]:text-info-on-container-muted [&_[data-slot=alert-icon]]:text-info-on-container [&_[data-slot=alert-title]]:text-info-on-container',
        neutral:
          'border-neutral-border bg-neutral-container [&_[data-slot=alert-description]]:text-neutral-on-container-muted [&_[data-slot=alert-icon]]:text-neutral-on-container [&_[data-slot=alert-title]]:text-neutral-on-container',
        success:
          'border-success-border bg-success-container [&_[data-slot=alert-description]]:text-success-on-container-muted [&_[data-slot=alert-icon]]:text-success-on-container [&_[data-slot=alert-title]]:text-success-on-container',
        warning:
          'border-warning-border bg-warning-container [&_[data-slot=alert-description]]:text-warning-on-container-muted [&_[data-slot=alert-icon]]:text-warning-on-container [&_[data-slot=alert-title]]:text-warning-on-container',
      },
    },
  },
)

type AlertProps = React.ComponentProps<'div'> & VariantProps<typeof alertVariants>
type AlertTitleProps = React.ComponentProps<'div'>
type AlertDescriptionProps = React.ComponentProps<'div'>
type AlertActionProps = React.ComponentProps<'div'>
type AlertIconProps = React.ComponentProps<'div'>

export {
  alertVariants,
  type AlertProps,
  type AlertTitleProps,
  type AlertDescriptionProps,
  type AlertActionProps,
  type AlertIconProps,
}
