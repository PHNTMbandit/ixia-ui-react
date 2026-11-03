import { AutocompleteItem } from '@/components/autocomplete'
import { cn } from '@/utils'

import { useGoogleMapSearchControl } from './google-map-search-control.context'
import type { GoogleMapSearchControlSuggestionProps } from './google-map-search-control.types'

export function GoogleMapSearchControlSuggestion({
  suggestion,
  className,
  children,
  ref,
  ...props
}: GoogleMapSearchControlSuggestionProps) {
  const { selectSuggestion } = useGoogleMapSearchControl()

  return (
    <AutocompleteItem
      onClick={() => void selectSuggestion(suggestion)}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children(suggestion)}
    </AutocompleteItem>
  )
}
