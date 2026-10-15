// oxlint-disable unicorn/no-null
import { Feedback } from '@dnd-kit/dom'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/react'
import React from 'react'

import { cn } from '@/utils/cn'

import { Badge } from '../badge'
import { useTableContext } from './layer-tree-context'
import { LayerTreeContext } from './layer-tree.types'
import type { LayerTreeProps } from './layer-tree.types'

const PARENT_ROW_COUNT = 1

export function LayerTree({
  onDNDStart: onDragStart,
  onDNDEnd: onDragEnd,
  className,
  children,
  ref,
  ...props
}: LayerTreeProps) {
  const table = useTableContext(),
    [draggingNodeId, setDraggingNodeId] = React.useState<string | null>(null),
    handleDragStart = ({ operation: { source } }: DragStartEvent) => {
      setDraggingNodeId(source?.data.nodeId ?? null)
      if (onDragStart) {
        onDragStart({ nodeId: source?.data.nodeId ?? '' })
      }
    },
    handleDragEnd = ({ operation: { source, target } }: DragEndEvent) => {
      setDraggingNodeId(null)
      if (onDragEnd) {
        const targetNodeId = target?.data.folderId ?? target?.data.nodeId ?? null
        onDragEnd({
          sourceNodeId: source?.data.nodeId ?? '',
          targetNodeId,
        })
      }
    }

  return (
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      plugins={(defaults) => [...defaults, Feedback.configure({ dropAnimation: null })]}
    >
      <LayerTreeContext.Provider
        value={{
          children,
          className,
          draggingNodeId,
          ref,
          ...props,
        }}
      >
        <div className={cn('flex flex-col justify-between', className)} ref={ref} {...props}>
          {children}
          <DragOverlay>
            {(source) => (
              <div
                className={cn(
                  'relative rounded-md border border-neutral-border bg-neutral-container px-xs py-3xs opacity-80 shadow-md transition-opacity',
                )}
              >
                {table.getRow(String(source.id)).renderValue('name') ?? source.id}
                <Badge className="absolute -top-xs -right-xs" size="iconSmall" tone="neutral">
                  {table.getRow(String(source.id))?.subRows.length + PARENT_ROW_COUNT}
                </Badge>
              </div>
            )}
          </DragOverlay>
        </div>
      </LayerTreeContext.Provider>
    </DragDropProvider>
  )
}

export { useLayerTree } from './layer-tree.types'
