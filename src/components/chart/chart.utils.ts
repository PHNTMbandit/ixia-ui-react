import React from 'react'

import { ChartLegendPayloadContext, ChartContainerContext } from './chart.types'
import type { ChartConfig } from './chart.types'

const getPayloadConfigFromPayload = (config: ChartConfig, payload: unknown, key: string) => {
    if (typeof payload !== 'object' || payload === null) {
      return undefined
    }

    if (key in config) {
      return config[key]
    }

    if ('name' in payload && typeof payload.name === 'string' && payload.name in config) {
      return config[payload.name]
    }

    return undefined
  },
  useChart = () => {
    const context = React.useContext(ChartContainerContext)

    if (!context) {
      throw new Error('useChart must be used within a ChartContainerProvider')
    }

    return context
  },
  useChartLegendPayload = () => {
    const context = React.useContext(ChartLegendPayloadContext)

    if (!context) {
      throw new Error('useChartLegendPayload must be used within a ChartLegendPayloadProvider')
    }

    return context
  }

export { getPayloadConfigFromPayload, useChart, useChartLegendPayload }
