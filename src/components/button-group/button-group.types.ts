import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import type { ButtonProps } from '../button/button.types'

export const buttonGroupVariants = cva(
  'inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full whitespace-nowrap transition-all select-none disabled:pointer-events-none disabled:opacity-50 [&>:where([data-slot=button],button)]:rounded-none',
  {
    compoundVariants: [
      {
        className: 'bg-brand-default text-brand-on-default',
        tone: 'brand',
        variant: 'fill',
      },
      {
        className: 'bg-accent-default text-accent-on-default',
        tone: 'accent',
        variant: 'fill',
      },
      {
        className: 'bg-neutral-default text-neutral-on-default',
        tone: 'neutral',
        variant: 'fill',
      },
      {
        className: 'bg-error-default text-error-on-default',
        tone: 'error',
        variant: 'fill',
      },
      {
        className: 'bg-info-default text-info-on-default',
        tone: 'info',
        variant: 'fill',
      },
      {
        className: 'bg-success-default text-success-on-default',
        tone: 'success',
        variant: 'fill',
      },
      {
        className: 'bg-warning-default text-warning-on-default',
        tone: 'warning',
        variant: 'fill',
      },
      {
        className: 'bg-brand-container text-brand-on-container',
        tone: 'brand',
        variant: 'secondary',
      },
      {
        className: 'bg-accent-container text-accent-on-container',
        tone: 'accent',
        variant: 'secondary',
      },
      {
        className: 'bg-neutral-container text-neutral-on-container',
        tone: 'neutral',
        variant: 'secondary',
      },
      {
        className: 'bg-error-container text-error-on-container',
        tone: 'error',
        variant: 'secondary',
      },
      {
        className: 'bg-info-container text-info-on-container',
        tone: 'info',
        variant: 'secondary',
      },
      {
        className: 'bg-success-container text-success-on-container',
        tone: 'success',
        variant: 'secondary',
      },
      {
        className: 'bg-warning-container text-warning-on-container',
        tone: 'warning',
        variant: 'secondary',
      },
      {
        className: 'border-brand-border text-brand-default',
        tone: 'brand',
        variant: 'outline',
      },
      {
        className: 'border-accent-border text-accent-default',
        tone: 'accent',
        variant: 'outline',
      },
      {
        className: 'border-neutral-border text-neutral-default',
        tone: 'neutral',
        variant: 'outline',
      },
      {
        className: 'border-error-border text-error-on-surface',
        tone: 'error',
        variant: 'outline',
      },
      {
        className: 'border-info-border text-info-default',
        tone: 'info',
        variant: 'outline',
      },
      {
        className: 'border-success-border text-success-default',
        tone: 'success',
        variant: 'outline',
      },
      {
        className: 'border-warning-border text-warning-default',
        tone: 'warning',
        variant: 'outline',
      },
      {
        className: 'text-brand-default',
        tone: 'brand',
        variant: 'ghost',
      },
      {
        className: 'text-accent-default',
        tone: 'accent',
        variant: 'ghost',
      },
      {
        className: 'text-neutral-default',
        tone: 'neutral',
        variant: 'ghost',
      },
      {
        className: 'text-error-on-surface',
        tone: 'error',
        variant: 'ghost',
      },
      {
        className: 'text-info-default',
        tone: 'info',
        variant: 'ghost',
      },
      {
        className: 'text-success-default',
        tone: 'success',
        variant: 'ghost',
      },
      {
        className: 'text-warning-default',
        tone: 'warning',
        variant: 'ghost',
      },
      {
        className: 'bg-brand-container text-brand-on-container',
        tone: 'brand',
        variant: 'elevated',
      },
      {
        className: 'bg-accent-container text-accent-on-container',
        tone: 'accent',
        variant: 'elevated',
      },
      {
        className: 'bg-surface-2 text-on-surface',
        tone: 'neutral',
        variant: 'elevated',
      },
      {
        className: 'bg-error-container text-error-on-container',
        tone: 'error',
        variant: 'elevated',
      },
      {
        className: 'bg-info-container text-info-on-container',
        tone: 'info',
        variant: 'elevated',
      },
      {
        className: 'bg-success-container text-success-on-container',
        tone: 'success',
        variant: 'elevated',
      },
      {
        className: 'bg-warning-container text-warning-on-container',
        tone: 'warning',
        variant: 'elevated',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      tone: 'brand',
      variant: 'fill',
    },
    variants: {
      orientation: {
        horizontal:
          '[&>*+*]:relative [&>*+*]:before:absolute [&>*+*]:before:top-1/2 [&>*+*]:before:left-0 [&>*+*]:before:h-1/2 [&>*+*]:before:w-px [&>*+*]:before:-translate-y-1/2 [&>*+*]:before:content-[""]',
        vertical:
          'flex-col [&>*+*]:relative [&>*+*]:before:absolute [&>*+*]:before:top-0 [&>*+*]:before:left-1/2 [&>*+*]:before:h-px [&>*+*]:before:w-1/2 [&>*+*]:before:-translate-x-1/2 [&>*+*]:before:content-[""]',
      },
      tone: {
        accent: '[&>*+*]:before:bg-accent-border',
        brand: '[&>*+*]:before:bg-brand-border',
        error: '[&>*+*]:before:bg-error-border',
        info: '[&>*+*]:before:bg-info-border',
        neutral: '[&>*+*]:before:bg-neutral-border',
        success: '[&>*+*]:before:bg-success-border',
        warning: '',
      },
      variant: {
        elevated: 'shadow-xs',
        fill: '',
        ghost: '',
        outline: 'border',
        secondary: '',
      },
    },
  },
)

export type ButtonGroupProps = React.ComponentProps<'div'> &
  VariantProps<typeof buttonGroupVariants> &
  Pick<ButtonProps, 'size'>
