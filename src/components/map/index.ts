import { Map as MapRoot } from './map'
import { MapControlGroup } from './map-control-group'
import { MapLayerGroup } from './map-layer-group'
import { MapLayerGroupLabel } from './map-layer-group-label'
import { MapLayerGroupLayerList } from './map-layer-group-layer-list'
import { MapLayerGroupList } from './map-layer-group-list'
import { MapLayerIcon } from './map-layer-icon'
import { MapLayerItem } from './map-layer-item'
import { MapLayerList } from './map-layer-list'
import { MapLayerName } from './map-layer-name'
import { MapLayerVisibilityToggle } from './map-layer-visibility-toggle'

const Map = Object.assign(MapRoot, {
  ControlGroup: MapControlGroup,
  LayerGroup: MapLayerGroup,
  LayerGroupLabel: MapLayerGroupLabel,
  LayerGroupLayerList: MapLayerGroupLayerList,
  LayerGroupList: MapLayerGroupList,
  LayerIcon: MapLayerIcon,
  LayerItem: MapLayerItem,
  LayerList: MapLayerList,
  LayerName: MapLayerName,
  LayerVisibilityToggle: MapLayerVisibilityToggle,
})

export {
  GoogleMap,
  GoogleMapCluster,
  GoogleMapClusterLayer,
  GoogleMapDeckGLOverlay,
  GoogleMapFrame,
  GoogleMapGeolocateControl,
  GoogleMapMarker,
  GoogleMapMarkerLayer,
  GoogleMapSearchControl,
  GoogleMapSearchControlContent,
  GoogleMapSearchControlEmpty,
  GoogleMapSearchControlInput,
  GoogleMapSearchControlInputGroup,
  GoogleMapSearchControlSubmit,
  GoogleMapSearchControlSuggestion,
  GoogleMapsSearchControlResults,
  GoogleMapsSearchControlStatus,
  GoogleMapZoomControl,
  useGoogleMapSearchControl,
  GoogleMapTiltControl,
} from './google-maps'
export type {
  GoogleMapProps,
  GoogleMapClusterProps,
  GoogleMapClusterLayerProps,
  GoogleMapClusterLayerItem,
  GoogleMapClusterRenderContext,
  GoogleMapDeckGLOverlayProps,
  GoogleMapGeolocateControlProps,
  GoogleMapFrameProps,
  GoogleMapMarkerLayerProps,
  GoogleMapMarkerProps,
  GoogleMapZoomControlProps,
  GoogleMapSearchControlValue,
  GoogleMapSearchControlContextProps,
  GoogleMapSearchControlProps,
  GoogleMapSearchControlInputProps,
  GoogleMapSearchControlInputGroupProps,
  GoogleMapSearchControlSubmitProps,
  GoogleMapSearchControlSuggestionProps,
  GoogleMapSearchControlEmptyProps,
  GoogleMapsSearchControlResultsProps,
  GoogleMapsSearchControlStatusProps,
  GoogleMapSearchControlContentProps,
  GoogleMapTiltControlProps,
} from './google-maps'

export { MapControlGroup } from './map-control-group'
export { MapLayerList } from './map-layer-list'
export { MapLayerItem } from './map-layer-item'
export { MapLayerName } from './map-layer-name'
export { useMapLayerItem } from './map-layer-item.context'
export { useIxiaMap } from './map.context'
export { MapLayerVisibilityToggle } from './map-layer-visibility-toggle'
export { MapLayerIcon } from './map-layer-icon'
export { MapLayerGroup } from './map-layer-group'
export { MapLayerGroupLabel } from './map-layer-group-label'
export { MapLayerGroupLayerList } from './map-layer-group-layer-list'
export { MapLayerGroupList } from './map-layer-group-list'
export { useMapLayerGroup } from './map-layer-group.context'
export type {
  MapLayerIconProps,
  MapLayerListProps,
  MapLayerItemProps,
  MapLayerItemContextValue,
  MapLayerVisibilityToggleProps,
  GeometryLayerConfig,
  DeckGLLayerConfig,
  MarkerOverlayConfig,
  MapLayerConfig,
  MapLayerMetadata,
  MapControlGroupProps,
  MapLayerNameProps,
  MapLayerGroupConfig,
  MapContextValue,
  MapProps,
  MapLayerGroupProps,
  MapLayerGroupLabelProps,
  MapLayerGroupListProps,
  MapLayerGroupLayerListProps,
  MapLayerGroupContextValue,
} from './map.types'
export { Map }
