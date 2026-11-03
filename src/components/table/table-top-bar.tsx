import { cn } from '@/utils/cn'

import type { TableTopBarProps } from './table.types'

export function TableTopBar({ className, ref, ...props }: TableTopBarProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-col pb-md group-data-[variant=outline]/table:border-b group-data-[variant=outline]/table:border-border',
        'in-data-[slot=table-container]:sticky in-data-[slot=table-container]:top-0 in-data-[slot=table-container]:z-10',
        className,
      )}
      data-slot="table-top-bar"
      ref={ref}
      {...props}
    />
  )
}
