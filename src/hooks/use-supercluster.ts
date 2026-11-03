'use no memo'

import type { BBox, FeatureCollection, GeoJsonProperties, Point } from 'geojson'
import { useCallback, useMemo } from 'react'
import Supercluster from 'supercluster'
import type { ClusterFeature, ClusterProperties, Options, PointFeature } from 'supercluster'

const DEFAULT_OFFSET = 0

interface UseSuperclusterOptions<
  Properties extends GeoJsonProperties,
  ClusterPropertiesValue extends GeoJsonProperties,
> {
  geojson: FeatureCollection<Point, Properties>
  bounds: BBox
  zoom: number
  options?: Options<Properties, ClusterPropertiesValue>
}

interface UseSuperclusterResult<
  Properties extends GeoJsonProperties,
  ClusterPropertiesValue extends GeoJsonProperties,
> {
  clusters: (ClusterFeature<ClusterPropertiesValue> | PointFeature<Properties>)[]
  getChildren: (
    clusterId: number,
  ) => (ClusterFeature<ClusterPropertiesValue> | PointFeature<Properties>)[]
  getClusterExpansionZoom: (clusterId: number) => number
  getLeaves: (clusterId: number, limit?: number, offset?: number) => PointFeature<Properties>[]
}

export function useSupercluster<
  Properties extends GeoJsonProperties,
  ClusterPropertiesValue extends GeoJsonProperties = ClusterProperties,
>({
  geojson,
  bounds,
  zoom,
  options,
}: UseSuperclusterOptions<Properties, ClusterPropertiesValue>): UseSuperclusterResult<
  Properties,
  ClusterPropertiesValue
> {
  // Supercluster owns a mutable index; memoize it only when its input features or options change.
  // eslint-disable-next-line react/preserve-manual-memoization
  const index = useMemo(() => {
      const clusterIndex = new Supercluster<Properties, ClusterPropertiesValue>(options)
      return clusterIndex.load(geojson.features)
    }, [geojson.features, options]),
    clusters = useMemo(() => index.getClusters(bounds, zoom), [bounds, index, zoom]),
    getChildren = useCallback((clusterId: number) => index.getChildren(clusterId), [index]),
    getClusterExpansionZoom = useCallback(
      (clusterId: number) => index.getClusterExpansionZoom(clusterId),
      [index],
    ),
    getLeaves = useCallback(
      (clusterId: number, limit = Infinity, offset = DEFAULT_OFFSET) =>
        index.getLeaves(clusterId, limit, offset),
      [index],
    )

  return { clusters, getChildren, getClusterExpansionZoom, getLeaves }
}

export type { UseSuperclusterOptions, UseSuperclusterResult }
