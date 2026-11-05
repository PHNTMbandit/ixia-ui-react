import { CircleNotchIcon, NavigationArrowIcon } from '@phosphor-icons/react'
import { useMap } from '@vis.gl/react-google-maps'
import React from 'react'

import { Button } from '@/components/button'
import { cn } from '@/utils'

import type { GoogleMapGeolocateControlProps } from './google-map.types'

const ZOOM_LEVEL = 15

export function GoogleMapGeolocateControl({
  zoomLevel = ZOOM_LEVEL,
  className,
  children,
  ref,
  ...props
}: GoogleMapGeolocateControlProps) {
  const map = useMap(),
    [isPending, startTransition] = React.useTransition(),
    handleClick = () => {
      if (!map) {
        return
      }

      startTransition(async () => {
        const pos = await new Promise<{ lat: number; lng: number }>((resolve) => {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude,
              lng = position.coords.longitude
            resolve({ lat, lng })
          })
        })

        if (pos) {
          map.moveCamera({
            center: pos,
            zoom: zoomLevel,
          })
        }
      })
    }

  return (
    <Button
      disabled={isPending}
      onClick={handleClick}
      size="medium"
      tone="neutral"
      variant="elevated"
      className={cn('shrink-0', className)}
      ref={ref}
      {...props}
    >
      {children}
      {isPending && <CircleNotchIcon className="animate-spin" weight="bold" />}
      {!isPending && <NavigationArrowIcon weight="bold" />}
    </Button>
  )
}
