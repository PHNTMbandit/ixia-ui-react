import { AlertDialog as BaseAlertDialog } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { AlertDialogDescriptionProps } from './alert-dialog.types'

export function AlertDialogDescription({ className, ref, ...props }: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description
      data-slot="alert-dialog-description"
      className={cn('mb-[0px] style-text-prose-0', className)}
      ref={ref}
      {...props}
    />
  )
}
