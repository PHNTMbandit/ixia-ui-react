import type { Meter as BaseMeter } from '@base-ui/react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

type MeterProps = React.ComponentProps<typeof BaseMeter.Root> & VariantProps<typeof meterVariants>
type MeterLabelProps = React.ComponentProps<typeof BaseMeter.Label>
type MeterValueProps = React.ComponentProps<typeof BaseMeter.Value>
type MeterTrackProps = React.ComponentProps<typeof BaseMeter.Track>
type MeterIndicatorProps = React.ComponentProps<typeof BaseMeter.Indicator>
type MeterHeaderProps = React.ComponentProps<'div'>
type MeterFooterProps = React.ComponentProps<'div'>
type MeterSubtitleProps = React.ComponentProps<'span'>

const meterVariants = cva('', {
  defaultVariants: {
    orientation: 'vertical',
    size: 'medium',
    tone: 'brand',
  },
  variants: {
    orientation: {
      horizontal:
        'flex items-center justify-between gap-xs [&_[data-track]]:w-full [&_button]:shrink-0',
      vertical: 'flex flex-col space-y-3xs',
    },
    size: {
      large: '[&_[data-track]]:h-xs',
      medium: '[&_[data-track]]:h-2xs',
      small: '[&_[data-track]]:h-3xs',
    },
    tone: {
      accent: '[&_[data-indicator]]:bg-accent-default',
      brand: '[&_[data-indicator]]:bg-brand-default',
      error: '[&_[data-indicator]]:bg-error-default',
      info: '[&_[data-indicator]]:bg-info-default',
      neutral: '[&_[data-indicator]]:bg-neutral-default',
      success: '[&_[data-indicator]]:bg-success-default',
      warning: '[&_[data-indicator]]:bg-warning-default',
    },
  },
})

export { meterVariants }
export type {
  MeterProps,
  MeterLabelProps,
  MeterValueProps,
  MeterTrackProps,
  MeterIndicatorProps,
  MeterHeaderProps,
  MeterFooterProps,
  MeterSubtitleProps,
}
