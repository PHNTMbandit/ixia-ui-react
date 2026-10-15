import { cn } from '@/utils/cn'

import { useCellContext } from './table-feature-context'
import type { TableNumberCellProps } from './table.types'

export function TableNumberCell({ className, children, ref, ...props }: TableNumberCellProps) {
  const cell = useCellContext<number>()

  return (
    <span className={cn('', className)} ref={ref} {...props}>
      {children}
      {cell.getValue().toLocaleString()}
    </span>
  )
}
