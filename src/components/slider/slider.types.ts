import type { Slider as BaseSlider } from '@base-ui/react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

const sliderVariants = cva('flex h-lg w-full items-center', {
  defaultVariants: {
    size: 'medium',
    tone: 'brand',
  },
  variants: {
    size: {
      large:
        "[&_[data-slot='slider-thumb']]:size-md [&_[data-slot='slider-thumb']]:border-3 [&_[data-slot='slider-thumb'][data-dragging]]:size-lg [&_[data-slot='slider-track'][data-orientation='horizontal']]:h-xs [&_[data-slot='slider-track'][data-orientation='vertical']]:w-xs",
      medium:
        "[&_[data-slot='slider-thumb']]:size-sm [&_[data-slot='slider-thumb']]:border-2 [&_[data-slot='slider-thumb'][data-dragging]]:size-md [&_[data-slot='slider-track'][data-orientation='horizontal']]:h-2xs [&_[data-slot='slider-track'][data-orientation='vertical']]:w-2xs",
      small:
        "[&_[data-slot='slider-thumb']]:size-xs [&_[data-slot='slider-thumb']]:border [&_[data-slot='slider-thumb'][data-dragging]]:size-sm [&_[data-slot='slider-track'][data-orientation='horizontal']]:h-3xs [&_[data-slot='slider-track'][data-orientation='vertical']]:w-3xs",
    },
    tone: {
      accent:
        "[&_[data-slot='slider-thumb']]:border-accent-default [&_[data-slot=slider-indicator]]:bg-accent-default [&_[data-slot=slider-track]]:bg-border-strong",
      brand:
        "[&_[data-slot='slider-thumb']]:border-brand-default [&_[data-slot=slider-indicator]]:bg-brand-default [&_[data-slot=slider-track]]:bg-border-strong",
      error:
        "[&_[data-slot='slider-thumb']]:border-error-default [&_[data-slot=slider-indicator]]:bg-error-default [&_[data-slot=slider-track]]:bg-border-strong",
      info: "[&_[data-slot='slider-thumb']]:border-info-default [&_[data-slot=slider-indicator]]:bg-info-default [&_[data-slot=slider-track]]:bg-border-strong",
      neutral:
        "[&_[data-slot='slider-thumb']]:border-neutral-default [&_[data-slot=slider-indicator]]:bg-neutral-default [&_[data-slot=slider-track]]:bg-border-strong",
      success:
        "[&_[data-slot='slider-thumb']]:border-success-default [&_[data-slot=slider-indicator]]:bg-success-default [&_[data-slot=slider-track]]:bg-border-strong",
      warning:
        "[&_[data-slot='slider-thumb']]:border-warning-default [&_[data-slot=slider-indicator]]:bg-warning-default [&_[data-slot=slider-track]]:bg-border-strong",
    },
  },
})

type SliderProps = ComponentProps<typeof BaseSlider.Root> &
  VariantProps<typeof sliderVariants> & {
    showIndicator?: boolean
    showThumbOnHover?: boolean
    showTooltip?: boolean
  }
type SliderThumbProps = ComponentProps<typeof BaseSlider.Thumb> & {
  hide?: boolean
}

export type { SliderProps, SliderThumbProps }
export { sliderVariants }
