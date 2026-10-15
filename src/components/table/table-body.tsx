import { cn } from '@/utils/cn'

import type { useTableContext as useRegisteredTableContext } from './table-context'
import { useTableContext } from './table-feature-context'
import type { TableBodyProps } from './table.types'

function getRowBackgroundColor(isSelected: boolean): string {
  if (isSelected) {
    return 'var(--color-neutral-container-high)'
  }
  return 'transparent'
}

export function TableBody({ showDivider = true, className, ref, ...props }: TableBodyProps) {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const table = useTableContext() as ReturnType<typeof useRegisteredTableContext>

  return (
    <table.Subscribe selector={(state) => state}>
      {(state) => {
        if (state.viewMode === 'grid') {
          return (
            <ul
              className={cn(
                'grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(252px,1fr))] gap-sm overflow-y-auto',
                className,
              )}
            >
              {table.getRowModel().rows.map((row) => (
                <li key={row.id} className="min-w-0">
                  {row.getVisibleCells().map((cell) => (
                    <table.AppCell cell={cell} key={cell.id}>
                      {(renderedCell) => (
                        <div className="w-full">
                          <table.FlexRender cell={renderedCell} />
                        </div>
                      )}
                    </table.AppCell>
                  ))}
                </li>
              ))}
            </ul>
          )
        }
        return (
          <tbody
            className={cn(showDivider && 'divide-y divide-border', 'overflow-y-auto', className)}
            ref={ref}
            {...props}
          >
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor: getRowBackgroundColor(row.getIsSelected()),
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <table.AppCell cell={cell} key={cell.id}>
                    {(renderedCell) => (
                      // oxlint-disable-next-line jsx-a11y/control-has-associated-label
                      <td
                        style={{
                          width: renderedCell.column.getSize(),
                        }}
                        className={cn('h-xl px-xs first:rounded-l-xl last:rounded-r-xl', className)}
                      >
                        <table.FlexRender cell={renderedCell} />
                      </td>
                    )}
                  </table.AppCell>
                ))}
              </tr>
            ))}
          </tbody>
        )
      }}
    </table.Subscribe>
  )
}
