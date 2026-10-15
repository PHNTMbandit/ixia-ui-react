import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import type { AutocompleteInputGroupInputProps } from './autocomplete.types'

export function AutocompleteInputGroupInput({
  placeholder,
  className,
  ref,
  ...props
}: AutocompleteInputGroupInputProps) {
  return (
    <BaseAutocomplete.Input
      placeholder={placeholder}
      className={cn('grow text-ellipsis outline-none placeholder:opacity-85', className)}
      ref={ref}
      {...props}
    />
  )
}
