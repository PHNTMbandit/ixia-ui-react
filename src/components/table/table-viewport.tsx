// oxlint-disable no-ternary
import { cn } from '@/utils/cn'

import { useTableContext } from './table-feature-context'
import type { TableViewportProps } from './table.types'

export function TableViewport({ grow, className, children, ref, ...props }: TableViewportProps) {
  const table = useTableContext(),
    isGridView = table.state.viewMode === 'grid'

  if (isGridView) {
    return (
      <div data-slot="table-viewport" className={cn('size-full', className)} ref={ref} {...props}>
        {children}
      </div>
    )
  }

  return (
    <table
      data-slot="table-viewport"
      className={cn(
        grow ? 'size-full' : 'h-auto w-full',
        '[[data-slot=table-container][data-variant=outline]>&:not(:first-child):not([data-slot=table-dataset-tab]+&)>thead]:border-t [[data-slot=table-container][data-variant=outline]>&:not(:first-child):not([data-slot=table-dataset-tab]+&)>thead]:border-border',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </table>
  )
}
