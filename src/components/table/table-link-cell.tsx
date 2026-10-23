import { cn } from '@/utils'

import { Button } from '../button'
import { useCellContext } from './table-feature-context'
import type { TableLinkCellProps } from './table.types'

export function TableLinkCell({ className, children, ref, ...props }: TableLinkCellProps) {
  const cell = useCellContext<string>(),
    value = cell.getValue()

  return (
    <Button variant="link" type="button" className={cn('', className)} ref={ref} {...props}>
      {children ?? value}
    </Button>
  )
}
