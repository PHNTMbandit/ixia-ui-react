import { Meter as BaseMeter } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { MeterIndicatorProps } from './meter.types'

export function MeterIndicator({ className, ref, ...props }: MeterIndicatorProps) {
  return (
    <BaseMeter.Indicator
      data-indicator
      className={cn('rounded-full', className)}
      ref={ref}
      {...props}
    />
  )
}
