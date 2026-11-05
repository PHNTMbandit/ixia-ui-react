import { AutocompleteCollection } from '@/components/autocomplete'

import type { GoogleMapsSearchControlResultsProps } from './google-map-search-control.types'

export function GoogleMapsSearchControlResults({
  children,
  ...props
}: GoogleMapsSearchControlResultsProps) {
  return (
    <AutocompleteCollection {...props}>
      {(result: google.maps.places.AutocompleteSuggestion, index: number) =>
        children(result, index)
      }
    </AutocompleteCollection>
  )
}
