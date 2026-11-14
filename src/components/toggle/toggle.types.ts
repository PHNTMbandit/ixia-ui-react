import type { Toggle, ToggleState } from '@base-ui/react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export const toggleVariants = cva(
    'flex items-center justify-center rounded-full text-on-surface-variant transition-all duration-hover hover:cursor-pointer disabled:opacity-70',
    {
      defaultVariants: {
        size: 'medium',
        tone: 'brand',
      },
      variants: {
        size: {
          large:
            'h-2xl gap-xs rounded-full px-sm font-body text-base leading-none font-medium [&:where([data-icon-only]:has(>svg:only-child))]:size-2xl [&:where([data-icon-only]:has(>svg:only-child))]:p-0 [:where(&)>svg]:size-lg',
          medium:
            'h-xl gap-2xs rounded-full px-xs font-body text-sm leading-none font-medium [&:where([data-icon-only]:has(>svg:only-child))]:size-xl [&:where([data-icon-only]:has(>svg:only-child))]:p-0 [:where(&)>svg]:size-md',
          small:
            'h-lg min-target gap-3xs rounded-full px-2xs font-body text-xs leading-none font-medium [&:where([data-icon-only]:has(>svg:only-child))]:size-lg [&:where([data-icon-only]:has(>svg:only-child))]:p-0 [:where(&)>svg]:size-sm',
        },
        tone: {
          accent:
            'hover:not-disabled:bg-accent-container hover:not-disabled:text-accent-on-container data-pressed:text-accent-default',
          brand:
            'hover:not-disabled:bg-brand-container hover:not-disabled:text-brand-on-container data-pressed:text-brand-default',
          error:
            'hover:not-disabled:bg-error-container hover:not-disabled:text-error-on-container data-pressed:text-error-on-surface',
          info: 'hover:not-disabled:bg-info-container hover:not-disabled:text-info-on-container data-pressed:text-info-default',
          neutral:
            'hover:not-disabled:bg-neutral-container hover:not-disabled:text-neutral-on-container data-pressed:text-neutral-default',
          success:
            'hover:not-disabled:bg-success-container hover:not-disabled:text-success-on-container data-pressed:text-success-default',
          warning:
            'hover:not-disabled:bg-warning-container hover:not-disabled:text-warning-on-container data-pressed:text-warning-default',
        },
      },
    },
  ),
  toggleGroupHoverVariants = cva('', {
    defaultVariants: {
      tone: 'brand',
    },
    variants: {
      tone: {
        accent: 'hover:not-disabled:bg-accent-container-high',
        brand: 'hover:not-disabled:bg-brand-container-high',
        error: 'hover:not-disabled:bg-error-container-high',
        info: 'hover:not-disabled:bg-info-container-high',
        neutral: 'hover:not-disabled:bg-neutral-container-high',
        success: 'hover:not-disabled:bg-success-container-high',
        warning: 'hover:not-disabled:bg-warning-container-high',
      },
    },
  })

export type ToggleProps = Omit<React.ComponentProps<typeof Toggle>, 'children'> &
  VariantProps<typeof toggleVariants> & {
    children?: React.ReactNode | ((state: ToggleState) => React.ReactNode)
  }
