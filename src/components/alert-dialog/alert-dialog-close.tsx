import { AlertDialog as BaseAlertDialog } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import type { AlertDialogCloseProps } from './alert-dialog.types'

export function AlertDialogClose({
  className,
  tone = 'neutral',
  variant = 'outline',
  size,
  ...props
}: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close
      data-slot="alert-dialog-close"
      className={cn(className)}
      render={<Button tone={tone} variant={variant} size={size} />}
      {...props}
    />
  )
}
