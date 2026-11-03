import {
  ArcLayer,
  GeoJsonLayer,
  LineLayer,
  PathLayer,
  PolygonLayer,
  ScatterplotLayer,
} from '@deck.gl/layers'
import {
  ArrowsLeftRightIcon,
  GlobeHemisphereWestIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MapPinLineIcon,
  PathIcon,
  PolygonIcon,
  ShareNetworkIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useMap } from '@vis.gl/react-google-maps'
import type { FeatureCollection, Point } from 'geojson'
import React from 'react'

import { useGoogleMapViewport, useSupercluster } from '@/hooks'

import { Map } from '../index'
import type {
  DeckGLLayerConfig,
  MapLayerConfig,
  MapLayerGroupConfig,
  MarkerOverlayConfig,
} from '../map.types'
import { getGoogleMapSuggestionLabel } from './google-map.utils'
import { GoogleMap } from './index'

// Read from a git-ignored .env.local: VITE_GOOGLE_MAPS_API_KEY=...
const GOOGLE_MAPS_API_KEY =
  (import.meta as unknown as { env: { VITE_GOOGLE_MAPS_API_KEY?: string } }).env
    .VITE_GOOGLE_MAPS_API_KEY ?? ''

const DEFAULT_CENTER = { lat: 35.6595, lng: 139.7004 },
  DEFAULT_ZOOM = 12,
  LOCATION_ZOOM = 16

interface DemoMarkerProperties {
  id: number
  name: string
}

const DEMO_MARKERS: FeatureCollection<Point, DemoMarkerProperties> = {
  type: 'FeatureCollection',
  features: Array.from({ length: 80 }, (_, id) => {
    const center = [
        { lat: 35.6595, lng: 139.7004 },
        { lat: 35.6909, lng: 139.7006 },
        { lat: 35.6812, lng: 139.7671 },
        { lat: 35.7141, lng: 139.777 },
      ][Math.floor(id / 20)],
      angle = id * 2.399963,
      radius = 0.002 + (id % 10) * 0.0007

    return {
      type: 'Feature',
      id,
      properties: { id, name: `Marker ${id + 1}` },
      geometry: {
        type: 'Point',
        coordinates: [center.lng + Math.cos(angle) * radius, center.lat + Math.sin(angle) * radius],
      },
    }
  }),
}

const DEMO_CLUSTER_OPTIONS = { maxZoom: 16, radius: 60 }

function renderDemoMarker(feature: (typeof DEMO_MARKERS.features)[number]) {
  const [lng, lat] = feature.geometry.coordinates

  return (
    <GoogleMap.Marker
      key={feature.properties.id}
      position={{ lat, lng }}
      title={feature.properties.name}
      onClick={() => console.log(feature.properties.name)}
    >
      <div className="bg-primary text-on-primary flex size-lg items-center justify-center rounded-full border-2 border-white shadow-md">
        <MapPinIcon size={16} weight="fill" />
      </div>
    </GoogleMap.Marker>
  )
}

const MARKER_OVERLAY_CONFIG = {
  id: 'tokyo-markers',
  kind: 'marker',
  name: 'Tokyo markers',
  icon: <MapPinLineIcon />,
  visible: true,
} satisfies MarkerOverlayConfig

interface TokyoLocation {
  name: string
  position: [number, number]
}

const TOKYO_LOCATIONS: TokyoLocation[] = [
  { name: 'Shibuya', position: [139.7004, 35.6595] },
  { name: 'Shinjuku', position: [139.7006, 35.6909] },
  { name: 'Tokyo Station', position: [139.7671, 35.6812] },
  { name: 'Ueno', position: [139.777, 35.7141] },
  { name: 'Asakusa', position: [139.7967, 35.7119] },
  { name: 'Roppongi', position: [139.731, 35.6628] },
]

interface TokyoConnection {
  source: [number, number]
  target: [number, number]
}

interface TokyoRoute {
  path: [number, number][]
}

interface TokyoArea {
  polygon: [number, number][]
}

