import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

export const badgeVariants = cva(
  'inline-flex h-md items-center justify-center gap-3xs rounded-full style-text-default--2 whitespace-nowrap transition-all select-none',
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
        className: 'border-brand-default text-brand-default',
        tone: 'brand',
        variant: 'outline',
      },
      {
        className: 'border-accent-default text-accent-default',
        tone: 'accent',
        variant: 'outline',
      },
      {
        className: 'border-neutral-default text-neutral-default',
        tone: 'neutral',
        variant: 'outline',
      },
      {
        className: 'border-error-default text-error-default',
        tone: 'error',
        variant: 'outline',
      },
      {
        className: 'border-info-default text-info-default',
        tone: 'info',
        variant: 'outline',
      },
      {
        className: 'border-success-default text-success-default',
        tone: 'success',
        variant: 'outline',
      },
      {
        className: 'border-warning-default text-warning-default',
        tone: 'warning',
        variant: 'outline',
      },
      {
        className: 'border-brand-border bg-brand-container text-brand-on-container',
        tone: 'brand',
        variant: 'soft',
      },
      {
        className: 'border-accent-border bg-accent-container text-accent-on-container',
        tone: 'accent',
        variant: 'soft',
      },
      {
        className: 'border-neutral-border bg-neutral-container text-neutral-on-container',
        tone: 'neutral',
        variant: 'soft',
      },
      {
        className: 'border-error-border bg-error-container text-error-on-container',
        tone: 'error',
        variant: 'soft',
      },
      {
        className: 'border-info-border bg-info-container text-info-on-container',
        tone: 'info',
        variant: 'soft',
      },
      {
        className: 'border-success-border bg-success-container text-success-on-container',
        tone: 'success',
        variant: 'soft',
      },
      {
        className: 'border-warning-border bg-warning-container text-warning-on-container',
        tone: 'warning',
        variant: 'soft',
      },
    ],
    defaultVariants: {
      size: 'medium',
      tone: 'brand',
      variant: 'fill',
    },
    variants: {
      size: {
        iconLarge: 'size-lg [&>svg]:size-sm',
        iconMedium: 'size-md [&>svg]:size-xs',
        iconSmall: 'size-sm [&>svg]:size-2xs',
        large: 'h-lg px-xs [&>svg]:size-sm',
        medium: 'h-md px-xs [&>svg]:size-xs',
        small: 'h-sm px-xs [&>svg]:size-2xs',
      },
      tone: {
        accent: '',
        brand: '',
        error: '',
        info: '',
        neutral: '',
        success: '',
        warning: '',
      },
      variant: {
        fill: 'shadow-2xs',
        outline: 'border',
        soft: 'border',
      },
    },
  },
)

export type BadgeProps = ComponentProps<'div'> & VariantProps<typeof badgeVariants>
