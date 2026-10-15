import { useDroppable } from '@dnd-kit/react'

import { cn } from '@/utils/cn'

import { useTableContext } from './layer-tree-context'
import { LayerTreeRow } from './layer-tree-row'
import type { LayerTreeBodyProps } from './layer-tree.types'

export function LayerTreeBody({ className, children, ...props }: LayerTreeBodyProps) {
  const table = useTableContext(),
    { isDropTarget, ref } = useDroppable({
      data: {
        folderId: 'root',
        nodeId: 'root',
      },
      id: 'root-dropzone',
    })

  return (
    <table.Subscribe selector={(state) => state}>
      {() => (
        <div className={cn('flex min-h-0 w-full grow flex-col', className)} {...props}>
          {children}
          <div className="flex min-h-0 w-full flex-col gap-xs overflow-y-auto">
            {table.getRowModel().rows.map((row) => (
              <LayerTreeRow key={row.id} rowId={row.id} />
            ))}
          </div>
          <div
            ref={ref}
            className={cn(
              'grow',
              isDropTarget &&
                'rounded-lg bg-success-container ring-1 ring-success-default ring-inset',
            )}
          />
        </div>
      )}
    </table.Subscribe>
  )
}