const TOKYO_CONNECTIONS: TokyoConnection[] = [
    { source: [139.7004, 35.6595], target: [139.7006, 35.6909] },
    { source: [139.7004, 35.6595], target: [139.7671, 35.6812] },
    { source: [139.7671, 35.6812], target: [139.777, 35.7141] },
    { source: [139.777, 35.7141], target: [139.7967, 35.7119] },
  ],
  TOKYO_ROUTES: TokyoRoute[] = [
    {
      path: [
        [139.7004, 35.6595],
        [139.7105, 35.669],
        [139.7006, 35.6909],
        [139.735, 35.691],
        [139.7671, 35.6812],
      ],
    },
  ],
  TOKYO_AREAS: TokyoArea[] = [
    {
      polygon: [
        [139.716, 35.6805],
        [139.725, 35.6805],
        [139.725, 35.689],
        [139.716, 35.689],
        [139.716, 35.6805],
      ],
    },
  ]

const TOKYO_LAYER_CONFIG = {
  id: 'tokyo-locations',
  kind: 'deckgl',
  name: 'Tokyo Locations',
  icon: <MapPinIcon />,
  visualLayer: new ScatterplotLayer<TokyoLocation>(),
  layerProps: {
    data: TOKYO_LOCATIONS,
    getPosition: (location) => location.position,
    getFillColor: [0, 170, 160, 180],
    getLineColor: [255, 255, 255, 230],
    getRadius: 200,
    radiusMinPixels: 7,
    radiusMaxPixels: 30,
    stroked: true,
    lineWidthMinPixels: 2,
  },
} satisfies DeckGLLayerConfig<ScatterplotLayer<TokyoLocation>>

const layers = [TOKYO_LAYER_CONFIG]

const LINE_LAYER_CONFIG = {
  id: 'tokyo-lines',
  kind: 'deckgl',
  name: 'Direct connections',
  icon: <ArrowsLeftRightIcon />,
  visualLayer: new LineLayer<TokyoConnection>(),
  layerProps: {
    data: TOKYO_CONNECTIONS,
    getSourcePosition: (connection) => connection.source,
    getTargetPosition: (connection) => connection.target,
    getColor: [60, 130, 230, 220],
    getWidth: 4,
    widthMinPixels: 2,
  },
} satisfies DeckGLLayerConfig<LineLayer<TokyoConnection>>

const ARC_LAYER_CONFIG = {
  id: 'tokyo-arcs',
  kind: 'deckgl',
  name: 'Origin-destination arcs',
  icon: <ShareNetworkIcon />,
  visualLayer: new ArcLayer<TokyoConnection>(),
  layerProps: {
    data: TOKYO_CONNECTIONS,
    getSourcePosition: (connection) => connection.source,
    getTargetPosition: (connection) => connection.target,
    getSourceColor: [0, 170, 160, 220],
    getTargetColor: [220, 100, 80, 220],
    getWidth: 5,
  },
} satisfies DeckGLLayerConfig<ArcLayer<TokyoConnection>>

const PATH_LAYER_CONFIG = {
  id: 'tokyo-paths',
  kind: 'deckgl',
  name: 'Multi-stop route',
  icon: <PathIcon />,
  visualLayer: new PathLayer<TokyoRoute>(),
  layerProps: {
    data: TOKYO_ROUTES,
    getPath: (route) => route.path,
    getColor: [160, 90, 220, 230],
    getWidth: 5,
    widthUnits: 'pixels',
    jointRounded: true,
    capRounded: true,
  },
} satisfies DeckGLLayerConfig<PathLayer<TokyoRoute>>

const POLYGON_LAYER_CONFIG = {
  id: 'tokyo-polygons',
  kind: 'deckgl',
  name: 'Area boundary',
  icon: <PolygonIcon />,
  visualLayer: new PolygonLayer<TokyoArea>(),
  layerProps: {
    data: TOKYO_AREAS,
    getPolygon: (area) => area.polygon,
    getFillColor: [0, 170, 160, 70],
    getLineColor: [0, 140, 130, 230],
    lineWidthMinPixels: 2,
    stroked: true,
    filled: true,
  },
} satisfies DeckGLLayerConfig<PolygonLayer<TokyoArea>>

