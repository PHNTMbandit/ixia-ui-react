import React from 'react'

import type { IconContextValue } from './icon.types'

export const IconContext = React.createContext<IconContextValue>({ icons: {} })
