import { cn } from '@/utils'

import type { TableEmptyTitleProps } from './table.types'

export function TableEmptyTitle({ className, children, ref, ...props }: TableEmptyTitleProps) {
  return (
    <span
      className={cn('block style-text-strong-1 text-balance text-on-surface', className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
}
