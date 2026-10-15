import { cn } from '@/utils/cn'

import { useChartTooltipPayload } from './chart-tooltip-payload'
import type { ChartTooltipValueProps } from './chart.types'

export function ChartTooltipValue({ className, children, ref, ...props }: ChartTooltipValueProps) {
  const { value } = useChartTooltipPayload()

  return (
    <p className={cn('mx-auto style-text-default--1', className)} ref={ref} {...props}>
      {children}
      {value}
    </p>
  )
}
