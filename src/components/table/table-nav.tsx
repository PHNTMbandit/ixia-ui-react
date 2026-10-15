import { cn } from '@/utils/cn'

import type { TableNavProps } from './table.types'

export function TableNav({ sticky = false, className, ref, ...props }: TableNavProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between gap-md',
        sticky && 'sticky bottom-0 z-10 bg-inherit',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