const GEOJSON_LAYER_CONFIG = {
  id: 'tokyo-geojson',
  kind: 'deckgl',
  name: 'GeoJSON district',
  icon: <GlobeHemisphereWestIcon />,
  visualLayer: new GeoJsonLayer(),
  layerProps: {
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: 'Example district' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [139.755, 35.699],
                [139.77, 35.699],
                [139.77, 35.71],
                [139.755, 35.71],
                [139.755, 35.699],
              ],
            ],
          },
        },
      ],
    },
    getFillColor: [230, 160, 40, 70],
    getLineColor: [210, 130, 20, 230],
    lineWidthMinPixels: 2,
    stroked: true,
    filled: true,
  },
} satisfies DeckGLLayerConfig<GeoJsonLayer>

export default {
  title: 'Components/Map/Google Map',
  component: GoogleMap,
  // Excluded from the automated test run: rendering loads the live Google Maps SDK over the network.
  tags: ['!test'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Google Maps components built on `@vis.gl/react-google-maps`, with Places search, deck.gl overlays, and Google Maps marker overlays. DeckGL layers and marker overlays share one Map layer list and visibility state. Examples use local Tokyo data and require VITE_GOOGLE_MAPS_API_KEY in .env.local.',
      },
    },
  },
  decorators: [
    (Story, context) => {
      const currentTheme = context.globals.theme

      if (!GOOGLE_MAPS_API_KEY) {
        return (
          <div className="flex h-dvh w-full items-center justify-center p-lg text-center">
            <p className="style-text-default--1 text-on-surface-variant">
              Set <code>VITE_GOOGLE_MAPS_API_KEY</code> in a <code>.env.local</code> file to load
              the map.
            </p>
          </div>
        )
      }
      return (
        <GoogleMap apiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap.Frame
            className="h-dvh w-full"
            mapId="DEMO_MAP_ID"
            tiltInteractionEnabled
            colorScheme={currentTheme === 'dark' ? 'DARK' : 'LIGHT'}
            defaultCenter={DEFAULT_CENTER}
            defaultZoom={DEFAULT_ZOOM}
            renderingType="VECTOR"
            disableDefaultUI
            gestureHandling="greedy"
          >
            <Story />
          </GoogleMap.Frame>
        </GoogleMap>
      )
    },
  ],
} satisfies Meta<typeof GoogleMap>

type Story = StoryObj<typeof GoogleMap>

function GoogleMapShowcase({ children }: { children?: React.ReactNode }) {
  const map = useMap(),
    handleSuggestionSelect = async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      const place = suggestion.placePrediction?.toPlace()

      if (!place) {
        return
      }

      await place.fetchFields({ fields: ['location', 'viewport'] })

      if (place.viewport) {
        map?.fitBounds(place.viewport)
      } else if (place.location) {
        map?.moveCamera({ center: place.location, zoom: LOCATION_ZOOM })
      }
    }

  return (
    <>
      <GoogleMap.SearchControl
        openOnInputClick
        itemToStringValue={getGoogleMapSuggestionLabel}
        onSuggestionSelect={handleSuggestionSelect}
      >
        <GoogleMap.SearchControlInputGroup
          className="absolute top-sm left-sm z-10 w-1/4"
          size={'large'}
        >
          <GoogleMap.SearchControlInput placeholder="Search for a place" />
          <GoogleMap.SearchControlSubmit size="medium" tone="neutral" variant={'ghost'}>
            <MagnifyingGlassIcon weight="bold" />
          </GoogleMap.SearchControlSubmit>
        </GoogleMap.SearchControlInputGroup>
        <GoogleMap.SearchControlContent>
          <GoogleMap.SearchControlEmpty>
            <p>No results found</p>
          </GoogleMap.SearchControlEmpty>
          <GoogleMap.SearchControlStatus>
            {({ isPending, results }) => (
              <span>
                {isPending && <p>Loading...</p>}
                {!isPending && <p>{results?.length} result found</p>}
              </span>
            )}
          </GoogleMap.SearchControlStatus>
          <GoogleMap.SearchControlResults>
            {(result) => (
              <GoogleMap.SearchControlSuggestion
                key={result.placePrediction?.placeId}
                suggestion={result}
                value={result}
              >
                {(item) => (
                  <>
                    <MapPinIcon className="size-md shrink-0" weight="fill" />
                    <div className="flex flex-col items-start">
                      <span className="style-text-default--1">
                        {item.placePrediction?.mainText?.text}
                      </span>
                      <span className="style-text-prose--2 text-on-surface-variant">
                        {item.placePrediction?.secondaryText?.text}
                      </span>
                    </div>
                  </>
                )}
              </GoogleMap.SearchControlSuggestion>
            )}
          </GoogleMap.SearchControlResults>
        </GoogleMap.SearchControlContent>
      </GoogleMap.SearchControl>
      <Map.ControlGroup position="bottom-right">
        <GoogleMap.TiltControl />
        <GoogleMap.GeolocateControl />
        <GoogleMap.ZoomControl orientation="vertical" />
      </Map.ControlGroup>
      {children}
    </>
  )
}

