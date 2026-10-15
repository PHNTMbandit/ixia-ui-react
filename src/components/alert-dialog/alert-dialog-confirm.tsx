import { AlertDialog as BaseAlertDialog } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import type { AlertDialogConfirmProps } from './alert-dialog.types'

export function AlertDialogConfirm({ className, ref, ...props }: AlertDialogConfirmProps) {
  return (
    <BaseAlertDialog.Close
      data-confirm
      data-slot="alert-dialog-confirm"
      className={cn('', className)}
      ref={ref}
      {...props}
      render={<Button />}
    />
  )
}
