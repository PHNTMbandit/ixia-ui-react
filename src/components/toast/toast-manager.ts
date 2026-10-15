import { Toast as BaseToast } from '@base-ui/react/toast'
import type { ToastManagerAddOptions } from '@base-ui/react/toast'
import type { Icon } from '@phosphor-icons/react'

import type { ToastVariant } from './toast.types'

type ToastAddOptions = ToastManagerAddOptions<object> & {
  icon?: Icon
  variant?: ToastVariant
}

const createToastManager = () => {
    const manager = BaseToast.createToastManager(),
      add = (options: ToastAddOptions) =>
        manager.add({
          ...options,
          data: {
            ...options.data,
            icon: options.icon,
            variant: options.variant,
          },
        })

    return {
      ...manager,
      add,
    }
  },
  useToastManager = () => {
    const toast = BaseToast.useToastManager(),
      add = (options: ToastAddOptions) =>
        toast.add({
          ...options,
          data: {
            ...options.data,
            icon: options.icon,
            variant: options.variant,
          },
        })

    return { add, toasts: toast.toasts }
  }

export { createToastManager, useToastManager }
