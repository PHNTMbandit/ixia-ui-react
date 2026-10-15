import { cn } from '@/utils/cn'

import type { AlertDialogFooterProps } from './alert-dialog.types'

export function AlertDialogFooter({ className, ref, ...props }: AlertDialogFooterProps) {
  return (
    <div className={cn('flex items-start justify-end gap-2xs', className)} ref={ref} {...props} />
  )
}
