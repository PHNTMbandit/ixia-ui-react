import { cn } from '@/utils/cn'

import { Button } from '../button'
import { Icon } from '../icon'
import { useTableContext } from './table-feature-context'
import type { TableNextPageProps } from './table.types'

export function TableNextPage({ className, children, ref, ...props }: TableNextPageProps) {
  const table = useTableContext(),
    handleClick = () => {
      table.nextPage()
    }

  return (
    <Button
      aria-label="Go to next page"
      className={cn('shrink-0', className)}
      disabled={!table.getCanNextPage()}
      onClick={handleClick}
      ref={ref}
      size="medium"
      variant="outline"
      tone="neutral"
      {...props}
    >
      {children ?? <Icon name="chevronRight" />}
    </Button>
  )
}
