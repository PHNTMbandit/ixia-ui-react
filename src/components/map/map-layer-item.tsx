import { cn } from '@/utils'

import { MapLayerItemContext } from './map-layer-item.context'
import type { MapLayerItemProps } from './map.types'

export function MapLayerItem({
  fadeWhenInvisible = true,
  layer,
  className,
  children,
  ref,
  ...props
}: MapLayerItemProps) {
  return (
    <MapLayerItemContext.Provider value={{ layer }}>
      <div
        className={cn(
          'flex items-center gap-2xs transition-opacity [&>:nth-last-child(2)]:mr-lg',
          fadeWhenInvisible && layer.visible === false && 'opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </MapLayerItemContext.Provider>
  )
}
