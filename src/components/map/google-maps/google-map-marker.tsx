import { AdvancedMarker, CollisionBehavior } from '@vis.gl/react-google-maps'
import type { ComponentPropsWithRef } from 'react'

type GoogleMapMarkerProps = ComponentPropsWithRef<typeof AdvancedMarker>

export function GoogleMapMarker({
  collisionBehavior = CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
  ...props
}: GoogleMapMarkerProps) {
  return <AdvancedMarker collisionBehavior={collisionBehavior} {...props} />
}

export type { GoogleMapMarkerProps }
