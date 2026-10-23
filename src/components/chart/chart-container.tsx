import React from 'react'
import { ResponsiveContainer } from 'recharts'

import { cn } from '@/utils/cn'

import { ChartContainerContext } from './chart.types'
import type { ChartContainerProps } from './chart.types'

export function ChartContainer({
  id,
  config,
  className,
  children,
  initialDimension,
  ref,
  ...props
}: ChartContainerProps) {
  const uniqueId = React.useId(),
    chartId = `chart-${id ?? uniqueId.replace(/:/g, '')}`

  return (
    <ChartContainerContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center style-text-default--1 [&_.recharts-cartesian-axis-tick_text]:fill-on-surface-muted [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-neutral-container-high [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-neutral-container-high [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        ref={ref}
        {...props}
      >
        <ResponsiveContainer initialDimension={initialDimension}>{children}</ResponsiveContainer>
      </div>
    </ChartContainerContext.Provider>
  )
}
