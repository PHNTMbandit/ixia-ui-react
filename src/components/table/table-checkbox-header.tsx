import { cn } from '@/utils/cn'

import { Checkbox } from '../checkbox'
import { useTableContext } from './table-feature-context'
import type { TableCheckboxHeaderProps } from './table.types'

export function TableCheckboxHeader({ className, ref, ...props }: TableCheckboxHeaderProps) {
  const table = useTableContext()

  return (
    <table.Subscribe selector={(state) => state.rowSelection}>
      {() => {
        const allRowsSelected = table.getIsAllRowsSelected()

        return (
          <Checkbox
            aria-label="Select all rows"
            variant="outline"
            checked={allRowsSelected}
            indeterminate={!allRowsSelected && table.getIsSomeRowsSelected()}
            onCheckedChange={(checked) => table.toggleAllRowsSelected(checked)}
            className={cn('mx-auto flex', className)}
            ref={ref}
            {...props}
          />
        )
      }}
    </table.Subscribe>
  )
}
