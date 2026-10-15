import type { Select as BaseSelect } from '@base-ui/react/select'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'

const selectVariants = cva(
  'flex items-center justify-between outline outline-transparent transition-all duration-100 hover:cursor-pointer aria-invalid:bg-error-container aria-invalid:text-error-on-container aria-invalid:outline-error-border data-disabled:cursor-not-allowed [&_[data-value]]:min-w-0 [&_[data-value]]:flex-1',
  {
    defaultVariants: {
      size: 'medium',
      variant: 'primary',
    },
    variants: {
      size: {
        large:
          'h-2xl gap-xl rounded-2xl px-md style-text-default-1 [&_[data-value]]:gap-xs [&_svg]:size-md',
        medium:
          'h-xl gap-lg rounded-xl px-sm style-text-default-0 [&_[data-value]]:gap-2xs [&_svg]:size-sm',
        small:
          'h-lg gap-md rounded-lg px-xs style-text-default--1 [&_[data-value]]:gap-3xs [&_svg]:size-xs',
      },
      variant: {
        ghost: 'bg-transparent hover:bg-neutral-container',
        primary: 'bg-surface shadow-2xs hover:outline-border-strong',
        secondary: 'bg-neutral-container hover:outline-border-strong',
      },
    },
  },
)

type SelectChangeEventDetails =
  NonNullable<React.ComponentProps<typeof BaseSelect.Root>['onValueChange']> extends (
    value: never,
    details: infer Details,
  ) => void
    ? Details
    : never

type SelectValue<Value, Multiple extends boolean | undefined> = Multiple extends true
  ? Value[]
  : Value

interface SelectProps<Value, Multiple extends boolean | undefined = false> extends Omit<
  BaseSelect.Root.Props<Value, Multiple>,
  | 'defaultValue'
  | 'isItemEqualToValue'
  | 'items'
  | 'itemToStringLabel'
  | 'itemToStringValue'
  | 'onValueChange'
  | 'value'
> {
  defaultValue?: SelectValue<Value, Multiple> | null
  isItemEqualToValue?: (itemValue: Value, value: Value) => boolean
  items?: Record<string, ReactNode> | readonly { label: ReactNode; value: Value }[]
  itemToStringLabel?: (itemValue: Value) => string
  itemToStringValue?: (itemValue: Value) => string
  onValueChange?: (
    value: SelectValue<Value, Multiple> | (Multiple extends true ? never : null),
    eventDetails: SelectChangeEventDetails,
  ) => void
  value?: SelectValue<Value, Multiple> | null
}
type SelectTriggerProps = React.ComponentProps<typeof BaseSelect.Trigger> &
  VariantProps<typeof selectVariants>
type SelectValueProps = React.ComponentProps<typeof BaseSelect.Value>
type SelectIconProps = React.ComponentProps<typeof BaseSelect.Icon>
type SelectPopupProps = React.ComponentProps<typeof BaseSelect.Positioner>
type SelectItemProps = React.ComponentProps<typeof BaseSelect.Item>
type SelectListProps = React.ComponentProps<typeof BaseSelect.List>
type SelectGroupProps = React.ComponentProps<typeof BaseSelect.Group>
type SelectGroupLabelProps = React.ComponentProps<typeof BaseSelect.GroupLabel>
type SelectDescriptionProps = React.ComponentProps<'span'>
type SelectTitleProps = React.ComponentProps<'span'>
interface SelectFilter {
  id: number
  label: string
  value: string
}

export type {
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIconProps,
  SelectPopupProps,
  SelectItemProps,
  SelectListProps,
  SelectGroupProps,
  SelectGroupLabelProps,
  SelectDescriptionProps,
  SelectTitleProps,
  SelectFilter,
}
export { selectVariants }
