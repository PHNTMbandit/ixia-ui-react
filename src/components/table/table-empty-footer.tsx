import { cn } from '@/utils'

import type { TableEmptyFooterProps } from './table.types'

export function TableEmptyFooter({ className, children, ref, ...props }: TableEmptyFooterProps) {
  return (
    <div
      className={cn('flex w-full flex-wrap items-center justify-center gap-xs', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
