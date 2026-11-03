import type { Layer, LayerProps } from '@deck.gl/core'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps, ReactNode } from 'react'

import type { Button } from '../button'
import type { PopoverPanel } from '../popover'
import type { mapControlGroupVariants } from './map.utils'

interface MapLayerMetadata {
  icon?: ReactNode
  id: string
  kind: 'deckgl' | 'marker'
  name: string
  visibilityZoom?: number
  visible?: boolean
}

interface DeckGLLayerConfig<LayerType extends Layer = Layer> extends MapLayerMetadata {
  kind: 'deckgl'
  layerProps: Omit<Partial<LayerType['props']> & LayerProps, 'id' | 'visible'>
  visualLayer: LayerType
}

interface MarkerOverlayConfig extends MapLayerMetadata {
  kind: 'marker'
}

interface MapLayerGroupConfig {
  id: string
  name: string
  layers: MapLayerConfig[]
}

type GeometryLayerConfig<LayerType extends Layer = Layer> = DeckGLLayerConfig<LayerType>
type MapLayerConfig = DeckGLLayerConfig | MarkerOverlayConfig

interface MapContextValue {
  layers: MapLayerConfig[]
  onVisibilityChange?: (layer: MapLayerConfig, visible: boolean) => void
}

interface MapProps extends MapContextValue {
  children?: ReactNode
}

type MapControlGroupProps = ComponentProps<'div'> & VariantProps<typeof mapControlGroupVariants>

type MapLayerListProps = Omit<ComponentProps<typeof PopoverPanel>, 'children'> & {
  children: (layer: MapLayerConfig) => ReactNode
}
type MapLayerGroupListProps = Omit<ComponentProps<typeof PopoverPanel>, 'children'> & {
  groups: MapLayerGroupConfig[]
  children: (group: MapLayerGroupConfig) => ReactNode
}
type MapLayerGroupLayerListProps = Omit<ComponentProps<'ul'>, 'children'> & {
  children: (layer: MapLayerConfig) => ReactNode
}

type MapLayerItemProps = ComponentProps<'div'> & {
  layer: MapLayerConfig
  fadeWhenInvisible?: boolean
}

interface MapLayerItemContextValue {
  layer: MapLayerConfig
}

interface MapLayerGroupContextValue {
  group: MapLayerGroupConfig
}

type MapLayerVisibilityToggleProps = ComponentProps<typeof Button>
type MapLayerNameProps = ComponentProps<'span'>
type MapLayerIconProps = ComponentProps<'div'>
type MapLayerGroupProps = ComponentProps<'div'> & {
  group: MapLayerGroupConfig
}
type MapLayerGroupLabelProps = ComponentProps<'span'>

export type {
  DeckGLLayerConfig,
  GeometryLayerConfig,
  MapContextValue,
  MapControlGroupProps,
  MapLayerConfig,
  MapLayerGroupConfig,
  MapLayerGroupContextValue,
  MapLayerGroupLabelProps,
  MapLayerGroupProps,
  MapLayerGroupListProps,
  MapLayerGroupLayerListProps,
  MapLayerIconProps,
  MapLayerItemContextValue,
  MapLayerItemProps,
  MapLayerListProps,
  MapLayerMetadata,
  MapLayerNameProps,
  MapLayerVisibilityToggleProps,
  MapProps,
  MarkerOverlayConfig,
}
