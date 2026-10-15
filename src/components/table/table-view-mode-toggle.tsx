import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useTableContext } from './table-feature-context'
import type { TableViewModeToggleProps } from './table.types'

export function TableViewModeToggle({
  className,
  children,
  ref,
  ...props
}: TableViewModeToggleProps) {
  const table = useTableContext(),
    isGridView = table.state.viewMode === 'grid',
    handleClick = () => {
      table.toggleViewMode()
    }

  return (
    <Button onClick={handleClick} className={cn('shrink-0', className)} ref={ref} {...props}>
      {children(isGridView)}
    </Button>
  )
}
