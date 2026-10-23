import { cn } from '@/utils/cn'

import type { TableLayoutProps } from './table.types'

export function TableLayout({ className, ref, ...props }: TableLayoutProps) {
  return (
    <div
      data-slot="table-layout"
      className={cn('flex min-w-0 flex-col', className)}
      ref={ref}
      {...props}
    />
  )
}
