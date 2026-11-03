import { Map } from '@vis.gl/react-google-maps'
import React from 'react'

import { cn } from '@/utils'

import type { GoogleMapFrameProps } from './google-map.types'

export function GoogleMapFrame({ className, children, ...props }: GoogleMapFrameProps) {
  const id = React.useId()

  return (
    <Map className={cn('', className)} id={id} {...props}>
      {children}
    </Map>
  )
}
