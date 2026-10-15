import { cn } from '@/utils/cn'

import type { ChartLegendIndicatorProps } from './chart.types'
import { useChartLegendPayload } from './chart.utils'

export function ChartLegendIndicator({
  shape = 'circle',
  className,
  children,
  ref,
  ...props
}: ChartLegendIndicatorProps) {
  const { color } = useChartLegendPayload()

  return (
    <div
      style={{
        backgroundColor: color,
        ...(shape === 'circle' && { borderRadius: '50%' }),
        ...(shape === 'diamond' && { transform: 'rotate(45deg)' }),
        ...(shape === 'triangle' && { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }),
        ...(shape === 'wye' && {
          clipPath:
            'polygon(50% 0%, 61.8% 35.4%, 98.5% 35.4%, 69.1% 57.1%, 80.9% 92.5%, 50% 70.7%, 19.1% 92.5%, 30.9% 57.1%, 1.5% 35.4%, 38.2% 35.4%)',
        }),
        ...(shape === 'line' && { borderRadius: '1.5px', maxHeight: '100%', width: '3px' }),
      }}
      className={cn('size-xs', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
