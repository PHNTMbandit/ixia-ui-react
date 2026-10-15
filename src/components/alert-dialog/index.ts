import { AlertDialog as AlertDialogRoot } from './alert-dialog'
import { AlertDialogClose } from './alert-dialog-close'
import { AlertDialogConfirm } from './alert-dialog-confirm'
import { AlertDialogDescription } from './alert-dialog-description'
import { AlertDialogFooter } from './alert-dialog-footer'
import { AlertDialogHeader } from './alert-dialog-header'
import { AlertDialogIcon } from './alert-dialog-icon'
import { AlertDialogPopup } from './alert-dialog-popup'
import { AlertDialogTitle } from './alert-dialog-title'
import { AlertDialogTrigger } from './alert-dialog-trigger'

const AlertDialog = Object.assign(AlertDialogRoot, {
  Close: AlertDialogClose,
  Confirm: AlertDialogConfirm,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Header: AlertDialogHeader,
  Icon: AlertDialogIcon,
  Popup: AlertDialogPopup,
  Title: AlertDialogTitle,
  Trigger: AlertDialogTrigger,
})

export type {
  AlertDialogCloseProps,
  AlertDialogConfirmProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogPopupProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
  AlertDialogIconProps,
} from './alert-dialog.types'
export { AlertDialogClose } from './alert-dialog-close'
export { AlertDialogConfirm } from './alert-dialog-confirm'
export { AlertDialogDescription } from './alert-dialog-description'
export { AlertDialogFooter } from './alert-dialog-footer'
export { AlertDialogHeader } from './alert-dialog-header'
export { AlertDialogPopup } from './alert-dialog-popup'
export { AlertDialogTitle } from './alert-dialog-title'
export { AlertDialogTrigger } from './alert-dialog-trigger'
export { AlertDialogIcon } from './alert-dialog-icon'

export { AlertDialog }
