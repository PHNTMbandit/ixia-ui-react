import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export const textAreaVariants = cva(
  'relative flex resize flex-col overflow-hidden rounded-xl outline outline-transparent transition-[outline] hover:not-focus-within:outline-border-strong data-[disabled=true]:cursor-not-allowed',
  {
    defaultVariants: {
      variant: 'primary',
    },
    variants: {
      variant: {
        primary: 'bg-surface shadow-2xs',
        secondary: 'bg-neutral-container',
      },
    },
  },
)

export type TextAreaProps = React.ComponentProps<'textarea'> & VariantProps<typeof textAreaVariants>
