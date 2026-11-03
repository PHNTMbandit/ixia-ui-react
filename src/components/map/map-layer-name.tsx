import { cn } from '@/utils'

import { useMapLayerItem } from './map-layer-item.context'
import type { MapLayerNameProps } from './map.types'

export function MapLayerName({ className, children, ref, ...props }: MapLayerNameProps) {
  const { layer } = useMapLayerItem()

  return (
    <span
      className={cn('font-body text-sm font-medium whitespace-nowrap', className)}
      ref={ref}
      {...props}
    >
      {children}
      {layer.name}
    </span>
  )
}
