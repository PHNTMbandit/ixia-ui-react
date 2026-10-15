import { ArrowsDownUpIcon, SortAscendingIcon, SortDescendingIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import {
  Menu,
  MenuCheckboxItem,
  MenuPopup,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
} from '../menu'
import { useTableContext } from './layer-tree-context'
import type { LayerTreeSortProps } from './layer-tree.types'

function getColumnHeaderLabel(header: unknown, fallback: string): string {
  if (typeof header === 'string') {
    return header
  }
  return fallback
}

export function LayerTreeSort({ className, children, ref, ...props }: LayerTreeSortProps) {
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
      <MenuTrigger className={cn('shrink-0', className)} ref={ref} {...props}>
        <Button aria-label="Sort layers" variant="ghost" size="iconMedium" tone="neutral">
          <ArrowsDownUpIcon weight="bold" />
        </Button>
      </MenuTrigger>
      <MenuPopup align="end">
        <table.Subscribe selector={(state) => state.sorting}>
          {() =>
            table
              .getAllColumns()
              .filter((column) => column.getCanSort())
              .map((column) => (
                <MenuSubmenu key={column.id}>
                  <MenuSubmenuTrigger>
                    {getColumnHeaderLabel(column.columnDef.header, column.id)}
                  </MenuSubmenuTrigger>
                  <MenuPopup>
                    {children}
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
