import { AlertDialog as BaseAlertDialog } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { AlertDialogTitleProps } from './alert-dialog.types'

export function AlertDialogTitle({ className, ref, ...props }: AlertDialogTitleProps) {
  return (
    <BaseAlertDialog.Title
      data-slot="alert-dialog-title"
      className={cn('style-text-strong-1', className)}
      ref={ref}
      {...props}
    />
  )
}
