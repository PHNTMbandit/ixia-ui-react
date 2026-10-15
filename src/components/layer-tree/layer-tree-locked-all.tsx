import { LockSimpleIcon, LockSimpleOpenIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useTableContext } from './layer-tree-context'
import type { LayerTreeLockedAllProps } from './layer-tree.types'

export function LayerTreeLockedAll({
  className,
  children,
  ref,
  ...props
}: LayerTreeLockedAllProps) {
  const table = useTableContext(),
    allRows = table.getCoreRowModel().flatRows,
    handleClick = (isLocked: boolean) => {
      const next = !isLocked
      for (const leafRow of allRows) {
        leafRow.toggleLocked(next)
      }
    }

  return (
    <table.Subscribe selector={(state) => state.rowLocked}>
      {() => {
        const isLocked = allRows.some((leafRow) => leafRow.getIsLocked())

        return (
          <Button
            aria-label="Toggle all layers lock"
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
