import { AdvancedMarker, CollisionBehavior } from '@vis.gl/react-google-maps'
import type { ComponentPropsWithRef } from 'react'

import { cn } from '@/utils'

type GoogleMapClusterProps = ComponentPropsWithRef<typeof AdvancedMarker> & {
  count: number
  label: string
}

export function GoogleMapCluster({
  className,
  children,
  count,
  label,
  collisionBehavior = CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL,
  zIndex = count,
  ...props
}: GoogleMapClusterProps) {
  return (
    <AdvancedMarker
      aria-label={label}
      collisionBehavior={collisionBehavior}
      zIndex={zIndex}
      className={cn(
        'flex min-h-xl min-w-xl animate-appear items-center justify-center rounded-full border border-neutral-border bg-neutral-container p-3xs',
        className,
      )}
      {...props}
    >
      {children ?? <span>{count}</span>}
    </AdvancedMarker>
  )
}

export type { GoogleMapClusterProps }
