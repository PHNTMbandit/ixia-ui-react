import { cn } from '@/utils/cn'

import type { useTableContext as useRegisteredTableContext } from './table-context'
import { useTableContext } from './table-feature-context'
import type { TableBodyProps } from './table.types'

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
                'grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(252px,1fr))] gap-sm overflow-y-auto border-border group-data-[variant=outline]/table:border-y group-data-[variant=outline]/table:p-md',
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
            className={cn(
              showDivider && 'divide-y divide-border',
              'overflow-y-auto border-border group-data-[variant=outline]/table:last:border-b',
              className,
            )}
            ref={ref}
            {...props}
          >
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={cn(row.getIsSelected() && 'bg-neutral-container-low')}>
                {row.getVisibleCells().map((cell) => (
                  <table.AppCell cell={cell} key={cell.id}>
                    {(renderedCell) => (
                      // oxlint-disable-next-line jsx-a11y/control-has-associated-label
                      <td
                        style={{
                          width: renderedCell.column.getSize(),
                        }}
                        className={cn('h-2xl p-xs', className)}
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