export const Playground: Story = {
  render: () => <GoogleMapShowcase />,
}

export const DeckglOverlay: Story = {
  render: () => <LayerShowcase initialLayers={layers} />,
}

function LayerShowcase({
  initialLayers,
  clusteredMarkers = false,
}: {
  initialLayers: MapLayerConfig[]
  clusteredMarkers?: boolean
}) {
  const [mapLayers, setMapLayers] = React.useState(initialLayers)

  return (
    <Map
      layers={mapLayers}
      onVisibilityChange={(layer, visible) => {
        setMapLayers((previous) =>
          previous.map((entry) => (entry.id === layer.id ? { ...entry, visible } : entry)),
        )
      }}
    >
      <GoogleMapShowcase>
        <Map.ControlGroup position="bottom-left">
          <Map.LayerList>
            {(layer) => (
              <Map.LayerItem key={layer.id} layer={layer}>
                <Map.LayerIcon />
                <Map.LayerName />
                <Map.LayerVisibilityToggle />
              </Map.LayerItem>
            )}
          </Map.LayerList>
        </Map.ControlGroup>
        <GoogleMap.DeckGLOverlay interleaved />
        {mapLayers.some((layer) => layer.kind === 'marker' && layer.visible !== false) &&
          (clusteredMarkers ? (
            <ClusteredDemoMarkerLayer />
          ) : (
            <GoogleMap.MarkerLayer
              items={DEMO_MARKERS.features.slice(0, 8)}
              getKey={(feature) => feature.properties.id}
              renderItem={renderDemoMarker}
            />
          ))}
      </GoogleMapShowcase>
    </Map>
  )
}

function ClusteredDemoMarkerLayer() {
  const map = useMap(),
    { bounds, zoom } = useGoogleMapViewport(),
    { clusters, getLeaves, getClusterExpansionZoom } = useSupercluster({
      geojson: DEMO_MARKERS,
      bounds,
      zoom,
      options: DEMO_CLUSTER_OPTIONS,
    })

  return (
    <GoogleMap.ClusterLayer
      items={clusters}
      getLeaves={getLeaves}
      getClusterExpansionZoom={getClusterExpansionZoom}
      getKey={(feature) => feature.properties.id}
      renderItem={renderDemoMarker}
      renderCluster={(feature, { getExpansionZoom }) => {
        const [lng, lat] = feature.geometry.coordinates,
          expansionZoom = getExpansionZoom()

        return (
          <GoogleMap.Cluster
            key={feature.properties.cluster_id}
            count={feature.properties.point_count}
            label={`${feature.properties.point_count} markers. Click to zoom in.`}
            position={{ lat, lng }}
            title={`${feature.properties.point_count} markers. Click to zoom in.`}
            onClick={() => map?.moveCamera({ center: { lat, lng }, zoom: expansionZoom })}
          />
        )
      }}
    />
  )
}

