import { FolderIcon, FolderOpenIcon } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { createElement } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

import { useCellContext, useTableContext } from './layer-tree-context'
import type { LayerTreeIconCellProps } from './layer-tree.types'

export function LayerTreeIconCell({ className, children, ref, ...props }: LayerTreeIconCellProps) {
  const cell = useCellContext<Icon>(),
    table = useTableContext(),
    icon = cell.getValue(),
    { row } = cell,
    hasChildren = row.getCanExpand() && Boolean(row.getLeafRows().length)

  return (
    <table.Subscribe selector={(state) => state.expanded}>
      {() => {
        const isExpanded = row.getIsExpanded()

        let iconNode: ReactNode = createElement(icon, { weight: 'bold' })
        if (hasChildren && isExpanded) {
          iconNode = <FolderOpenIcon />
        } else if (hasChildren) {
          iconNode = <FolderIcon weight="fill" />
        }

        return (
          <div
            className={cn('flex w-fit shrink-0 items-center [&>svg]:size-sm', className)}
            ref={ref}
            {...props}
          >
            {children}
            {iconNode}
          </div>
        )
      }}
    </table.Subscribe>
  )
}
