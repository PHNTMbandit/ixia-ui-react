import { cn } from '@/utils/cn'

import type { ChartLinearGradientProps } from './chart.types'

export function ChartLinearGradient({
  gradients,
  className,
  children,
  ref,
  ...props
}: ChartLinearGradientProps) {
  return (
    <defs className={cn('', className)} ref={ref} {...props}>
      {gradients.map((gradient) => (
        <linearGradient key={gradient.id} id={gradient.id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={gradient.stopColor} stopOpacity={0.8} />
          <stop offset="95%" stopColor={gradient.stopColor} stopOpacity={0.1} />
        </linearGradient>
      ))}
      {children}
    </defs>
  )
}
