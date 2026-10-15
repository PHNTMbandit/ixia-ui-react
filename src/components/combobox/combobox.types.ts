import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import type { Virtualizer } from '@tanstack/react-virtual'
import type { VariantProps } from 'class-variance-authority'

import type { inputVariants } from '../input/input.types'

type ComboboxEmptyProps = React.ComponentProps<typeof BaseCombobox.Empty>
type ComboboxInputProps = Omit<React.ComponentProps<typeof BaseCombobox.Input>, 'size'> &
  VariantProps<typeof inputVariants> & {
    inline?: boolean
  }
type ComboboxItemProps = React.ComponentProps<typeof BaseCombobox.Item>
type ComboboxListProps = React.ComponentProps<typeof BaseCombobox.List>
type ComboboxPopupProps = React.ComponentProps<typeof BaseCombobox.Positioner>
type ComboboxProps = React.ComponentProps<typeof BaseCombobox.Root>
type ComboboxChipsProps = React.ComponentProps<typeof BaseCombobox.Chips>
type ComboboxChipProps = React.ComponentProps<typeof BaseCombobox.Chip>
type ComboboxValueProps = React.ComponentProps<typeof BaseCombobox.Value>
type ComboboxTriggerProps = React.ComponentProps<typeof BaseCombobox.Trigger> & {
  placeholder?: string
}
type ComboboxGroupProps = React.ComponentProps<typeof BaseCombobox.Group>
type ComboboxGroupLabelProps = React.ComponentProps<typeof BaseCombobox.GroupLabel>
type ComboboxCollectionProps = React.ComponentProps<typeof BaseCombobox.Collection>
type ComboboxStatusProps = React.ComponentProps<typeof BaseCombobox.Status>
type ComboboxVirtualizedListProps<TItem> = Omit<React.ComponentProps<'div'>, 'children'> & {
  open: boolean
  virtualizerRef?: React.RefObject<Virtualizer<HTMLDivElement, HTMLDivElement> | null>
  estimateSize?: number
  overscan?: number
  children?: React.ReactNode | ((item: TItem) => React.ReactNode)
}
const { useFilter } = BaseCombobox,
  { useFilteredItems } = BaseCombobox

export type {
  ComboboxEmptyProps,
  ComboboxInputProps,
  ComboboxItemProps,
  ComboboxListProps,
  ComboboxPopupProps,
  ComboboxProps,
  ComboboxChipsProps,
  ComboboxChipProps,
  ComboboxValueProps,
  ComboboxTriggerProps,
  ComboboxGroupProps,
  ComboboxGroupLabelProps,
  ComboboxCollectionProps,
  ComboboxStatusProps,
  ComboboxVirtualizedListProps,
}
export { useFilter, useFilteredItems }
