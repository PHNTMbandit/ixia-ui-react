import React from 'react'
import type { TooltipPayloadEntry } from 'recharts'

import { cn } from '@/utils/cn'

import { useChartTooltipContent } from './chart-tooltip-content'
import type { ChartTooltipPayloadProps } from './chart.types'

const ChartTooltipPayloadContext = React.createContext<TooltipPayloadEntry | undefined>(undefined)

function ChartTooltipPayload({ className, children, ref, ...props }: ChartTooltipPayloadProps) {
  const { payload } = useChartTooltipContent()

  return (
    <div className={cn('flex flex-col gap-3xs', className)} ref={ref} {...props}>
      {payload?.map((entry) => (
        <ChartTooltipPayloadContext.Provider
          key={String(entry.dataKey ?? entry.name)}
          value={entry}
        >
          <div className="flex items-center justify-between gap-2xs">{children}</div>
        </ChartTooltipPayloadContext.Provider>
      ))}
    </div>
  )
}

function useChartTooltipPayload() {
  const context = React.useContext(ChartTooltipPayloadContext)

  if (!context) {
    throw new Error('useChartTooltipPayload must be used within a ChartTooltipPayloadProvider')
  }

  return context
}

export { ChartTooltipPayload, useChartTooltipPayload }
