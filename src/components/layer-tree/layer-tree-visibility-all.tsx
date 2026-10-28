import { cn } from '@/utils/cn'

import { Button } from '../button'
import { Icon } from '../icon'
import { useTableContext } from './layer-tree-context'
import type { LayerTreeVisibilityAllProps } from './layer-tree.types'

export function LayerTreeVisibilityAll({
  className,
  children,
  ref,
  ...props
}: LayerTreeVisibilityAllProps) {
  const table = useTableContext(),
    allRows = table.getCoreRowModel().flatRows,
    handleClick = (isVisible: boolean) => {
      const next = !isVisible
      for (const leafRow of allRows) {
        leafRow.toggleVisibility(next)
      }
    }

  return (
    <table.Subscribe selector={(state) => state.rowVisibility}>
      {() => {
        const isVisible = allRows.some((leafRow) => leafRow.getIsVisible())

        return (
          <Button
            aria-label="Toggle all layers visibility"
            size="small"
            tone="neutral"
            variant="ghost"
            onClick={() => handleClick(isVisible)}
            className={cn('', className)}
            ref={ref}
            {...props}
          >
            {children}
            {isVisible && <Icon name="visible" />}
            {!isVisible && <Icon name="hidden" />}
          </Button>
        )
      }}
    </table.Subscribe>
  )
}
