import type { ToggleGroup } from '@base-ui/react/toggle-group'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export const toggleGroupVariants = cva(
  'group flex w-fit items-center justify-center gap-3xs rounded-full',
  {
    compoundVariants: [
      {
        className: 'h-lg px-3xs',
        size: 'small',
        variant: 'default',
      },
      {
        className: 'h-xl px-2xs',
        size: 'medium',
        variant: 'default',
      },
      {
        className: 'h-2xl px-xs',
        size: 'large',
        variant: 'default',
      },
    ],
    defaultVariants: {
      size: 'medium',
      variant: 'default',
    },
    variants: {
      size: {
        large: '',
        medium: '',
        small: '',
      },
      variant: {
        default: 'bg-surface-low',
        ghost: 'bg-transparent',
      },
    },
  },
)

export type ToggleGroupProps = React.ComponentProps<typeof ToggleGroup> &
  VariantProps<typeof toggleGroupVariants>
