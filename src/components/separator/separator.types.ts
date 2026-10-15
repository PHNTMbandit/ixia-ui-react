import type { Separator as BaseSeparator } from '@base-ui/react/separator'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export const separatorVariants = cva('relative shrink-0 rounded-full', {
  compoundVariants: [
    {
      className: 'h-[8px]',
      orientation: 'horizontal',
      weight: 'thick',
    },
    {
      className: 'h-[4px]',
      orientation: 'horizontal',
      weight: 'medium',
    },
    {
      className: 'h-[2px]',
      orientation: 'horizontal',
      weight: 'thin',
    },
    {
      className: 'h-px',
      orientation: 'horizontal',
      weight: 'thinnest',
    },
    {
      className: 'w-[8px]',
      orientation: 'vertical',
      weight: 'thick',
    },
    {
      className: 'w-[4px]',
      orientation: 'vertical',
      weight: 'medium',
    },
    {
      className: 'w-[2px]',
      orientation: 'vertical',
      weight: 'thin',
    },
    {
      className: 'w-px',
      orientation: 'vertical',
      weight: 'thinnest',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    style: 'rounded',
    variant: 'default',
    weight: 'thinnest',
  },
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
    style: {
      rounded: 'rounded-full',
      square: 'rounded-none',
    },
    variant: {
      default: 'bg-neutral-border',
      strong: 'bg-neutral-border-strong',
    },
    weight: {
      medium: '[&_[data-label]]:style-text-prose--1',
      thick: '[&_[data-label]]:style-text-prose-0',
      thin: '[&_[data-label]]:style-text-prose--2',
      thinnest: '[&_[data-label]]:style-text-prose--2',
    },
  },
})

export type SeparatorProps = Omit<React.ComponentProps<typeof BaseSeparator>, 'style'> &
  VariantProps<typeof separatorVariants> & {
    labelClassName?: string
  }
