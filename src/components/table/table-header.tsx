import { FunnelSimpleIcon, SortAscendingIcon, SortDescendingIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

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
          <thead className={cn('bg-neutral-container')} ref={ref} {...props}>
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
                            'container p-xs text-left style-text-default-0 text-neutral-on-container-muted transition-colors first:rounded-l-xl last:rounded-r-xl',
                            renderHeader.column.getCanSort() &&
                              'hover:cursor-pointer hover:bg-neutral-container-high hover:*:text-neutral-on-container',
                            renderHeader.isPlaceholder && 'cursor-default',
                            className,
                          )}
                          colSpan={renderHeader.colSpan}
                          key={renderHeader.id}
                          onClick={renderHeader.column.getToggleSortingHandler()}
                        >
                          {!renderHeader.isPlaceholder && (
                            <div
                              className={cn(
                                'flex items-center justify-between gap-2xs whitespace-nowrap [&_svg]:size-sm',
                                renderHeader.column.getCanSort() &&
                                  'select-none hover:cursor-pointer',
                              )}
                            >
                              <div className="flex items-center gap-2xs">
                                <table.FlexRender header={renderHeader} />
                              </div>
                              {sorting === 'asc' && <SortDescendingIcon weight="bold" />}
                              {sorting === 'desc' && <SortAscendingIcon weight="bold" />}
                              {!sorting && renderHeader.column.getCanSort() && (
                                <FunnelSimpleIcon weight="bold" />
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
