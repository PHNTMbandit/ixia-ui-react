import { AutocompleteContent } from '@/components/autocomplete'
import { cn } from '@/utils'

import type { GoogleMapSearchControlContentProps } from './google-map-search-control.types'

export function GoogleMapSearchControlContent({
  className,
  ref,
  ...props
}: GoogleMapSearchControlContentProps) {
  return <AutocompleteContent className={cn('', className)} ref={ref} {...props} />
}
