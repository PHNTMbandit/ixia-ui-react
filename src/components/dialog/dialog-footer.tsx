import { cn } from '@/utils/cn'

import type { DialogFooterProps } from './dialog.types'

export function DialogFooter({ className, ref, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn('flex w-full items-center justify-end gap-2xs', className)}
      ref={ref}
      {...props}
    />
  )
}
