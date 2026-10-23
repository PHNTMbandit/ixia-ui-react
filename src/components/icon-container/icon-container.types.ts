import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const iconContainerVariants = cva('flex shrink-0 items-center justify-center', {
  compoundVariants: [
    {
      className: 'rounded-xl',
      shape: 'square',
      size: 'small',
    },
    {
      className: 'rounded-2xl',
      shape: 'square',
      size: 'medium',
    },
    {
      className: 'rounded-3xl',
      shape: 'square',
      size: 'large',
    },
  ],
  defaultVariants: {
    shape: 'rounded',
    size: 'medium',
    tone: 'brand',
  },
  variants: {
    shape: {
      rounded: 'rounded-full',
      square: '',
    },
    size: {
      large: 'size-3xl [&>svg]:size-xl',
      medium: 'size-2xl [&>svg]:size-lg',
      small: 'size-xl [&>svg]:size-md',
    },
    tone: {
      accent: 'bg-accent-container-high text-accent-on-container',
      brand: 'bg-brand-container-high text-brand-on-container',
      error: 'bg-error-container-high text-error-on-container',
      info: 'bg-info-container-high text-info-on-container',
      neutral: 'bg-neutral-container-high text-neutral-on-container',
      success: 'bg-success-container-high text-success-on-container',
      warning: 'bg-warning-container-high text-warning-on-container',
    },
  },
})

type IconContainerProps = React.ComponentProps<'div'> & VariantProps<typeof iconContainerVariants>

export { iconContainerVariants }
export type { IconContainerProps }
