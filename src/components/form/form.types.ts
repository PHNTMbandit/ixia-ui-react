import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import type { Button } from '../button'

type FormProps = React.ComponentProps<'form'>
type FormSubmitProps = React.ComponentProps<typeof Button>
type FormResetProps = React.ComponentProps<typeof Button>
type FormErrorsProps = React.ComponentProps<'div'> & {
  headerLabel?: string
}
type FormSetProps = React.ComponentProps<'div'>
type FormSetHeadingProps = React.ComponentProps<'span'> &
  VariantProps<typeof formSetHeadingVariants>
type FormSetContentProps = React.ComponentProps<'div'>
type FormFooterProps = React.ComponentProps<'div'> & {
  orientation?: 'horizontal' | 'vertical'
}

const formSetHeadingVariants = cva('', {
  defaultVariants: {
    size: 'medium',
  },
  variants: {
    size: {
      large: 'style-text-strong-2',
      medium: 'style-text-strong-1',
      small: 'style-text-strong-0',
    },
  },
})

export type {
  FormProps,
  FormSubmitProps,
  FormResetProps,
  FormErrorsProps,
  FormSetProps,
  FormSetHeadingProps,
  FormSetContentProps,
  FormFooterProps,
}
export { formSetHeadingVariants }
