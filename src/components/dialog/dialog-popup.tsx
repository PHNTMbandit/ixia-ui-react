import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import { cn } from '@/utils/cn'

import type { DialogPopupProps } from './dialog.types'

export function DialogPopup({ className, children, ref, ...props }: DialogPopupProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop
        className="fixed inset-[0px] z-998 min-h-dvh transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute"
        style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
      />
      <BaseDialog.Popup
        className={cn(
          'fixed top-1/2 left-1/2 z-999 flex max-w-[calc(100vw-3rem)] min-w-1/6 -translate-1/2 flex-col gap-sm overflow-hidden rounded-3xl bg-surface-2 p-md shadow-lg transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}
