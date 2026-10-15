import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import type { AutocompleteRowProps } from './autocomplete.types'

export function AutocompleteRow({ className, ref, ...props }: AutocompleteRowProps) {
  return <BaseAutocomplete.Row className={cn('grid grid-cols-5', className)} ref={ref} {...props} />
}
