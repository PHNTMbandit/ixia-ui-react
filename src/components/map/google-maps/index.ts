import { GoogleMap as GoogleMapRoot } from './google-map'
import { GoogleMapCluster } from './google-map-cluster'
import { GoogleMapClusterLayer } from './google-map-cluster-layer'
import { GoogleMapDeckGLOverlay } from './google-map-deckgl-overlay'
import { GoogleMapFrame } from './google-map-frame'
import { GoogleMapGeolocateControl } from './google-map-geolocate-control'
import { GoogleMapMarker } from './google-map-marker'
import { GoogleMapMarkerLayer } from './google-map-marker-layer'
import { GoogleMapSearchControl } from './google-map-search-control'
import { GoogleMapSearchControlEmpty } from './google-map-search-control-empty'
import { GoogleMapSearchControlInput } from './google-map-search-control-input'
import { GoogleMapSearchControlInputGroup } from './google-map-search-control-input-group'
import { GoogleMapSearchControlSubmit } from './google-map-search-control-submit'
import { GoogleMapSearchControlSuggestion } from './google-map-search-control-suggestion'
import { GoogleMapTiltControl } from './google-map-tilt-control'
import { GoogleMapZoomControl } from './google-map-zoom-control'
import { GoogleMapSearchControlContent } from './google-maps-search-control-content'
import { GoogleMapsSearchControlResults } from './google-maps-search-control-results'
import { GoogleMapsSearchControlStatus } from './google-maps-search-control-status'

const GoogleMap = Object.assign(GoogleMapRoot, {
  Cluster: GoogleMapCluster,
  ClusterLayer: GoogleMapClusterLayer,
  DeckGLOverlay: GoogleMapDeckGLOverlay,
  Frame: GoogleMapFrame,
  GeolocateControl: GoogleMapGeolocateControl,
  Marker: GoogleMapMarker,
  MarkerLayer: GoogleMapMarkerLayer,
  SearchControl: GoogleMapSearchControl,
  SearchControlContent: GoogleMapSearchControlContent,
  SearchControlEmpty: GoogleMapSearchControlEmpty,
  SearchControlInput: GoogleMapSearchControlInput,
  SearchControlInputGroup: GoogleMapSearchControlInputGroup,
  SearchControlResults: GoogleMapsSearchControlResults,
  SearchControlStatus: GoogleMapsSearchControlStatus,
  SearchControlSubmit: GoogleMapSearchControlSubmit,
  SearchControlSuggestion: GoogleMapSearchControlSuggestion,
  TiltControl: GoogleMapTiltControl,
  ZoomControl: GoogleMapZoomControl,
})

export type {
  GoogleMapProps,
  GoogleMapGeolocateControlProps,
  GoogleMapFrameProps,
  GoogleMapZoomControlProps,
  GoogleMapDeckGLOverlayProps,
  GoogleMapTiltControlProps,
  GoogleMapClusterLayerProps,
  GoogleMapClusterLayerItem,
  GoogleMapClusterRenderContext,
} from './google-map.types'
export type { GoogleMapClusterProps } from './google-map-cluster'
export type { GoogleMapMarkerProps } from './google-map-marker'
export type { GoogleMapMarkerLayerProps } from './google-map-marker-layer'
export type {
  GoogleMapSearchControlValue,
  GoogleMapSearchControlContextProps,
  GoogleMapSearchControlProps,
  GoogleMapSearchControlInputProps,
  GoogleMapSearchControlSubmitProps,
  GoogleMapSearchControlSuggestionProps,
  GoogleMapSearchControlEmptyProps,
  GoogleMapsSearchControlResultsProps,
  GoogleMapsSearchControlStatusProps,
  GoogleMapSearchControlContentProps,
  GoogleMapSearchControlInputGroupProps,
} from './google-map-search-control.types'

export { GoogleMapFrame } from './google-map-frame'
export { GoogleMapGeolocateControl } from './google-map-geolocate-control'
export { GoogleMapSearchControl } from './google-map-search-control'
export { GoogleMapSearchControlInput } from './google-map-search-control-input'
export { GoogleMapSearchControlSubmit } from './google-map-search-control-submit'
export { GoogleMapSearchControlSuggestion } from './google-map-search-control-suggestion'
export { GoogleMapsSearchControlResults } from './google-maps-search-control-results'
export { GoogleMapZoomControl } from './google-map-zoom-control'
export { GoogleMapSearchControlEmpty } from './google-map-search-control-empty'
export { GoogleMapsSearchControlStatus } from './google-maps-search-control-status'
export { GoogleMapSearchControlContent } from './google-maps-search-control-content'
export { GoogleMapSearchControlInputGroup } from './google-map-search-control-input-group'
export { GoogleMapDeckGLOverlay } from './google-map-deckgl-overlay'
export { GoogleMapTiltControl } from './google-map-tilt-control'
export { GoogleMapMarker } from './google-map-marker'
export { GoogleMapCluster } from './google-map-cluster'
export { GoogleMapMarkerLayer } from './google-map-marker-layer'
export { GoogleMapClusterLayer } from './google-map-cluster-layer'

export { useGoogleMapSearchControl } from './google-map-search-control.context'
export { GoogleMap }
