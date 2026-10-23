import { cn } from '@/utils/cn'

import type { TableToolbarProps } from './table.types'

export function TableToolbar({ className, ref, ...props }: TableToolbarProps) {
  return (
    <div
      data-slot="table-toolbar"
      className={cn('flex w-full min-w-0 flex-wrap items-center', className)}
      ref={ref}
      {...props}
    />
  )
}
