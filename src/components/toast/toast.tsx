import { AnchoredToastItem } from './anchored-toast-item'
import { AnchoredToasts } from './anchored-toasts'
import { StackToastItem } from './stack-toast-item'
import { StackToasts } from './stack-toasts'
import { ToastProvider } from './toast-provider'

const Toast = Object.assign(ToastProvider, {
  AnchoredToastItem,
  AnchoredToasts,
  StackToastItem,
  StackToasts,
})

export { Toast }
