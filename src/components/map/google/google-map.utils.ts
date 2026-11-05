import type { GeoJsonProperties } from 'geojson'
import type { ClusterFeature, ClusterProperties } from 'supercluster'

import type { GoogleMapClusterLayerItem } from './google-map.types'

interface GoogleMapSuggestionLabelValue {
  placePrediction: {
    text: {
      text: string
    }
  }
}

function isGoogleMapSuggestionLabelValue(
  itemValue: unknown,
): itemValue is GoogleMapSuggestionLabelValue {
  return (
    typeof itemValue === 'object' &&
    itemValue !== null &&
    'placePrediction' in itemValue &&
    typeof itemValue.placePrediction === 'object' &&
    itemValue.placePrediction !== null &&
    'text' in itemValue.placePrediction &&
    typeof itemValue.placePrediction.text === 'object' &&
    itemValue.placePrediction.text !== null &&
    'text' in itemValue.placePrediction.text &&
    typeof itemValue.placePrediction.text.text === 'string'
  )
}

function getGoogleMapSuggestionLabel(itemValue: unknown): string {
  if (!isGoogleMapSuggestionLabelValue(itemValue)) {
    return ''
  }

  return itemValue.placePrediction.text.text
}

function isClusterFeature<
  Properties extends GeoJsonProperties,
  ClusterPropertiesValue extends GeoJsonProperties = ClusterProperties,
>(
  item: GoogleMapClusterLayerItem<Properties, ClusterPropertiesValue>,
): item is ClusterFeature<ClusterPropertiesValue> {
  return (
    item.properties !== null && 'cluster' in item.properties && item.properties.cluster === true
  )
}

export { getGoogleMapSuggestionLabel, isClusterFeature }
