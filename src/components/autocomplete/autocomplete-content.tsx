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
        <BaseAutocomplete.Popup className="max-h-[22.5rem] w-[calc(var(--anchor-width)+var(--spacing-md))] max-w-[calc(var(--available-width))] overflow-hidden rounded-xl bg-surface-2 shadow-md">
          <BaseAutocomplete.List className="max-h-[min(22.5rem,var(--available-height))] scroll-pt-[2.25rem] scroll-pb-[0.5rem] space-y-3xs overflow-y-auto overscroll-contain p-2xs data-empty:p-[0px]">
            {children}
          </BaseAutocomplete.List>
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  )
}
