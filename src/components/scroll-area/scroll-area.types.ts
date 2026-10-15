import type { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

export const scrollAreaVariants = cva('overflow-hidden rounded-xl', {
  defaultVariants: {
    orientation: 'vertical',
    variant: 'default',
  },
  variants: {
    orientation: {
      horizontal: 'h-full',
      vertical: '',
    },
    variant: {
      default:
        'bg-surface-low **:data-viewport:rounded-xl **:data-viewport:bg-surface-low **:data-viewport:p-sm **:data-viewport:inset-shadow-2xs **:data-viewport:before:pointer-events-none **:data-viewport:before:absolute **:data-viewport:before:top-0 **:data-viewport:before:left-0 **:data-viewport:before:block **:data-viewport:before:h-[min(40px,var(--scroll-area-overflow-y-start))] **:data-viewport:before:w-full **:data-viewport:before:bg-linear-to-b **:data-viewport:before:from-shadow **:data-viewport:before:to-transparent **:data-viewport:before:transition-[height] **:data-viewport:before:duration-100 **:data-viewport:before:ease-out **:data-viewport:before:content-[""] **:data-viewport:before:[--scroll-area-overflow-y-start:inherit] **:data-viewport:after:pointer-events-none **:data-viewport:after:absolute **:data-viewport:after:bottom-0 **:data-viewport:after:left-0 **:data-viewport:after:block **:data-viewport:after:h-[min(40px,var(--scroll-area-overflow-y-end,40px))] **:data-viewport:after:w-full **:data-viewport:after:bg-linear-to-t **:data-viewport:after:from-shadow **:data-viewport:after:to-transparent **:data-viewport:after:transition-[height] **:data-viewport:after:duration-100 **:data-viewport:after:ease-out **:data-viewport:after:content-[""] **:data-viewport:after:[--scroll-area-overflow-y-end:inherit]',
      ghost: '',
      outline: 'border border-border **:data-viewport:p-sm',
    },
  },
})

export type ScrollAreaProps = ComponentProps<typeof BaseScrollArea.Root> &
  VariantProps<typeof scrollAreaVariants>
