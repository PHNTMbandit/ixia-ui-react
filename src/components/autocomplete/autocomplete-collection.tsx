import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import type { AutocompleteCollectionProps } from './autocomplete.types'

export function AutocompleteCollection({ ...props }: AutocompleteCollectionProps) {
  return <BaseAutocomplete.Collection {...props} />
}
