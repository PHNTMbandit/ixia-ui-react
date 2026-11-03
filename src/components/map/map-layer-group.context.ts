import React from 'react'

import type { MapLayerGroupContextValue } from './map.types'

const MapLayerGroupContext = React.createContext<MapLayerGroupContextValue | undefined>(undefined)

function useMapLayerGroup(): MapLayerGroupContextValue {
  const context = React.useContext(MapLayerGroupContext)

  if (!context) {
    throw new Error('useMapLayerGroup must be used within a MapLayerGroup')
  }

  return context
}

export { MapLayerGroupContext, useMapLayerGroup }
