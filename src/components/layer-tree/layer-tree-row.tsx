import { cn } from '@/utils/cn'

import { useTableContext } from './layer-tree-context'
import type { useTableContext as useRegisteredTableContext } from './layer-tree-table'
import type { LayerTreeRowProps } from './layer-tree.types'

const ROOT_DEPTH = 0,
  FIRST_CELL_INDEX = 0,
  ROW_INDENT_PER_LEVEL = 24,
  EMPTY_LEAF_COUNT = 0,
  VISIBLE_OPACITY = 1,
  HIDDEN_OPACITY = 0.5

export function LayerTreeRow({ rowId, className, children, ref, ...props }: LayerTreeRowProps) {
  // The registered table hook adds AppCell and FlexRender at runtime.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const table = useTableContext() as ReturnType<typeof useRegisteredTableContext>

  return (
    <table.Subscribe
      selector={(state) => ({
        expanded: state.expanded,
        rowSelection: state.rowSelection,
        rowVisibility: state.rowVisibility,
      })}
    >
      {() => {
        const row = table.getRowModel().rows.find((candidate) => candidate.id === rowId),
          indent = (row?.depth ?? ROOT_DEPTH) * ROW_INDENT_PER_LEVEL,
          leafRows = row?.getLeafRows() ?? []
        let isVisible = row?.getIsVisible() ?? true

        if (leafRows.length > EMPTY_LEAF_COUNT) {
          isVisible = leafRows.some((leaf) => leaf.getIsVisible())
        }

        return (
          <div className={cn('flex w-full items-center gap-3xs', className)} ref={ref} {...props}>
            {children}
            {row?.getVisibleCells().map((cell, cellIndex) => {
              const isFirstCell = cellIndex === FIRST_CELL_INDEX,
                isFill = cell.column.columnDef.meta?.fill ?? cell.column.id === 'name'
              let marginLeft: number | undefined = undefined,
                opacity = HIDDEN_OPACITY

              if (isFirstCell) {
                marginLeft = indent
              }
              if (isVisible) {
                opacity = VISIBLE_OPACITY
              }

              return (
                <table.AppCell key={cell.id} cell={cell}>
                  {(renderedCell) => (
                    <div
                      style={{
                        marginLeft,
                        opacity,
                      }}
                      className={cn(
                        'flex items-center',
                        isFill && 'min-w-0 grow gap-3xs',
                        !isFill && 'w-fit shrink-0',
                      )}
                    >
                      <table.FlexRender cell={renderedCell} />
                    </div>
                  )}
                </table.AppCell>
              )
            })}
          </div>
        )
      }}
    </table.Subscribe>
  )
}
