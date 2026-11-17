# Google Map

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

Google Maps components built on `@vis.gl/react-google-maps`, with Places search, deck.gl overlays, and Google Maps marker overlays. DeckGL layers and marker overlays share one Map layer list and visibility state. Examples use local Tokyo data and require VITE_GOOGLE_MAPS_API_KEY in .env.local.

## Import

```tsx
import { GoogleMap } from 'ixia-ui-react/map/google'
```

## Runtime exports

- `GoogleMapFrame`
- `GoogleMapGeolocateControl`
- `GoogleMapSearchControl`
- `GoogleMapSearchControlInput`
- `GoogleMapSearchControlSubmit`
- `GoogleMapSearchControlSuggestion`
- `GoogleMapsSearchControlResults`
- `GoogleMapZoomControl`
- `GoogleMapSearchControlEmpty`
- `GoogleMapsSearchControlStatus`
- `GoogleMapSearchControlContent`
- `GoogleMapSearchControlInputGroup`
- `GoogleMapDeckGLOverlay`
- `GoogleMapTiltControl`
- `GoogleMapMarker`
- `GoogleMapCluster`
- `GoogleMapMarkerLayer`
- `GoogleMapClusterLayer`
- `useGoogleMapSearchControl`
- `GoogleMap`
- `useGoogleMapViewport`
- `useSupercluster`

## Type exports

- `GoogleMapProps`
- `GoogleMapGeolocateControlProps`
- `GoogleMapFrameProps`
- `GoogleMapZoomControlProps`
- `GoogleMapDeckGLOverlayProps`
- `GoogleMapTiltControlProps`
- `GoogleMapClusterLayerProps`
- `GoogleMapClusterLayerItem`
- `GoogleMapClusterRenderContext`
- `GoogleMapClusterProps`
- `GoogleMapMarkerProps`
- `GoogleMapMarkerLayerProps`
- `GoogleMapSearchControlValue`
- `GoogleMapSearchControlContextProps`
- `GoogleMapSearchControlProps`
- `GoogleMapSearchControlInputProps`
- `GoogleMapSearchControlSubmitProps`
- `GoogleMapSearchControlSuggestionProps`
- `GoogleMapSearchControlEmptyProps`
- `GoogleMapsSearchControlResultsProps`
- `GoogleMapsSearchControlStatusProps`
- `GoogleMapSearchControlContentProps`
- `GoogleMapSearchControlInputGroupProps`
- `UseGoogleMapViewportOptions`
- `UseGoogleMapViewportResult`
- `UseSuperclusterOptions`
- `UseSuperclusterResult`

## Compound parts

### GoogleMap

- `GoogleMap.Cluster`
- `GoogleMap.ClusterLayer`
- `GoogleMap.DeckGLOverlay`
- `GoogleMap.Frame`
- `GoogleMap.GeolocateControl`
- `GoogleMap.Marker`
- `GoogleMap.MarkerLayer`
- `GoogleMap.SearchControl`
- `GoogleMap.SearchControlContent`
- `GoogleMap.SearchControlEmpty`
- `GoogleMap.SearchControlInput`
- `GoogleMap.SearchControlInputGroup`
- `GoogleMap.SearchControlResults`
- `GoogleMap.SearchControlStatus`
- `GoogleMap.SearchControlSubmit`
- `GoogleMap.SearchControlSuggestion`
- `GoogleMap.TiltControl`
- `GoogleMap.ZoomControl`

## Optional peer dependencies

`@vis.gl/react-google-maps` `@deck.gl/core` `@deck.gl/google-maps` `@tanstack/react-pacer` `supercluster` `@types/google.maps` `@types/geojson`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/map/google/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/map/google/google-map.stories.tsx)
- [Getting started](../guides/getting-started.md)
