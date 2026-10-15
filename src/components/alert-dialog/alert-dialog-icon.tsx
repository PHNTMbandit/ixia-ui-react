import { cn } from '@/utils/cn'

import type { AlertDialogIconProps } from './alert-dialog.types'

export function AlertDialogIcon({ className, ref, ...props }: AlertDialogIconProps) {
  return (
    <div
      data-slot="alert-dialog-icon"
      className={cn('row-span-2 self-start [&>svg]:size-xl [&>svg]:shrink-0', className)}
      ref={ref}
      {...props}
    />
  )
}
