import type { GeoJsonProperties } from 'geojson'
import { Fragment } from 'react'
import type { ClusterProperties } from 'supercluster'

import type { GoogleMapClusterLayerProps } from './google-map.types'
import { isClusterFeature } from './google-map.utils'

export function GoogleMapClusterLayer<
  Properties extends GeoJsonProperties,
  ClusterPropertiesValue extends GeoJsonProperties = ClusterProperties,
>({
  items,
  getKey,
  getLeaves,
  getClusterExpansionZoom,
  renderItem,
  renderCluster,
  children,
}: GoogleMapClusterLayerProps<Properties, ClusterPropertiesValue>) {
  return (
    <>
      {items.map((item) => {
        if (isClusterFeature<Properties, ClusterPropertiesValue>(item)) {
          const clusterId = item.properties.cluster_id

          return (
            <Fragment key={`cluster-${clusterId}`}>
              {renderCluster(item, {
                getExpansionZoom: () => getClusterExpansionZoom(clusterId),
                getLeaves: () => getLeaves(clusterId),
              })}
            </Fragment>
          )
        }

        return <Fragment key={getKey(item)}>{renderItem(item)}</Fragment>
      })}
      {children}
    </>
  )
}
