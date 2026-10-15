import { Toast as BaseToast } from '@base-ui/react/toast'

import { cn } from '@/utils/cn'

import { StackToastItem } from './stack-toast-item'
import { useToastManager } from './toast-manager'
import type { StackToastProps } from './toast.types'

export function StackToasts({ className, ref, ...props }: StackToastProps) {
  const { toasts } = useToastManager()

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        aria-label="Notifications"
        className={cn(
          'fixed top-auto right-[1rem] bottom-[1rem] z-10 mx-auto flex w-[250px] sm:right-[2rem] sm:bottom-[2rem] sm:w-[300px]',
          className,
        )}
        ref={ref}
        {...props}
      >
        {toasts.map((toast) => (
          <StackToastItem key={toast.id} toast={toast} />
        ))}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  )
}
