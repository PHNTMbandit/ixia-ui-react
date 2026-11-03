import React from 'react'

import type { MapLayerItemContextValue } from './map.types'

const MapLayerItemContext = React.createContext<MapLayerItemContextValue | undefined>(undefined)

function useMapLayerItem(): MapLayerItemContextValue {
  const context = React.useContext(MapLayerItemContext)

  if (!context) {
    throw new Error('useMapLayerItem must be used within a MapLayerItem')
  }

  return context
}

export { MapLayerItemContext, useMapLayerItem }
