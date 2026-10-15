import { FolderIcon, FolderOpenIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

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
  let nodeIcon = <NodeIcon weight="bold" />

  if (hasChildren) {
    nodeIcon = <FolderIcon weight="fill" />
    if (row.getIsExpanded()) {
      nodeIcon = <FolderOpenIcon />
    }
  }

  return (
    <div className={cn('', className)} ref={ref} {...props}>
      {children}
      {nodeIcon}
    </div>
  )
}
