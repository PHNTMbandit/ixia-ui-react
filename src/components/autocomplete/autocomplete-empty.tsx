import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils'

import type { AutocompleteEmptyProps } from './autocomplete.types'

export function AutocompleteEmpty({ className, ref, ...props }: AutocompleteEmptyProps) {
  return (
    <BaseAutocomplete.Empty
      className={cn(
        'flex items-center gap-2xs px-sm py-xs style-text-prose--1 text-on-surface-variant empty:p-0',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
