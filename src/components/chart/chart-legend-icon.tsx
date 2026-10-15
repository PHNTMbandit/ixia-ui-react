import { cn } from '@/utils/cn'

import type { ChartLegendIconProps } from './chart.types'
import { useChartLegendPayload } from './chart.utils'

export function ChartLegendIcon({ className, children, ref, ...props }: ChartLegendIconProps) {
  const { icon: Icon, color } = useChartLegendPayload()

  return (
    <div
      style={{
        color,
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
