import { cn } from '@/utils/cn'

import { useCellContext } from './table-feature-context'
import type { TableTextCellProps } from './table.types'

export function TableTextCell({ className, children, ref, ...props }: TableTextCellProps) {
  const cell = useCellContext<string>()

  return (
    <span className={cn('', className)} ref={ref} {...props}>
      {children}
      {cell.getValue()}
    </span>
  )
}
