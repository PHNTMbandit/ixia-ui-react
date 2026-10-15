import { cn } from '@/utils/cn'

import { useTableContext } from './table-feature-context'
import type { TableViewportProps } from './table.types'

export function TableViewport({ className, children, ref, ...props }: TableViewportProps) {
  const table = useTableContext(),
    isGridView = table.state.viewMode === 'grid'

  if (isGridView) {
    return (
      <div className={cn('size-full', className)} ref={ref} {...props}>
        {children}
      </div>
    )
  }

  return (
    <table className={cn('size-full', className)} ref={ref} {...props}>
      {children}
    </table>
  )
}
