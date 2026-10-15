import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import type { AutocompleteGroupProps } from './autocomplete.types'

export function AutocompleteGroupLabel({ className, ref, ...props }: AutocompleteGroupProps) {
  return (
    <BaseAutocomplete.GroupLabel
      className={cn(
        'sticky top-[0px] z-1 my-[0px] mr-[0px] ml-[3px] bg-surface-2 px-sm pt-sm pb-3xs style-text-strong--2 text-on-surface-variant',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
