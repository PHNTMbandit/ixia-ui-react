import type { LayersList } from '@deck.gl/core'
import { GoogleMapsOverlay } from '@deck.gl/google-maps'
import { useMap } from '@vis.gl/react-google-maps'
import React from 'react'

import { useIxiaMap } from '../map.context'
import type { DeckGLLayerConfig } from '../map.types'
import type { GoogleMapDeckGLOverlayProps } from './google-map.types'

function cloneLayers(configs: DeckGLLayerConfig[]): LayersList {
  return configs.map(({ id, visualLayer: layer, layerProps, visible }) =>
    layer.clone({
      ...layerProps,
      id,
      visible: visible ?? true,
    }),
  )
}

export function GoogleMapDeckGLOverlay({
  interleaved = false,
  ...deckProps
}: GoogleMapDeckGLOverlayProps) {
  const map = useMap(),
    ixiaMap = useIxiaMap(),
    overlayRef = React.useRef<GoogleMapsOverlay | undefined>(undefined)

  React.useEffect(() => {
    if (!map) {
      return undefined
    }

    const overlay = new GoogleMapsOverlay({ interleaved })
    overlayRef.current = overlay
    overlay.setMap(map)

    return () => {
      overlayRef.current = undefined
      overlay.finalize()
    }
  }, [map, interleaved])

  React.useEffect(() => {
    overlayRef.current?.setProps({
      ...deckProps,
      interleaved,
      layers: cloneLayers(
        ixiaMap.layers.filter((layer): layer is DeckGLLayerConfig => layer.kind === 'deckgl'),
      ),
    })
  })

  return undefined
}
