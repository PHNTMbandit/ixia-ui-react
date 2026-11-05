import { APIProvider } from '@vis.gl/react-google-maps'

import type { GoogleMapProps } from './google-map.types'

export function GoogleMap({ children, ...props }: GoogleMapProps) {
  return <APIProvider {...props}>{children}</APIProvider>
}
