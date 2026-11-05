import { cn } from '@/utils'

import type { MapControlGroupProps } from './map.types'
import { mapControlGroupVariants } from './map.utils'

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
