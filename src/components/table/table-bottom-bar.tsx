import { cn } from '@/utils/cn'

import type { TableBottomBarProps } from './table.types'

export function TableBottomBar({ sticky = false, className, ref, ...props }: TableBottomBarProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-wrap items-center justify-between gap-md',
        '[:where([data-slot=table-container][data-variant=outline]>&)]:px-md [:where([data-slot=table-container][data-variant=outline]>&:first-child)]:pt-md [:where([data-slot=table-container][data-variant=outline]>&:last-child)]:pb-md',
        sticky && 'sticky bottom-0 z-10 bg-inherit',
        className,
      )}
      data-slot="table-bottom-bar"
      ref={ref}
      {...props}
    />
  )
}
