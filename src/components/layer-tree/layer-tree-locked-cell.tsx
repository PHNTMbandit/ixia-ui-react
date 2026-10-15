import { LockSimpleIcon, LockSimpleOpenIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useCellContext, useTableContext } from './layer-tree-context'
import type { LayerTreeLockedCellProps } from './layer-tree.types'

export function LayerTreeLockedCell({
  className,
  children,
  ref,
  ...props
}: LayerTreeLockedCellProps) {
  const cell = useCellContext<boolean>(),
    table = useTableContext(),
    { row } = cell,
    rows = row.getLeafRows(),
    handleClick = (isLocked: boolean) => {
      const next = !isLocked
      for (const leafRow of rows) {
        leafRow.toggleLocked(next)
      }
    }

  if (!rows.length) {
    rows.push(row)
  }

  return (
    <table.Subscribe selector={(state) => state.rowLocked}>
      {() => {
        const isLocked = rows.every((leafRow) => leafRow.getIsLocked())

        return (
          <Button
            aria-label="Toggle layer lock"
            size="iconSmall"
            tone="neutral"
            variant="ghost"
            onClick={() => handleClick(isLocked)}
            className={cn('', className)}
            ref={ref}
            {...props}
          >
            {children}
            {isLocked && <LockSimpleIcon weight="fill" />}
            {!isLocked && <LockSimpleOpenIcon weight="bold" />}
          </Button>
        )
      }}
    </table.Subscribe>
  )
}
