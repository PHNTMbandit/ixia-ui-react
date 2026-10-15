import { FolderOpenIcon, FolderSimpleIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useTableContext } from './layer-tree-context'
import type { LayerTreeExpandAllProps } from './layer-tree.types'

export function LayerTreeExpandAll({ className, ref, ...props }: LayerTreeExpandAllProps) {
  const table = useTableContext(),
    handleClick = () => {
      if (table.getIsSomeRowsExpanded()) {
        table.toggleAllRowsExpanded(false)
      } else {
        table.toggleAllRowsExpanded(true)
      }
    }

  return (
    <table.Subscribe selector={(state) => state.expanded}>
      {() => (
        <Button
          aria-label="Expand or collapse all layers"
          size="iconMedium"
          tone="neutral"
          variant="ghost"
          onClick={handleClick}
          className={cn('', className)}
          ref={ref}
          {...props}
        >
          {table.getIsSomeRowsExpanded() && <FolderOpenIcon weight="bold" />}
          {!table.getIsSomeRowsExpanded() && <FolderSimpleIcon weight="bold" />}
        </Button>
      )}
    </table.Subscribe>
  )
}
