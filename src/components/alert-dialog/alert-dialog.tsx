import { AlertDialog as BaseAlertDialog } from '@base-ui/react'

import type { AlertDialogProps } from './alert-dialog.types'

export function AlertDialog({ ...props }: AlertDialogProps) {
  return <BaseAlertDialog.Root {...props} />
}
