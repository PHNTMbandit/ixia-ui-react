import { cn } from '@/utils/cn'

import { useCellContext } from './table-feature-context'
import type { TableDateCellProps } from './table.types'

export function TableDateCell({ className, children, ref, ...props }: TableDateCellProps) {
  const cell = useCellContext<Date>()

  return (
    <span className={cn('', className)} ref={ref} {...props}>
      {children}
      {cell.getValue().toLocaleDateString()}
    </span>
  )
}
