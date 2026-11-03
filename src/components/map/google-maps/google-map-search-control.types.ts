import type { ReactAsyncDebouncer } from '@tanstack/react-pacer'
import type React from 'react'

import type {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInputGroup,
  AutocompleteInputGroupInput,
  AutocompleteItem,
  AutocompleteStatus,
} from '@/components/autocomplete'
import type { Button } from '@/components/button'

interface GoogleMapSearchControlValue {
  debouncer: ReactAsyncDebouncer<
    (query: string) => Promise<google.maps.places.AutocompleteSuggestion[]>,
    {
      isPending: boolean
    }
  >
  locale?: Intl.Locale
  selectSuggestion: (suggestion: google.maps.places.AutocompleteSuggestion) => Promise<void>
  selectFirstSuggestion: () => Promise<void>
  results: google.maps.places.AutocompleteSuggestion[]
  setResults: React.Dispatch<React.SetStateAction<google.maps.places.AutocompleteSuggestion[]>>
}
type GoogleMapSearchControlContextProps = GoogleMapSearchControlValue

type GoogleMapSearchControlProps = React.ComponentProps<typeof Autocomplete> & {
  locale?: Intl.Locale
  debounceInterval?: number
  onSuggestionSelect?: (suggestion: google.maps.places.AutocompleteSuggestion) => Promise<void>
}
type GoogleMapSearchControlInputGroupProps = React.ComponentProps<typeof AutocompleteInputGroup>
type GoogleMapSearchControlInputProps = React.ComponentProps<typeof AutocompleteInputGroupInput>
type GoogleMapSearchControlSuggestionProps = Omit<
  React.ComponentProps<typeof AutocompleteItem>,
  'children'
> & {
  suggestion: google.maps.places.AutocompleteSuggestion
  children: (suggestion: google.maps.places.AutocompleteSuggestion) => React.ReactNode
}
type GoogleMapsSearchControlStatusProps = Omit<
  React.ComponentProps<typeof AutocompleteStatus>,
  'children'
> & {
  children: (status: {
    isPending: boolean
    results: google.maps.places.AutocompleteSuggestion[] | undefined
  }) => React.ReactNode
}
type GoogleMapsSearchControlResultsProps = Omit<
  React.ComponentProps<typeof AutocompleteCollection>,
  'children'
> & {
  children: (result: google.maps.places.AutocompleteSuggestion, index: number) => React.ReactNode
}
type GoogleMapSearchControlEmptyProps = React.ComponentProps<typeof AutocompleteEmpty>
type GoogleMapSearchControlContentProps = React.ComponentProps<typeof AutocompleteContent>
type GoogleMapSearchControlSubmitProps = React.ComponentProps<typeof Button>

export type {
  GoogleMapSearchControlValue,
  GoogleMapSearchControlContextProps,
  GoogleMapSearchControlProps,
  GoogleMapSearchControlInputProps,
  GoogleMapSearchControlSuggestionProps,
  GoogleMapsSearchControlStatusProps,
  GoogleMapsSearchControlResultsProps,
  GoogleMapSearchControlEmptyProps,
  GoogleMapSearchControlContentProps,
  GoogleMapSearchControlSubmitProps,
  GoogleMapSearchControlInputGroupProps,
}
