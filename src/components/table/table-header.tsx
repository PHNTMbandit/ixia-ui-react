import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import type { useTableContext as useRegisteredTableContext } from './table-context'
import { useTableContext } from './table-feature-context'
import type { TableHeaderProps } from './table.types'

export function TableHeader({ className, children, ref, ...props }: TableHeaderProps) {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const table = useTableContext() as ReturnType<typeof useRegisteredTableContext>

  return (
    <table.Subscribe selector={(state) => state}>
      {(state) => {
        if (state.viewMode === 'grid') {
          return undefined
        }
        return (
          <thead
            className={cn(
              'border-border bg-neutral-container-low group-data-[variant=outline]/table:border-b',
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <table.AppHeader
                    header={header}
                    key={header.id}
                    selector={(tableState) => tableState.sorting}
                  >
                    {(renderHeader) => {
                      const sorting = renderHeader.column.getIsSorted()
                      return (
                        <th
                          style={{
                            width: renderHeader.getSize(),
                          }}
                          className={cn(
                            'container p-xs text-left style-text-default-0 text-neutral-on-container-muted transition-colors group-data-[variant=ghost]/table:first:rounded-l-xl group-data-[variant=ghost]/table:last:rounded-r-xl',
                            renderHeader.column.getCanSort() &&
                              'hover:cursor-pointer hover:bg-neutral-container hover:*:text-neutral-on-container',
                            renderHeader.isPlaceholder && 'cursor-default',
                            renderHeader.column.getIsSorted() && 'text-brand-on-container!',
                            className,
                          )}
                          colSpan={renderHeader.colSpan}
                          key={renderHeader.id}
                          onClick={renderHeader.column.getToggleSortingHandler()}
                        >
                          {!renderHeader.isPlaceholder && (
                            <div
                              className={cn(
                                'flex items-center gap-2xs whitespace-nowrap has-[[role=checkbox]]:justify-center [&_svg]:size-sm',
                                renderHeader.column.getCanSort() &&
                                  'select-none hover:cursor-pointer',
                              )}
                            >
                              <div className="flex items-center gap-2xs">
                                <table.FlexRender header={renderHeader} />
                              </div>
                              {sorting === 'asc' && <Icon name="sortDescending" />}
                              {sorting === 'desc' && <Icon name="sortAscending" />}
                              {!sorting && renderHeader.column.getCanSort() && (
                                <Icon name="columnFilter" />
                              )}
                            </div>
                          )}
                        </th>
                      )
                    }}
                  </table.AppHeader>
                ))}
              </tr>
            ))}
          </thead>
        )
      }}
    </table.Subscribe>
  )
}
