import { cn } from '@/utils/cn'

import type { TableTopBarProps } from './table.types'

export function TableTopBar({ sticky = false, className, ref, ...props }: TableTopBarProps) {
  return (
    <div
      className={cn('flex min-w-0 flex-col', sticky && 'sticky top-0 z-10', className)}
      data-table-top-bar=""
      data-slot="table-top-bar"
      ref={ref}
      {...props}
    />
  )
}
