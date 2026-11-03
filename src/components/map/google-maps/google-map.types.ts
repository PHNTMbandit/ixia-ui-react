import type { DeckProps } from '@deck.gl/core'
import type { APIProviderProps, MapProps } from '@vis.gl/react-google-maps'
import type { GeoJsonProperties } from 'geojson'
import type { Key, ReactNode } from 'react'
import type { ClusterFeature, ClusterProperties, PointFeature } from 'supercluster'

import type { Button } from '@/components/button'
import type { ButtonGroup } from '@/components/button-group'

type GoogleMapProps = APIProviderProps
type GoogleMapFrameProps = MapProps
type GoogleMapGeolocateControlProps = React.ComponentProps<typeof Button> & {
  zoomLevel?: number
}
type GoogleMapZoomControlProps = React.ComponentProps<typeof ButtonGroup> & {
  step?: number
}
type GoogleMapDeckGLOverlayProps = Omit<DeckProps, 'layers'> & {
  interleaved?: boolean
}
type GoogleMapClusterLayerItem<
  Properties extends GeoJsonProperties,
  ClusterPropertiesValue extends GeoJsonProperties = ClusterProperties,
> = ClusterFeature<ClusterPropertiesValue> | PointFeature<Properties>

interface GoogleMapClusterRenderContext<Properties extends GeoJsonProperties> {
  getLeaves: () => PointFeature<Properties>[]
  getExpansionZoom: () => number
}

interface GoogleMapClusterLayerProps<
  Properties extends GeoJsonProperties,
  ClusterPropertiesValue extends GeoJsonProperties = ClusterProperties,
> {
  items: readonly GoogleMapClusterLayerItem<Properties, ClusterPropertiesValue>[]
  getKey: (item: PointFeature<Properties>) => Key
  getLeaves: (clusterId: number) => PointFeature<Properties>[]
  getClusterExpansionZoom: (clusterId: number) => number
  renderItem: (item: PointFeature<Properties>) => ReactNode
  renderCluster: (
    cluster: ClusterFeature<ClusterPropertiesValue>,
    context: GoogleMapClusterRenderContext<Properties>,
  ) => ReactNode
  children?: ReactNode
}

type GoogleMapTiltControlProps = React.ComponentProps<typeof Button>
export type {
  GoogleMapProps,
  GoogleMapFrameProps,
  GoogleMapGeolocateControlProps,
  GoogleMapZoomControlProps,
  GoogleMapDeckGLOverlayProps,
  GoogleMapTiltControlProps,
  GoogleMapClusterLayerItem,
  GoogleMapClusterRenderContext,
  GoogleMapClusterLayerProps,
}
