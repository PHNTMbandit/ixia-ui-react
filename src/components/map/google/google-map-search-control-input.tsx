import { Autocomplete } from '@/components/autocomplete'
import { cn } from '@/utils'

import { useGoogleMapSearchControl } from './google-map-search-control.context'
import type { GoogleMapSearchControlInputProps } from './google-map-search-control.types'

export function GoogleMapSearchControlInput({
  className,
  onKeyDown,
  ref,
  ...props
}: GoogleMapSearchControlInputProps) {
  const { results, selectFirstSuggestion } = useGoogleMapSearchControl(),
    handleSubmit: NonNullable<GoogleMapSearchControlInputProps['onKeyDown']> = (event) => {
      onKeyDown?.(event)

      if (event.key !== 'Enter' || event.defaultPrevented || !results.length) {
        return
      }

      event.preventDefault()
      void selectFirstSuggestion()
    }

  return (
    <Autocomplete.InputGroupInput
      onKeyDown={handleSubmit}
      className={cn('', className)}
      ref={ref}
      {...props}
    />
  )
}
