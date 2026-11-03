import { cva } from 'class-variance-authority'
import type { GeoJsonProperties } from 'geojson'
import type { ClusterFeature, ClusterProperties } from 'supercluster'

import type { GoogleMapClusterLayerItem } from './google-map.types'

const mapControlGroupVariants = cva(
  'absolute z-10 flex flex-col items-center justify-start gap-2xs',
  {
    defaultVariants: {
      position: 'bottom-right',
    },
    variants: {
      position: {
        'bottom-left': 'bottom-lg left-sm',
        'bottom-right': 'right-sm bottom-lg',
        'top-left': 'top-lg left-sm',
        'top-right': 'top-lg right-sm',
      },
    },
  },
)

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

export { getGoogleMapSuggestionLabel, mapControlGroupVariants, isClusterFeature }
