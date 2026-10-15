import { Meter as BaseMeter } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { meterVariants } from './meter.types'
import type { MeterProps } from './meter.types'

export function Meter({ orientation, size, tone, className, ref, ...props }: MeterProps) {
  return (
    <BaseMeter.Root
      className={cn(meterVariants({ className, orientation, size, tone }))}
      ref={ref}
      {...props}
    />
  )
}
