import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import type { AutocompleteListProps } from './autocomplete.types'

export function AutocompleteList({ className, ref, ...props }: AutocompleteListProps) {
  return (
    <BaseAutocomplete.List
      className={cn(
        'min-h-0 scroll-py-3xs space-y-3xs overflow-y-auto overscroll-contain data-empty:hidden',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
