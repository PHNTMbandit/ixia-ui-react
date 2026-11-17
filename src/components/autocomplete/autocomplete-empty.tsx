import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils'

import type { AutocompleteEmptyProps } from './autocomplete.types'

export function AutocompleteEmpty({ className, ref, ...props }: AutocompleteEmptyProps) {
  return (
    <BaseAutocomplete.Empty
      className={cn(
        'flex min-h-[calc(var(--spacing-lg)+var(--spacing-3xs)*2)] shrink-0 items-center gap-2xs px-2xs py-3xs style-text-prose--1 text-on-surface-variant empty:hidden',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
