import { createElement } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import type { IconComponent } from '../icon'
import { useCellContext, useTableContext } from './layer-tree-context'
import type { LayerTreeIconCellProps } from './layer-tree.types'

export function LayerTreeIconCell({ className, children, ref, ...props }: LayerTreeIconCellProps) {
  const cell = useCellContext<IconComponent>(),
    table = useTableContext(),
    icon = cell.getValue(),
    { row } = cell,
    hasChildren = row.getCanExpand() && Boolean(row.getLeafRows().length)

  return (
    <table.Subscribe selector={(state) => state.expanded}>
      {() => {
        const isExpanded = row.getIsExpanded()

        let iconNode: ReactNode = createElement(icon)
        if (hasChildren && isExpanded) {
          iconNode = <Icon name="folderOpen" />
        } else if (hasChildren) {
          iconNode = <Icon name="folder" />
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
