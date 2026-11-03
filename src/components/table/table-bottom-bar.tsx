import { cn } from '@/utils/cn'

import type { TableBottomBarProps } from './table.types'

export function TableBottomBar({ className, ref, ...props }: TableBottomBarProps) {
  return (
    <div
      className={cn(
        'mt-auto flex w-full flex-wrap items-center justify-between pt-md group-data-[variant=outline]/table:border-t group-data-[variant=outline]/table:border-border',
        'in-data-[slot=table-container]:sticky in-data-[slot=table-container]:bottom-0 in-data-[slot=table-container]:z-10 in-data-[slot=table-container]:bg-inherit',
        className,
      )}
      data-slot="table-bottom-bar"
      ref={ref}
      {...props}
    />
  )
}
