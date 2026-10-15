import { cn } from '@/utils/cn'

import { useChartTooltipPayload } from './chart-tooltip-payload'
import type { ChartTooltipNameProps } from './chart.types'

export function ChartTooltipName({ className, children, ref, ...props }: ChartTooltipNameProps) {
  const { name } = useChartTooltipPayload()

  return (
    <p
      className={cn(
        'grow text-left style-text-default--1 text-on-surface-variant capitalize',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      {name}
    </p>
  )
}
