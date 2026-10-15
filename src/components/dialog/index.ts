import { Dialog as DialogRoot } from './dialog'
import { DialogClose } from './dialog-close'
import { DialogContent } from './dialog-content'
import { DialogDescription } from './dialog-description'
import { DialogFooter } from './dialog-footer'
import { DialogHeader } from './dialog-header'
import { DialogIcon } from './dialog-icon'
import { DialogPopup } from './dialog-popup'
import { DialogTitle } from './dialog-title'
import { DialogTrigger } from './dialog-trigger'

const Dialog = Object.assign(DialogRoot, {
  Close: DialogClose,
  Content: DialogContent,
  Description: DialogDescription,
  Footer: DialogFooter,
  Header: DialogHeader,
  Icon: DialogIcon,
  Popup: DialogPopup,
  Title: DialogTitle,
  Trigger: DialogTrigger,
})

export type {
  DialogCloseProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogIconProps,
  DialogPopupProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from './dialog.types'
export { DialogClose } from './dialog-close'
export { DialogContent } from './dialog-content'
export { DialogDescription } from './dialog-description'
export { DialogFooter } from './dialog-footer'
export { DialogHeader } from './dialog-header'
export { DialogIcon } from './dialog-icon'
export { DialogPopup } from './dialog-popup'
export { DialogTitle } from './dialog-title'
export { DialogTrigger } from './dialog-trigger'
export { DialogHelper } from './dialog.types'

export { Dialog }
