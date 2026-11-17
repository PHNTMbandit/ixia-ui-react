import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import type { AutocompleteStatusProps } from './autocomplete.types'

export function AutocompleteStatus({ className, ref, ...props }: AutocompleteStatusProps) {
  return (
    <BaseAutocomplete.Status
      className={cn(
        'flex min-h-[calc(var(--spacing-lg)+var(--spacing-3xs)*2)] shrink-0 items-center gap-2xs px-2xs py-3xs style-text-prose--1 text-on-surface-muted empty:sr-only empty:min-h-0',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
