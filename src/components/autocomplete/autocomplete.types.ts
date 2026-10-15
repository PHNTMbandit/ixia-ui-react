import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { VariantProps } from 'class-variance-authority'

import type { inputVariants } from '../input/input.types'

type AutocompleteProps = React.ComponentProps<typeof BaseAutocomplete.Root>
type AutocompleteInputGroupProps = React.ComponentProps<'div'> & VariantProps<typeof inputVariants>
type AutocompleteInputGroupAddonProps = React.ComponentProps<'div'>
type AutocompleteInputGroupInputProps = React.ComponentProps<typeof BaseAutocomplete.Input>
type AutocompleteContentProps = React.ComponentProps<typeof BaseAutocomplete.Positioner> & {
  emptyText?: string
}

type AutocompleteGridContentProps = React.ComponentProps<typeof BaseAutocomplete.Positioner> & {
  placeholder?: string
  emptyText: string
}

type AutocompleteItemProps = React.ComponentProps<typeof BaseAutocomplete.Item>
type AutocompleteGridItemProps = React.ComponentProps<typeof BaseAutocomplete.Item>
type AutocompleteGroupProps = React.ComponentProps<typeof BaseAutocomplete.Group>
type AutocompleteGroupLabelProps = React.ComponentProps<typeof BaseAutocomplete.GroupLabel>
type AutocompleteCollectionProps = React.ComponentProps<typeof BaseAutocomplete.Collection>
type AutocompleteRowProps = React.ComponentProps<typeof BaseAutocomplete.Row>
type AutocompleteTriggerProps = React.ComponentProps<typeof BaseAutocomplete.Trigger>

type AutocompleteStatusProps = React.ComponentProps<typeof BaseAutocomplete.Status>
const { useFilter } = BaseAutocomplete

export type {
  AutocompleteProps,
  AutocompleteInputGroupProps,
  AutocompleteInputGroupAddonProps,
  AutocompleteInputGroupInputProps,
  AutocompleteContentProps,
  AutocompleteGridContentProps,
  AutocompleteItemProps,
  AutocompleteGridItemProps,
  AutocompleteGroupProps,
  AutocompleteGroupLabelProps,
  AutocompleteCollectionProps,
  AutocompleteRowProps,
  AutocompleteTriggerProps,
  AutocompleteStatusProps,
}
export { useFilter }
