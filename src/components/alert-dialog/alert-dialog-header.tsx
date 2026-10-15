import { cn } from '@/utils/cn'

import type { AlertDialogHeaderProps } from './alert-dialog.types'

export function AlertDialogHeader({ className, ref, ...props }: AlertDialogHeaderProps) {
  return (
    <div
      className={cn(
        'grid auto-rows-min items-center gap-x-sm has-data-[slot=alert-dialog-description]:grid-rows-[auto_auto] has-data-[slot=alert-dialog-icon]:grid-cols-[auto_1fr] has-data-[slot=alert-dialog-description]:**:data-[slot=alert-dialog-icon]:row-span-2',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
