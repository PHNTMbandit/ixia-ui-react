import { CaretLineLeftIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useTableContext } from './table-feature-context'
import type { TableFirstPageProps } from './table.types'

const DEFAULT_PAGE_INDEX = 0

export function TableFirstPage({ className, children, ref, ...props }: TableFirstPageProps) {
  const table = useTableContext(),
    handleClick = () => {
      table.setPageIndex(DEFAULT_PAGE_INDEX)
    }

  return (
    <Button
      aria-label="Go to first page"
      className={cn('shrink-0', className)}
      disabled={!table.getCanPreviousPage()}
      onClick={handleClick}
      ref={ref}
      variant="ghost"
      tone="neutral"
      {...props}
    >
      {children}
      <CaretLineLeftIcon weight="bold" />
    </Button>
  )
}