function layerStory(configs: MapLayerConfig[], description: string): Story {
  return {
    parameters: { docs: { description: { story: description } } },
    render: () => <LayerShowcase initialLayers={configs} />,
  }
}

function MarkerShowcase({ clustered }: { clustered: boolean }) {
  const map = useMap(),
    [mapLayers, setMapLayers] = React.useState<MapLayerConfig[]>([MARKER_OVERLAY_CONFIG]),
    markersVisible = mapLayers[0].visible !== false,
    { bounds, zoom } = useGoogleMapViewport(),
    { clusters, getLeaves, getClusterExpansionZoom } = useSupercluster({
      geojson: DEMO_MARKERS,
      bounds,
      zoom,
      options: DEMO_CLUSTER_OPTIONS,
    })

  return (
    <Map
      layers={mapLayers}
      onVisibilityChange={(layer, visible) => {
        setMapLayers((current) =>
          current.map((entry) => (entry.id === layer.id ? { ...entry, visible } : entry)),
        )
      }}
    >
      <GoogleMapShowcase>
        <div className="absolute top-sm left-sm z-10 rounded-md border-border px-md py-sm text-on-surface shadow-md backdrop-blur-lg">
          <p className="style-text-strong--1">
            {clustered ? 'Superclusters' : 'Individual markers'}
          </p>
          <p className="style-text-default--2">
            {clustered
              ? 'Zoom in or click a cluster to expand it.'
              : '80 sample locations around Tokyo.'}
          </p>
        </div>
        <Map.ControlGroup position="bottom-left">
          <Map.LayerList>
            {(layer) => (
              <Map.LayerItem key={layer.id} layer={layer}>
                <Map.LayerIcon />
                <Map.LayerName />
                <Map.LayerVisibilityToggle />
              </Map.LayerItem>
            )}
          </Map.LayerList>
        </Map.ControlGroup>
        {markersVisible &&
          (clustered ? (
            <GoogleMap.ClusterLayer
              items={clusters}
              getLeaves={getLeaves}
              getClusterExpansionZoom={getClusterExpansionZoom}
              getKey={(feature) => feature.properties.id}
              renderItem={renderDemoMarker}
              renderCluster={(feature, { getExpansionZoom }) => {
                const [lng, lat] = feature.geometry.coordinates,
                  expansionZoom = getExpansionZoom()

                return (
                  <GoogleMap.Cluster
                    key={feature.properties.cluster_id}
                    count={feature.properties.point_count}
                    label={`${feature.properties.point_count} markers. Click to zoom in.`}
                    position={{ lat, lng }}
                    title={`${feature.properties.point_count} markers. Click to zoom in.`}
                    onClick={() => map?.moveCamera({ center: { lat, lng }, zoom: expansionZoom })}
                  />
                )
              }}
            />
          ) : (
            <GoogleMap.MarkerLayer
              items={DEMO_MARKERS.features}
              getKey={(feature) => feature.properties.id}
              renderItem={renderDemoMarker}
            />
          ))}
      </GoogleMapShowcase>
    </Map>
  )
}

export const LayerVisibility: Story = layerStory(
  layers,
  'Toggle a layer through the Map provider. The overlay and layer list share the same visibility state.',
)

export const LayerGroups: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Group map layers under labels provided by the Map layer-group context.',
      },
    },
  },
  render: () => (
    <LayerGroupShowcase
      groups={[
        { id: 'locations', name: 'Locations', layers: [TOKYO_LAYER_CONFIG] },
        { id: 'routes', name: 'Routes', layers: [LINE_LAYER_CONFIG, PATH_LAYER_CONFIG] },
        { id: 'areas', name: 'Areas', layers: [POLYGON_LAYER_CONFIG, GEOJSON_LAYER_CONFIG] },
      ]}
    />
  ),
}

