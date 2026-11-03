import { cn } from '@/utils'

import { useMapLayerGroup } from './map-layer-group.context'
import type { MapLayerGroupLabelProps } from './map.types'

export function MapLayerGroupLabel({
  className,
  children,
  ref,
  ...props
}: MapLayerGroupLabelProps) {
  const { group } = useMapLayerGroup()

  return (
    <span
      className={cn('font-body text-sm font-medium text-on-surface-variant', className)}
      ref={ref}
      {...props}
    >
      {children}
      {group.name}
    </span>
  )
}
