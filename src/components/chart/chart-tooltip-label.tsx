import { cn } from '@/utils/cn'

import { useChartTooltipContent } from './chart-tooltip-content'
import type { ChartTooltipLabelProps } from './chart.types'

export function ChartTooltipLabel({ className, children, ref, ...props }: ChartTooltipLabelProps) {
  const { label } = useChartTooltipContent()

  return (
    <p className={cn('style-text-default-0', className)} ref={ref} {...props}>
      {children}
      {label}
    </p>
  )
}
