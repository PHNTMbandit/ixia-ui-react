import type { Toggle, ToggleState } from '@base-ui/react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export const toggleVariants = cva(
  'flex items-center justify-center rounded-full text-on-surface-variant transition-all hover:cursor-pointer disabled:opacity-70',
  {
    defaultVariants: {
      size: 'medium',
      tone: 'brand',
    },
    variants: {
      size: {
        iconLarge: 'size-2xl [&>svg]:size-lg',
        iconMedium: 'size-xl [&>svg]:size-md',
        iconSmall: 'size-lg [&>svg]:size-sm',
        large: 'h-2xl gap-xs px-sm style-text-default-0 [&>svg]:size-lg',
        medium: 'h-xl gap-2xs px-xs style-text-default--1 [&>svg]:size-md',
        small: 'h-lg gap-3xs px-2xs style-text-default--2 [&>svg]:size-sm',
      },
      tone: {
        accent:
          'hover:not-disabled:bg-accent-container hover:not-disabled:text-accent-on-container data-pressed:text-accent-default',
        brand:
          'hover:not-disabled:bg-brand-container hover:not-disabled:text-brand-on-container data-pressed:text-brand-default',
        error:
          'hover:not-disabled:bg-error-container hover:not-disabled:text-error-on-container data-pressed:text-error-default',
        info: 'hover:not-disabled:bg-info-container hover:not-disabled:text-info-on-container data-pressed:text-info-default',
        neutral:
          'hover:not-disabled:bg-neutral-container-high hover:not-disabled:text-neutral-on-container data-pressed:text-neutral-default',
        success:
          'hover:not-disabled:bg-success-container hover:not-disabled:text-success-on-container data-pressed:text-success-default',
        warning:
          'hover:not-disabled:bg-warning-container hover:not-disabled:text-warning-on-container data-pressed:text-warning-default',
      },
    },
  },
)

export type ToggleProps = Omit<React.ComponentProps<typeof Toggle>, 'children'> &
  VariantProps<typeof toggleVariants> & {
    children?: React.ReactNode | ((state: ToggleState) => React.ReactNode)
  }
