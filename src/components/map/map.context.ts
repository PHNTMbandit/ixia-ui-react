import React from 'react'

import type { MapContextValue } from './map.types'

const MapContext = React.createContext<MapContextValue | undefined>(undefined)

function useIxiaMap(): MapContextValue {
  const context = React.useContext(MapContext)

  if (!context) {
    throw new Error('useIxiaMap must be used within a Map')
  }

  return context
}

export { MapContext, useIxiaMap }
