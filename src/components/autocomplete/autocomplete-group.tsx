import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import type { AutocompleteGroupProps } from './autocomplete.types'

export function AutocompleteGroup({ className, ref, ...props }: AutocompleteGroupProps) {
  return (
    <BaseAutocomplete.Group className={cn('block space-y-3xs', className)} ref={ref} {...props} />
  )
}
