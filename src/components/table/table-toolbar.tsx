import { cn } from '@/utils/cn'

import type { TableToolbarProps } from './table.types'

export function TableToolbar({ className, ref, ...props }: TableToolbarProps) {
  return (
    <div
      data-slot="table-toolbar"
      className={cn(
        'flex w-full min-w-0 flex-wrap items-center gap-2xs',
        '[:where([data-slot=table-container][data-variant=outline]>&)]:px-md [:where([data-slot=table-container][data-variant=outline]>&:first-child)]:pt-md [:where([data-slot=table-container][data-variant=outline]>&:last-child)]:pb-md',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
