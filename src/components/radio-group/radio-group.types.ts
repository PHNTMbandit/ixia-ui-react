import type { Radio as BaseRadio, RadioGroup as BaseRadioGroup } from '@base-ui/react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const radioVariants = cva(
  'group target-hit relative flex size-sm shrink-0 items-center justify-center rounded-full outline-transparent transition-all data-checked:bg-brand-default data-checked:outline-brand-border-strong data-disabled:opacity-50',
  {
    defaultVariants: {
      variant: 'elevated',
    },
    variants: {
      variant: {
        elevated: 'bg-surface shadow-2xs',
        inSurface: 'bg-surface-low inset-shadow-2xs',
      },
    },
  },
)

type RadioProps = React.ComponentProps<typeof BaseRadio.Root> & VariantProps<typeof radioVariants>
type RadioGroupProps = React.ComponentProps<typeof BaseRadioGroup>

export type { RadioProps, RadioGroupProps }
export { radioVariants }
