import { AutocompleteStatus } from '@/components/autocomplete'
import { cn } from '@/utils'

import { useGoogleMapSearchControl } from './google-map-search-control.context'
import type { GoogleMapsSearchControlStatusProps } from './google-map-search-control.types'

export function GoogleMapsSearchControlStatus({
  className,
  children,
  ref,
  ...props
}: GoogleMapsSearchControlStatusProps) {
  const { debouncer } = useGoogleMapSearchControl()

  return (
    <AutocompleteStatus className={cn('', className)} ref={ref} {...props}>
      <debouncer.Subscribe
        selector={(state) => ({ isPending: state.isPending, results: state.lastResult })}
      >
        {({ isPending, results }) =>
          (isPending || Boolean(results?.length)) && children({ isPending, results })
        }
      </debouncer.Subscribe>
    </AutocompleteStatus>
  )
}
