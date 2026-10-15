import { cn } from '@/utils/cn'

import { useChartTooltipPayload } from './chart-tooltip-payload'
import type { ChartTooltipIconProps } from './chart.types'
import { getPayloadConfigFromPayload, useChart } from './chart.utils'

function resolveConfigKey(dataKey: unknown): string {
  if (typeof dataKey === 'string') {
    return dataKey
  }

  return 'value'
}

export function ChartTooltipIcon({ className, children, ref, ...props }: ChartTooltipIconProps) {
  const { config } = useChart(),
    payload = useChartTooltipPayload(),
    payloadConfig = getPayloadConfigFromPayload(config, payload, resolveConfigKey(payload.dataKey)),
    Icon = payloadConfig?.icon

  return (
    <div
      style={{
        color: payload.color,
      }}
      className={cn('shrink-0 [&>svg]:size-xs', className)}
      ref={ref}
      {...props}
    >
      {children}
      {Icon && <Icon />}
    </div>
  )
}
