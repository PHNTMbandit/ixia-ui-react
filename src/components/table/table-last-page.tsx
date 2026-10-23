import { CaretLineRightIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useTableContext } from './table-feature-context'
import type { TableLastPageProps } from './table.types'

const LAST_PAGE_OFFSET = 1

export function TableLastPage({ className, children, ref, ...props }: TableLastPageProps) {
  const table = useTableContext(),
    handleClick = () => {
      table.setPageIndex(table.getPageCount() - LAST_PAGE_OFFSET)
    }

  return (
    <Button
      aria-label="Go to last page"
      className={cn('shrink-0', className)}
      disabled={!table.getCanNextPage()}
      onClick={handleClick}
      ref={ref}
      variant="outline"
      tone="neutral"
      size="iconMedium"
      {...props}
    >
      {children}
      <CaretLineRightIcon weight="bold" />
    </Button>
  )
}
