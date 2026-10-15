import { useDraggable, useDroppable } from '@dnd-kit/react'
import React from 'react'

import { cn } from '@/utils/cn'

import { useCellContext } from './layer-tree-context'
import { useLayerTree } from './layer-tree.types'
import type { LayerTreeTriggerCellProps } from './layer-tree.types'

export function LayerTreeTriggerCell({
  className,
  children,
  dndDisabled,
  onClick,
  ...props
}: LayerTreeTriggerCellProps) {
  const cell = useCellContext<string>(),
    { draggingNodeId } = useLayerTree(),
    { row } = cell,
    hasChildren = row.getCanExpand(),
    isSelected = row.getIsSelected(),
    { ref: draggableRef, isDragging } = useDraggable({
      data: {
        isFolder: hasChildren,
        nodeId: row.id,
      },
      disabled: dndDisabled,
      id: row.id,
    }),
    { ref: droppableRef, isDropTarget } = useDroppable({
      data: {
        folderId: row.id,
        isFolder: hasChildren,
        nodeId: row.id,
      },
      disabled: dndDisabled || !hasChildren,
      id: `folder:${row.id}`,
    }),
    setNodeRef = (element: Element | null) => {
      draggableRef(element)
      droppableRef(element)
    },
    selectRow = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!row.getCanSelect()) {
        return
      }
      if (!event.shiftKey) {
        cell.table.resetRowSelection()
      }
      row.getToggleSelectedHandler()({ shiftKey: event.shiftKey, target: { checked: true } })
    },
    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)
      if (event.defaultPrevented) {
        return
      }
      if (hasChildren) {
        row.toggleExpanded()
        return
      }
      selectRow(event)
    },
    isAncestorDragging = (() => {
      if (!draggingNodeId) {
        return false
      }
      let parent = row.getParentRow()
      while (parent) {
        if (parent.id === draggingNodeId) {
          return true
        }
        parent = parent.getParentRow()
      }
      return false
    })()

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex h-lg min-w-0 grow items-center justify-start gap-2xs truncate rounded-lg px-2xs style-text-default-0 transition-all hover:cursor-pointer [&>svg]:size-sm [&>svg]:shrink-0',
        hasChildren &&
          isDropTarget &&
          'bg-success-container text-success-on-container ring ring-success-border',
        isSelected && 'bg-neutral-default text-neutral-on-default',
        !isSelected && 'hover:bg-neutral-container hover:text-neutral-on-container',
        (isDragging || isAncestorDragging) && 'opacity-60',
        className,
      )}
      ref={setNodeRef}
      {...props}
    >
      {children}
      {cell.getValue()}
    </button>
  )
}
