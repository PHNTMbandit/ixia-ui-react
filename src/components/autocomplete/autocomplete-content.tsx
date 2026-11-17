import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import type { AutocompleteContentProps } from './autocomplete.types'

const DEFAULT_SIDE_OFFSET = 12

export function AutocompleteContent({
  className,
  children,
  sideOffset = DEFAULT_SIDE_OFFSET,
  ref,
  ...props
}: AutocompleteContentProps) {
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        className={cn('', className)}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      >
        <BaseAutocomplete.Popup className="flex max-h-[min(22.5rem,var(--available-height))] w-[calc(var(--anchor-width)+var(--spacing-md))] max-w-[calc(var(--available-width))] flex-col gap-3xs overflow-hidden rounded-xl bg-surface-2 p-2xs shadow-md">
          {children}
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  )
}
