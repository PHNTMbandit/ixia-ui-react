import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import { useMap } from '@vis.gl/react-google-maps'

import { Button } from '@/components/button'
import { ButtonGroup } from '@/components/button-group'
import { cn } from '@/utils'

import type { GoogleMapZoomControlProps } from './google-map.types'

const DEFAULT_ZOOM = 0,
  ZOOM_STEP = 1

export function GoogleMapZoomControl({
  step = ZOOM_STEP,
  className,
  children,
  ref,
  ...props
}: GoogleMapZoomControlProps) {
  const map = useMap(),
    handleZoomIn = () => {
      if (!map) {
        return
      }
      map.setZoom((map.getZoom() ?? DEFAULT_ZOOM) + step)
    },
    handleZoomOut = () => {
      if (!map) {
        return
      }
      map.setZoom((map.getZoom() ?? DEFAULT_ZOOM) - step)
    }

  return (
    <ButtonGroup
      size="medium"
      tone="neutral"
      variant="elevated"
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
      <Button onClick={handleZoomIn}>
        <PlusIcon weight="bold" />
      </Button>
      <Button onClick={handleZoomOut}>
        <MinusIcon weight="bold" />
      </Button>
    </ButtonGroup>
  )
}
