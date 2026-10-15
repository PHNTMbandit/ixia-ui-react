import { cn } from '@/utils/cn'

import { Menu, MenuCheckboxItem, MenuPopup, MenuTrigger } from '../menu'
import { useTableContext } from './table-feature-context'
import type { TableColumnToggleProps } from './table.types'
import { getColumnHeaderLabel } from './table.utils'

export function TableColumnToggle({ className, ref, ...props }: TableColumnToggleProps) {
  const table = useTableContext(),
    handleToggleColumn = (columnId: string) => {
      table.getColumn(columnId)?.toggleVisibility()
    }

  return (
    <Menu>
      <MenuTrigger className={cn('shrink-0', className)} ref={ref} {...props} />
      <MenuPopup>
        {table.getAllColumns().flatMap((column) => {
          if (!column.getCanHide()) {
            return []
          }

          return (
            <MenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={() => handleToggleColumn(column.id)}
            >
              {getColumnHeaderLabel(column)}
            </MenuCheckboxItem>
          )
        })}
      </MenuPopup>
    </Menu>
  )
}
