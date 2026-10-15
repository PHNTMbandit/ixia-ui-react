import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import type { AutocompleteStatusProps } from './autocomplete.types'

export function AutocompleteStatus({ className, ref, ...props }: AutocompleteStatusProps) {
  return (
    <BaseAutocomplete.Status
      className={cn(
        'flex items-center gap-2xs p-xs style-text-prose--1 text-on-surface-variant empty:hidden',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