function LayerGroupShowcase({ groups }: { groups: MapLayerGroupConfig[] }) {
  const [mapLayers, setMapLayers] = React.useState<MapLayerConfig[]>(() =>
    groups.flatMap((group) => group.layers),
  )

  return (
    <Map
      layers={mapLayers}
      onVisibilityChange={(layer, visible) => {
        setMapLayers((current) =>
          current.map((entry) => (entry.id === layer.id ? { ...entry, visible } : entry)),
        )
      }}
    >
      <GoogleMapShowcase>
        <Map.ControlGroup position="bottom-left">
          <Map.LayerGroupList groups={groups}>
            {(group) => (
              <Map.LayerGroup key={group.id} group={group}>
                <Map.LayerGroupLabel />
                <Map.LayerGroupLayerList>
                  {(layer) => (
                    <Map.LayerItem key={layer.id} layer={layer}>
                      <Map.LayerIcon />
                      <Map.LayerName />
                      <Map.LayerVisibilityToggle />
                    </Map.LayerItem>
                  )}
                </Map.LayerGroupLayerList>
              </Map.LayerGroup>
            )}
          </Map.LayerGroupList>
        </Map.ControlGroup>
        <GoogleMap.DeckGLOverlay interleaved />
      </GoogleMapShowcase>
    </Map>
  )
}

export const Markers: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Render individual Google Maps markers from GeoJSON point features.',
      },
    },
  },
  render: () => <MarkerShowcase clustered={false} />,
}

export const Superclusters: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the Supercluster hook to group nearby GeoJSON points. The clusters update with map bounds and zoom; click a cluster to zoom into its expansion level.',
      },
    },
  },
  render: () => <MarkerShowcase clustered />,
}

export const Scatterplot: Story = layerStory(
  layers,
  'ScatterplotLayer renders point locations as circles. Use it for stations, events, or sensor readings; radiusMinPixels keeps small points readable.',
)

export const Line: Story = layerStory(
  [LINE_LAYER_CONFIG],
  'LineLayer draws straight source-to-target connections. Use it for links between locations, rather than multi-stop routes.',
)

export const Arc: Story = layerStory(
  [ARC_LAYER_CONFIG],
  'ArcLayer renders raised origin-destination flows with source and target colors. Tilt the map to see the height of the arcs.',
)

export const Path: Story = layerStory(
  [PATH_LAYER_CONFIG],
  'PathLayer follows a sequence of coordinates. Use it for journeys, road segments, or tracks; this example uses pixel-width rounded strokes.',
)

export const Polygon: Story = layerStory(
  [POLYGON_LAYER_CONFIG],
  'PolygonLayer fills and outlines areas defined by coordinate rings. Use it for boundaries, zones, or building footprints.',
)

export const GeoJson: Story = layerStory(
  [GEOJSON_LAYER_CONFIG],
  'GeoJsonLayer consumes standard GeoJSON features. This local FeatureCollection demonstrates a filled district boundary without an external data request.',
)

export const MixedLayers: Story = layerStory(
  [
    MARKER_OVERLAY_CONFIG,
    POLYGON_LAYER_CONFIG,
    GEOJSON_LAYER_CONFIG,
    PATH_LAYER_CONFIG,
    LINE_LAYER_CONFIG,
    ARC_LAYER_CONFIG,
    TOKYO_LAYER_CONFIG,
  ],
  'DeckGL geometry layers and a Google Maps marker overlay share one layer list and visibility callback. Toggle each independently.',
)

export const MixedLayersWithClusters: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'DeckGL geometry layers and a Supercluster-backed Google Maps marker overlay share one layer list and visibility state. Toggle layers independently and zoom or click clusters to inspect markers.',
      },
    },
  },
  render: () => (
    <LayerShowcase
      clusteredMarkers
      initialLayers={[
        MARKER_OVERLAY_CONFIG,
        POLYGON_LAYER_CONFIG,
        GEOJSON_LAYER_CONFIG,
        PATH_LAYER_CONFIG,
        LINE_LAYER_CONFIG,
        ARC_LAYER_CONFIG,
        TOKYO_LAYER_CONFIG,
      ]}
    />
  ),
}
