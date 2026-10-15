import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import type { AutocompleteItemProps } from './autocomplete.types'

export function AutocompleteItem({ className, ref, ...props }: AutocompleteItemProps) {
  return (
    <BaseAutocomplete.Item
      className={cn(
        'mx-xs flex cursor-default items-center rounded-lg px-2xs py-3xs style-text-prose-0 select-none first:mt-xs last:mb-xs hover:cursor-pointer hover:bg-neutral-container-high hover:text-neutral-on-container data-highlighted:relative data-highlighted:z-0 data-highlighted:bg-neutral-container-high data-highlighted:text-neutral-on-container before:data-highlighted:absolute before:data-highlighted:inset-x-sm before:data-highlighted:inset-y-[0px] before:data-highlighted:z-[-1] before:data-highlighted:rounded-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
