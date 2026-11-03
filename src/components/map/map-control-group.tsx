import { cn } from '@/utils'

import { mapControlGroupVariants } from './google-maps/google-map.utils'
import type { MapControlGroupProps } from './map.types'

export function MapControlGroup({
  position,
  className,
  children,
  ref,
  ...props
}: MapControlGroupProps) {
  return (
    <div className={cn(mapControlGroupVariants({ position }), className)} ref={ref} {...props}>
      {children}
    </div>
  )
}
