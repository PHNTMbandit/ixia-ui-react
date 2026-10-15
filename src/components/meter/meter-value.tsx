import { Meter as BaseMeter } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { MeterValueProps } from './meter.types'

export function MeterValue({ className, ref, ...props }: MeterValueProps) {
  return (
    <BaseMeter.Value
      className={cn('ml-auto text-right style-text-prose--2 text-on-surface-variant', className)}
      ref={ref}
      {...props}
    />
  )
}
