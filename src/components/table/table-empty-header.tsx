import { cn } from '@/utils'

import type { TableEmptyHeaderProps } from './table.types'

export function TableEmptyHeader({ className, children, ref, ...props }: TableEmptyHeaderProps) {
  return (
    <div
      className={cn('flex w-full max-w-[28rem] flex-col items-center gap-sm', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
