import { Autocomplete } from '@/components/autocomplete'
import { cn } from '@/utils'

import type { GoogleMapSearchControlInputGroupProps } from './google-map-search-control.types'

export function GoogleMapSearchControlInputGroup({
  className,
  ref,
  ...props
}: GoogleMapSearchControlInputGroupProps) {
  return <Autocomplete.InputGroup className={cn('', className)} ref={ref} {...props} />
}
