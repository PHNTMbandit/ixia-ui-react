import { Meter as BaseMeter } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { MeterLabelProps } from './meter.types'

export function MeterLabel({ className, ref, ...props }: MeterLabelProps) {
  return (
    <BaseMeter.Label
      className={cn(
        'flex items-center gap-2xs style-text-strong--1 text-on-surface [&>svg]:size-xs',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
