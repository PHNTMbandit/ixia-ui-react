import { cn } from '@/utils/cn'

import type { ChartLegendLabelProps } from './chart.types'
import { useChartLegendPayload } from './chart.utils'

export function ChartLegendLabel({ className, children, ref, ...props }: ChartLegendLabelProps) {
  const { label } = useChartLegendPayload()

  return (
    <p className={cn('style-text-default--1 capitalize', className)} ref={ref} {...props}>
      {children}
      {label}
    </p>
  )
}
