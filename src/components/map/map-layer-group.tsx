import { cn } from '@/utils'

import { MapLayerGroupContext } from './map-layer-group.context'
import type { MapLayerGroupProps } from './map.types'

export function MapLayerGroup({ group, className, children, ref, ...props }: MapLayerGroupProps) {
  return (
    <MapLayerGroupContext.Provider value={{ group }}>
      <div className={cn('flex flex-col gap-3xs', className)} ref={ref} {...props}>
        {children}
      </div>
    </MapLayerGroupContext.Provider>
  )
}
