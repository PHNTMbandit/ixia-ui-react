import { cn } from '@/utils/cn'

import { ChartLegendIcon } from './chart-legend-icon'
import { ChartLegendIndicator } from './chart-legend-indicator'
import { ChartLegendLabel } from './chart-legend-label'
import { ChartLegendPayloadContext } from './chart.types'
import type { ChartLegendContentProps } from './chart.types'
import { getPayloadConfigFromPayload, useChart } from './chart.utils'

export function ChartLegendContent({
  payload,
  verticalAlign = 'bottom',
  className,
  children,
  ref,
  ...props
}: ChartLegendContentProps) {
  const { config } = useChart()

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-lg',
        verticalAlign === 'top' && 'mb-md',
        verticalAlign === 'bottom' && 'mt-md',
        className,
      )}
      ref={ref}
      {...props}
    >
      {payload?.map((entry) => {
        let payloadKey = 'value'

        if (typeof entry.dataKey === 'string') {
          payloadKey = entry.dataKey
        }

        const payloadConfig = getPayloadConfigFromPayload(config, entry, payloadKey)

        return (
          <ChartLegendPayloadContext.Provider
            key={String(entry.dataKey ?? entry.value)}
            value={{
              color: payloadConfig?.color,
              icon: payloadConfig?.icon,
              label: payloadConfig?.label,
            }}
          >
            <div className="flex items-center gap-2xs">
              {payloadConfig?.icon && <ChartLegendIcon />}
              {!payloadConfig?.icon && <ChartLegendIndicator />}
              <ChartLegendLabel />
              {children}
            </div>
          </ChartLegendPayloadContext.Provider>
        )
      })}
    </div>
  )
}
