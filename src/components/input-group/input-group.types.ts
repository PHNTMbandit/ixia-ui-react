import type { Input as BaseInput } from '@base-ui/react/input'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import type { inputVariants } from '../input/input.types'
import type { Separator } from '../separator'

const inputGroupAddonVariants = cva(
  'inline-flex items-center gap-2xs text-on-surface-variant not-first:pl-2xs group-aria-invalid:text-error-on-container',
  {
    defaultVariants: {
      size: 'medium',
    },
    variants: {
      size: {
        large: 'style-text-default-1 [&>svg]:size-md',
        medium: 'style-text-default-0 [&>svg]:size-sm',
        small: 'style-text-default--1 [&>svg]:size-xs',
      },
    },
  },
)

type InputGroupAddonProps = React.ComponentProps<'div'> &
  VariantProps<typeof inputGroupAddonVariants>
type InputGroupInputProps = Omit<React.ComponentProps<typeof BaseInput>, 'size'> &
  VariantProps<typeof inputVariants>
type InputGroupProps = React.ComponentProps<'div'> & VariantProps<typeof inputVariants>
type InputGroupSeparatorProps = React.ComponentProps<typeof Separator>

export type {
  InputGroupAddonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupSeparatorProps,
}
export { inputGroupAddonVariants }
