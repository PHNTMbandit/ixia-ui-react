import { cn } from '@/utils/cn'

import type { TableContainerProps } from './table.types'

export function TableContainer({ className, ref, ...props }: TableContainerProps) {
  return <div className={cn('flex flex-col gap-xs', className)} ref={ref} {...props} />
}
