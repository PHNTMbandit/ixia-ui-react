import React from 'react'

import type { GoogleMapSearchControlValue } from './google-map-search-control.types'

const GoogleMapSearchControlContext = React.createContext<GoogleMapSearchControlValue | undefined>(
  undefined,
)

function useGoogleMapSearchControl() {
  const context = React.useContext(GoogleMapSearchControlContext)

  if (!context) {
    throw new Error('useGoogleMapSearchControl must be used within a GoogleMapSearchControl')
  }

  return context
}

export { GoogleMapSearchControlContext, useGoogleMapSearchControl }
