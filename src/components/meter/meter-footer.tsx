import { cn } from '@/utils/cn'

import type { MeterFooterProps } from './meter.types'

export function MeterFooter({ className, ref, ...props }: MeterFooterProps) {
  return <div className={cn('flex items-center justify-between', className)} ref={ref} {...props} />
}
