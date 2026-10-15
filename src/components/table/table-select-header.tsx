import { cn } from '@/utils/cn'

import { Checkbox } from '../checkbox'
import { useTableContext } from './table-feature-context'
import type { TableSelectHeaderProps } from './table.types'

export function TableSelectHeader({ className, ref, ...props }: TableSelectHeaderProps) {
  const table = useTableContext()

  return (
    <table.Subscribe selector={(state) => state.rowSelection}>
      {() => {
        const allRowsSelected = table.getIsAllRowsSelected()

        return (
          <Checkbox
            aria-label="Select all rows"
            checked={allRowsSelected}
            indeterminate={!allRowsSelected && table.getIsSomeRowsSelected()}
            onCheckedChange={(checked) => table.toggleAllRowsSelected(checked)}
            className={cn('', className)}
            ref={ref}
            {...props}
          />
        )
      }}
    </table.Subscribe>
  )
}
