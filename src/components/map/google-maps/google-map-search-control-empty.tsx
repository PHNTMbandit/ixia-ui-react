import { AutocompleteEmpty } from '@/components/autocomplete'
import { cn } from '@/utils/cn'

import { useGoogleMapSearchControl } from './google-map-search-control.context'
import type { GoogleMapSearchControlEmptyProps } from './google-map-search-control.types'

export function GoogleMapSearchControlEmpty({
  className,
  children,
  ref,
  ...props
}: GoogleMapSearchControlEmptyProps) {
  const { debouncer } = useGoogleMapSearchControl()

  return (
    <debouncer.Subscribe selector={(state) => ({ isPending: state.isPending })}>
      {({ isPending }) =>
        !isPending && (
          <AutocompleteEmpty className={cn('', className)} ref={ref} {...props}>
            {children}
          </AutocompleteEmpty>
        )
      }
    </debouncer.Subscribe>
  )
}
