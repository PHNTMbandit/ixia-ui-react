import { cn } from '@/utils/cn'

import type { TableTopBarProps } from './table.types'

export function TableTopBar({ sticky = false, className, ref, ...props }: TableTopBarProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-col gap-md',
        '[[data-slot=table-container][data-variant=outline]>&]:px-md [[data-slot=table-container][data-variant=outline]>&:first-child]:pt-md [[data-slot=table-container][data-variant=outline]>&:last-child]:pb-md',
        sticky && 'sticky top-0 z-10',
        className,
      )}
      data-table-top-bar=""
      data-slot="table-top-bar"
      ref={ref}
      {...props}
    />
  )
}
