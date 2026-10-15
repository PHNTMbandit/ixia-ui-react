import { EyeClosedIcon, EyeIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useCellContext, useTableContext } from './layer-tree-context'
import type { LayerTreeVisibilityCellProps } from './layer-tree.types'

export function LayerTreeVisibilityCell({
  className,
  children,
  ref,
  ...props
}: LayerTreeVisibilityCellProps) {
  const cell = useCellContext<boolean>(),
    table = useTableContext(),
    { row } = cell,
    rows = row.getLeafRows(),
    handleClick = (isVisible: boolean) => {
      const next = !isVisible
      for (const leafRow of rows) {
        leafRow.toggleVisibility(next)
      }
    }

  if (!rows.length) {
    rows.push(row)
  }

  return (
    <table.Subscribe selector={(state) => state.rowVisibility}>
      {() => {
        const isVisible = rows.some((leafRow) => leafRow.getIsVisible())

        return (
          <Button
            aria-label="Toggle layer visibility"
            size="iconSmall"
            tone="neutral"
            variant="ghost"
            onClick={() => handleClick(isVisible)}
            className={cn('', className)}
            ref={ref}
            {...props}
          >
            {children}
            {isVisible && <EyeIcon weight="bold" />}
            {!isVisible && <EyeClosedIcon weight="bold" />}
          </Button>
        )
      }}
    </table.Subscribe>
  )
}
