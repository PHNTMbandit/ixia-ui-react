import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import type { AutocompleteProps } from './autocomplete.types'

export function Autocomplete<Items extends readonly { items: readonly unknown[] }[]>(
  props: Omit<AutocompleteProps<Items[number]['items'][number]>, 'items'> & { items: Items },
): React.JSX.Element
export function Autocomplete<ItemValue>(
  props: Omit<AutocompleteProps<ItemValue>, 'items'> & { items?: readonly ItemValue[] },
): React.JSX.Element
export function Autocomplete({ ...props }: AutocompleteProps) {
  return <BaseAutocomplete.Root {...props} />
}
