import { Toast as BaseToast } from '@base-ui/react/toast'

import { AnchoredToasts } from './anchored-toasts'
import { StackToasts } from './stack-toasts'
import { anchoredToastManager, stackToastManager } from './toast-managers'
import type { ToastProviderProps } from './toast.types'

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      <BaseToast.Provider timeout={10_000} toastManager={anchoredToastManager}>
        <AnchoredToasts />
      </BaseToast.Provider>
      <BaseToast.Provider timeout={10_000} toastManager={stackToastManager}>
        <StackToasts />
      </BaseToast.Provider>
      {children}
    </>
  )
}
