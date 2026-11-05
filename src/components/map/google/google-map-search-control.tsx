import { useAsyncDebouncer } from '@tanstack/react-pacer'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import React from 'react'

import { Autocomplete } from '@/components/autocomplete'

import { GoogleMapSearchControlContext } from './google-map-search-control.context'
import type { GoogleMapSearchControlProps } from './google-map-search-control.types'
import { getGoogleMapSuggestionLabel } from './google-map.utils'

const DEFAULT_DEBOUNCE_INTERVAL = 300

export function GoogleMapSearchControl({
  onSuggestionSelect,
  onValueChange,
  value: controlledValue,
  defaultValue,
  itemToStringValue = getGoogleMapSuggestionLabel,
  debounceInterval = DEFAULT_DEBOUNCE_INTERVAL,
  locale,
  children,
  ...props
}: GoogleMapSearchControlProps) {
  const [inputValue, setInputValue] = React.useState(defaultValue ?? ''),
    [results, setResults] = React.useState<google.maps.places.AutocompleteSuggestion[]>([]),
    autocompleteValue = controlledValue ?? inputValue,
    places = useMapsLibrary('places'),
    debouncer = useAsyncDebouncer(
      async (query: string): Promise<google.maps.places.AutocompleteSuggestion[]> => {
        const input = query.trim()

        if (!input) {
          setResults([])
          return []
        }

        if (!places) {
          return []
        }

        // oxlint-disable-next-line one-var
        const request: google.maps.places.AutocompleteRequest = {
            input,
            language: locale?.toString(),
          },
          { suggestions: fetchedSuggestions } =
            await places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request)

        setResults(fetchedSuggestions)
        return fetchedSuggestions
      },
      {
        wait: debounceInterval,
      },
      (state) => ({ isPending: state.isPending }),
    ),
    selectSuggestion = async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      if (!places) {
        return
      }
      if (!suggestion.placePrediction) {
        return
      }

      if (onSuggestionSelect) {
        await onSuggestionSelect(suggestion)
      }
    },
    selectFirstSuggestion = async () => {
      const [firstSuggestion] = results

      if (firstSuggestion) {
        if (controlledValue === undefined) {
          setInputValue(itemToStringValue(firstSuggestion))
        }

        await selectSuggestion(firstSuggestion)
      }
    },
    handleValueChange: NonNullable<GoogleMapSearchControlProps['onValueChange']> = (
      value,
      eventDetails,
    ) => {
      if (controlledValue === undefined) {
        setInputValue(value)
      }

      onValueChange?.(value, eventDetails)
      void debouncer.maybeExecute(value)
    }

  return (
    <GoogleMapSearchControlContext.Provider
      value={{
        debouncer,
        locale,
        results,
        selectFirstSuggestion,
        selectSuggestion,
        setResults,
      }}
    >
      <Autocomplete
        filteredItems={results}
        itemToStringValue={itemToStringValue}
        mode="list"
        onValueChange={handleValueChange}
        value={autocompleteValue}
        {...props}
      >
        {children}
      </Autocomplete>
    </GoogleMapSearchControlContext.Provider>
  )
}
