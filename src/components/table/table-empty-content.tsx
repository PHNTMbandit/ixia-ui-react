import { cn } from '@/utils'

import type { TableEmptyContentProps } from './table.types'

export function TableEmptyContent({ className, children, ref, ...props }: TableEmptyContentProps) {
  return (
    <div
      className={cn('flex w-full max-w-[28rem] min-w-0 flex-col items-center gap-2xs', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
