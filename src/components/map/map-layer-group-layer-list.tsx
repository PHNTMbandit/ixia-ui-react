import { cn } from '@/utils'

import { useMapLayerGroup } from './map-layer-group.context'
import { useIxiaMap } from './map.context'
import type { MapLayerGroupLayerListProps } from './map.types'

export function MapLayerGroupLayerList({
  className,
  children,
  ...props
}: MapLayerGroupLayerListProps) {
  const { group } = useMapLayerGroup(),
    { layers } = useIxiaMap(),
    groupLayers = group.layers.flatMap((config) => {
      const layer = layers.find((candidate) => candidate.id === config.id)
      if (!layer) {
        return []
      }

      return [layer]
    })

  return (
    <ul className={cn('flex flex-col gap-2xs', className)} {...props}>
      {groupLayers.map((layer) => children(layer))}
    </ul>
  )
}
