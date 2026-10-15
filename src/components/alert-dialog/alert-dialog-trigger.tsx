import { AlertDialog as BaseAlertDialog } from '@base-ui/react'
import { isValidElement } from 'react'
import type { ReactElement } from 'react'

import { cn } from '@/utils/cn'

import type { AlertDialogTriggerProps } from './alert-dialog.types'

export function AlertDialogTrigger({
  className,
  children,
  ref,
  ...props
}: AlertDialogTriggerProps) {
  let render: ReactElement | undefined = undefined
  if (isValidElement(children)) {
    render = children
  }

  return (
    <BaseAlertDialog.Trigger className={cn('', className)} ref={ref} {...props} render={render} />
  )
}
