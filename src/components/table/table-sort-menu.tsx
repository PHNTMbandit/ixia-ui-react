import { SortAscendingIcon, SortDescendingIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import {
  Menu,
  MenuCheckboxItem,
  MenuPopup,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
} from '../menu'
import { useTableContext } from './table-feature-context'
import type { TableSortMenuProps } from './table.types'
import { getColumnHeaderLabel } from './table.utils'

export function TableSortMenu({ className, ref, ...props }: TableSortMenuProps) {
  const table = useTableContext(),
    buttonLabels = table.options.meta?.translations?.buttonLabels ?? {},
    ascendingLabel = buttonLabels.ascending ?? 'Ascending',
    descendingLabel = buttonLabels.descending ?? 'Descending',
    handleSort = (columnId: string, direction: 'asc' | 'desc') => {
      const column = table.getColumn(columnId),
        currentSort = column?.getIsSorted()

      if (currentSort === direction) {
        column?.clearSorting()
        return
      }

      column?.toggleSorting(direction === 'desc', column.getCanMultiSort())
    }

  return (
    <Menu>
      <MenuTrigger className={cn('shrink-0', className)} ref={ref} {...props} />
      <MenuPopup align="end">
        <table.Subscribe selector={(state) => state.sorting}>
          {() =>
            table
              .getAllColumns()
              .filter((column) => column.getCanSort())
              .map((column) => (
                <MenuSubmenu key={column.id}>
                  <MenuSubmenuTrigger>{getColumnHeaderLabel(column)}</MenuSubmenuTrigger>
                  <MenuPopup>
                    <MenuCheckboxItem
                      checked={column.getIsSorted() === 'asc'}
                      onClick={() => handleSort(column.id, 'asc')}
                    >
                      <SortDescendingIcon weight="bold" />
                      {ascendingLabel}
                    </MenuCheckboxItem>
                    <MenuCheckboxItem
                      checked={column.getIsSorted() === 'desc'}
                      onClick={() => handleSort(column.id, 'desc')}
                    >
                      <SortAscendingIcon weight="bold" />
                      {descendingLabel}
                    </MenuCheckboxItem>
                  </MenuPopup>
                </MenuSubmenu>
              ))
          }
        </table.Subscribe>
      </MenuPopup>
    </Menu>
  )
}
