import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import type { AutocompleteProps } from './autocomplete.types'

export function Autocomplete({ ...props }: AutocompleteProps) {
  return <BaseAutocomplete.Root {...props} />
}
