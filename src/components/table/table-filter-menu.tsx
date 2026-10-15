import { cn } from '@/utils/cn'

import { Menu, MenuItem, MenuPopup, MenuTrigger } from '../menu'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverPanel,
  PopoverTitle,
  PopoverTrigger,
} from '../popover'
import { TableDateFilterForm } from './table-date-filter-form'
import { useTableContext } from './table-feature-context'
import { TableNumberFilterForm } from './table-number-filter-form'
import { TableSelectFilterForm } from './table-select-filter-form'
import { TableStringFilterForm } from './table-string-filter-form'
import type { TableFilterMenuProps } from './table.types'
import { getColumnHeaderLabel } from './table.utils'

export function TableFilterMenu({ className, ref, ...props }: TableFilterMenuProps) {
  const table = useTableContext()

  return (
    <Menu modal={false}>
      <MenuTrigger className={cn('shrink-0', className)} ref={ref} {...props} />
      <MenuPopup align="end" className="">
        {table
          .getAllColumns()
          .filter((column) => column.getCanFilter())
          .map((column) => {
            const { filterVariant } = column.columnDef.meta ?? {}

            return (
              <Popover key={column.id}>
                <PopoverTrigger nativeButton={false}>
                  <MenuItem closeOnClick={false}>{getColumnHeaderLabel(column)}</MenuItem>
                </PopoverTrigger>
                <PopoverPanel
                  side="inline-end"
                  align="start"
                  className={cn('', className)}
                  onKeyDownCapture={(event) => event.stopPropagation()}
                >
                  <PopoverHeader>
                    <PopoverTitle>{getColumnHeaderLabel(column)}</PopoverTitle>
                  </PopoverHeader>
                  <PopoverContent>
                    {(() => {
                      switch (filterVariant) {
                        case 'date': {
                          return <TableDateFilterForm column={column} />
                        }
                        case 'number': {
                          return <TableNumberFilterForm column={column} />
                        }
                        case 'select': {
                          return <TableSelectFilterForm column={column} />
                        }
                        case 'string': {
                          return <TableStringFilterForm column={column} />
                        }
                        default: {
                          return undefined
                        }
                      }
                    })()}
                  </PopoverContent>
                </PopoverPanel>
              </Popover>
            )
          })}
      </MenuPopup>
    </Menu>
  )
}
