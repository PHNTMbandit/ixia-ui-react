import { useMap } from '@vis.gl/react-google-maps'
import { useState } from 'react'

import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { cn } from '@/utils'

import type { GoogleMapTiltControlProps } from './google-map.types'

const DEFAULT_TILT = 0,
  NULL_TILT = 0,
  MAX_TILT = 45

export function GoogleMapTiltControl({
  className,
  children,
  ref,
  ...props
}: GoogleMapTiltControlProps) {
  const map = useMap(),
    [currentTilt, setCurrentTilt] = useState(map?.getTilt() || DEFAULT_TILT)

  function handleClick() {
    if (map) {
      if (currentTilt === NULL_TILT) {
        map.setTilt(MAX_TILT)
        setCurrentTilt(MAX_TILT)
      } else {
        map.setTilt(DEFAULT_TILT)
        setCurrentTilt(DEFAULT_TILT)
      }
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant="elevated"
      // oxlint-disable-next-line no-ternary
      tone={currentTilt === MAX_TILT ? 'brand' : 'neutral'}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
      <Icon name="3d" />
    </Button>
  )
}
