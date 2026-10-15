import { AlertDialog as BaseAlertDialog } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { alertDialogVariants } from './alert-dialog.types'
import type { AlertDialogPopupProps } from './alert-dialog.types'

const style: React.CSSProperties = {
  WebkitBackdropFilter: 'blur(16px)',
  backdropFilter: 'blur(16px)',
  backgroundColor: 'rgb(0 0 0 / 10%)',
}

export function AlertDialogPopup({ tone, className, ref, ...props }: AlertDialogPopupProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop
        data-slot="alert-dialog-backdrop"
        className="fixed inset-[0px] z-998 min-h-dvh transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute"
        style={style}
      />
      <BaseAlertDialog.Popup
        className={cn(alertDialogVariants({ tone }), className)}
        ref={ref}
        {...props}
      />
    </BaseAlertDialog.Portal>
  )
}
