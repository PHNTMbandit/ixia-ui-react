import { cn } from '@/utils'

import { Button } from '../button'
import { Icon } from '../icon'
import { useMapLayerItem } from './map-layer-item.context'
import { useIxiaMap } from './map.context'
import type { MapLayerVisibilityToggleProps } from './map.types'

export function MapLayerVisibilityToggle({
  className,
  children,
  ref,
  ...props
}: MapLayerVisibilityToggleProps) {
  const { layer } = useMapLayerItem(),
    layerId = layer.id,
    { onVisibilityChange } = useIxiaMap(),
    visible = layer.visible ?? true,
    handleClick: NonNullable<MapLayerVisibilityToggleProps['onClick']> = (event) => {
      if (!event.defaultPrevented && onVisibilityChange) {
        onVisibilityChange(layer, !visible)
      }
    }

  return (
    <Button
      type="button"
      size="small"
      tone="neutral"
      variant="soft"
      aria-label={`Layer visibility: ${layerId}`}
      aria-pressed={visible}
      title="Toggle layer visibility"
      className={cn('ml-auto shrink-0 grow-0', className)}
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      {children ?? (
        <>
          {visible && <Icon name="visible" />}
          {!visible && <Icon name="hidden" />}
        </>
      )}
    </Button>
  )
}
