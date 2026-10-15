import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import { AutocompleteInputGroup } from './autocomplete-input-group'
import { AutocompleteInputGroupInput } from './autocomplete-input-group-input'
import type { AutocompleteGridContentProps } from './autocomplete.types'

const DEFAULT_SIDE_OFFSET = 4

export function AutocompleteGridContent({
  placeholder = 'Search…',
  emptyText,
  className,
  children,
  sideOffset = DEFAULT_SIDE_OFFSET,
  ref,
  ...props
}: AutocompleteGridContentProps) {
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        className={cn('', className)}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      >
        <BaseAutocomplete.Popup className="max-h-[20.5rem] max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-lg bg-surface-2 shadow-lg transition-[transform,scale,opacity] [--input-container-height:3rem] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0">
          <div className="m-3xs flex h-(--input-container-height) items-center justify-center text-center">
            <AutocompleteInputGroup>
              <AutocompleteInputGroupInput placeholder={placeholder} />
            </AutocompleteInputGroup>
          </div>
          <BaseAutocomplete.Empty className="p-sm style-text-prose--1 empty:m-[0px] empty:p-[0px]">
            {emptyText}
          </BaseAutocomplete.Empty>
          <BaseAutocomplete.List className="max-h-[calc(19.5rem-var(--input-container-height))] scroll-pt-xl scroll-pb-[0.35rem] overflow-auto overscroll-contain">
            {children}
          </BaseAutocomplete.List>
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  )
}
