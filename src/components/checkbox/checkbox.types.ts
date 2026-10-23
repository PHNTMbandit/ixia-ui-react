import type { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

const checkboxVariants = cva(
  'group flex size-md items-center justify-center rounded-md shadow-2xs outline-2 outline-transparent transition-colors not-indeterminate:text-accent-on-default indeterminate:text-accent-default hover:cursor-pointer hover:outline-accent-border disabled:cursor-not-allowed disabled:hover:cursor-not-allowed data-checked:bg-accent-default [&_svg]:size-sm [&:not([data-checked])]:hover:outline-border-strong',
  {
    defaultVariants: {
      variant: 'elevated',
    },
    variants: {
      variant: {
        elevated: 'bg-surface shadow-2xs',
        inSurface: 'bg-surface-low shadow-none inset-shadow-2xs data-checked:inset-shadow-none',
        outline: 'bg-inherit shadow-none outline outline-border-strong',
      },
    },
  },
)

type CheckboxRootProps = ComponentProps<typeof BaseCheckbox.Root> &
  VariantProps<typeof checkboxVariants>

type CheckboxIndicatorProps = ComponentProps<typeof BaseCheckbox.Indicator>

export { checkboxVariants, type CheckboxRootProps, type CheckboxIndicatorProps }
