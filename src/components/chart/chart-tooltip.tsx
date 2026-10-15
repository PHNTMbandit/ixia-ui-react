import { Tooltip } from 'recharts'

import type { ChartTooltipProps } from './chart.types'

export function ChartTooltip({ content, ...props }: ChartTooltipProps) {
  return <Tooltip content={content} {...props} />
}
