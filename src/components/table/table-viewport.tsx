import { cn } from '@/utils/cn'

import { useTableContext } from './table-feature-context'
import type { TableViewportProps } from './table.types'

export function TableViewport({ grow, className, children, ref, ...props }: TableViewportProps) {
  const table = useTableContext(),
    isGridView = table.state.viewMode === 'grid'

  if (isGridView) {
    return (
      <div
        data-slot="table-viewport"
        className={cn('min-h-0 min-w-0 overflow-auto', grow && 'flex-1', className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      data-slot="table-viewport"
      className={cn(
        'min-h-0 min-w-0 overflow-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-surface-focus-ring',
        grow && 'flex-1',
      )}
    >
      <table className={cn('w-full', grow && 'h-full', className)} ref={ref} {...props}>
        {children}
      </table>
    </div>
  )
}
