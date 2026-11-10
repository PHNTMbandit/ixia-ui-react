import { cn } from '@/utils'

import { useMapLayerItem } from './map-layer-item.context'
import type { MapLayerIconProps } from './map.types'

export function MapLayerIcon({ className, children, ref, ...props }: MapLayerIconProps) {
  const { layer } = useMapLayerItem()

  if (!layer.icon) {
    return undefined
  }

  return (
    <div className={cn('shrink-0 [:where(&)>svg]:size-md', className)} ref={ref} {...props}>
      {children}
      {layer.icon}
    </div>
  )
}
