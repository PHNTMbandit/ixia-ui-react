import { MapContext } from './map.context'
import type { MapProps } from './map.types'

export function Map({ layers, onVisibilityChange, children }: MapProps) {
  return (
    <MapContext.Provider value={{ layers, onVisibilityChange }}>{children}</MapContext.Provider>
  )
}
