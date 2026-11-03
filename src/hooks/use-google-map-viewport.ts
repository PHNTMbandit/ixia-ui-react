import { useMap } from '@vis.gl/react-google-maps'
import type { BBox } from 'geojson'
import { useEffect, useState } from 'react'

interface UseGoogleMapViewportOptions {
  padding?: number
}

interface UseGoogleMapViewportResult {
  bounds: BBox
  zoom: number
}

const DEFAULT_PADDING = 0,
  MAX_LONGITUDE = 180,
  MIN_LONGITUDE = -MAX_LONGITUDE,
  MAX_LATITUDE = 90,
  MIN_LATITUDE = -MAX_LATITUDE,
  INITIAL_BOUNDS: BBox = [MIN_LONGITUDE, MIN_LATITUDE, MAX_LONGITUDE, MAX_LATITUDE],
  INITIAL_ZOOM = 0,
  WORLD_LONGITUDE_SPAN = 360,
  ZOOM_BASE = 2,
  TILE_SIZE = 256

export function useGoogleMapViewport({
  padding = DEFAULT_PADDING,
}: UseGoogleMapViewportOptions = {}): UseGoogleMapViewportResult {
  const map = useMap(),
    [bounds, setBounds] = useState<BBox>(INITIAL_BOUNDS),
    [zoom, setZoom] = useState(INITIAL_ZOOM)

  useEffect(() => {
    if (!map) {
      return undefined
    }

    const updateViewport = () => {
        const mapBounds = map.getBounds(),
          mapZoom = map.getZoom(),
          southwest = mapBounds?.getSouthWest(),
          northeast = mapBounds?.getNorthEast(),
          paddingDegrees =
            (WORLD_LONGITUDE_SPAN / (ZOOM_BASE ** (mapZoom ?? INITIAL_ZOOM) * TILE_SIZE)) * padding

        if (!southwest || !northeast || mapZoom === undefined) {
          return
        }

        setBounds([
          southwest.lng() - paddingDegrees,
          Math.max(MIN_LATITUDE, southwest.lat() - paddingDegrees),
          northeast.lng() + paddingDegrees,
          Math.min(MAX_LATITUDE, northeast.lat() + paddingDegrees),
        ])
        setZoom(mapZoom)
      },
      listener = map.addListener('idle', updateViewport)

    updateViewport()
    return () => listener.remove()
  }, [map, padding])

  return { bounds, zoom }
}

export type { UseGoogleMapViewportOptions, UseGoogleMapViewportResult }
