import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import { useCellContext } from './layer-tree-context'
import type { LayerTreeNodeIconProps } from './layer-tree.types'

export function LayerTreeNodeIcon({
  icon: NodeIcon,
  className,
  children,
  ref,
  ...props
}: LayerTreeNodeIconProps) {
  const cell = useCellContext(),
    { row } = cell,
    hasChildren = row.getCanExpand() && Boolean(row.getLeafRows().length)
  let nodeIcon = <NodeIcon />

  if (hasChildren) {
    nodeIcon = <Icon name="folder" />
    if (row.getIsExpanded()) {
      nodeIcon = <Icon name="folderOpen" />
    }
  }

  return (
    <div className={cn('', className)} ref={ref} {...props}>
      {children}
      {nodeIcon}
    </div>
  )
}
