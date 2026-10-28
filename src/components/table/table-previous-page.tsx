import { cn } from '@/utils/cn'

import { Button } from '../button'
import { Icon } from '../icon'
import { useTableContext } from './table-feature-context'
import type { TablePreviousPageProps } from './table.types'

export function TablePreviousPage({ className, children, ref, ...props }: TablePreviousPageProps) {
  const table = useTableContext(),
    handleClick = () => {
      table.previousPage()
    }

  return (
    <Button
      aria-label="Go to previous page"
      className={cn('shrink-0', className)}
      disabled={!table.getCanPreviousPage()}
      onClick={handleClick}
      ref={ref}
      variant="outline"
      tone="neutral"
      size="medium"
      {...props}
    >
      {children ?? <Icon name="chevronLeft" />}
    </Button>
  )
}
