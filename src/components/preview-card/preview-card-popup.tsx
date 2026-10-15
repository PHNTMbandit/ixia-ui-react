import { PreviewCard as BasePreviewCard } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { PreviewCardPopupProps } from './preview-card.types'

export function PreviewCardPopup({ className, children, ref, ...props }: PreviewCardPopupProps) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner className={cn('', className)} ref={ref} {...props}>
        <BasePreviewCard.Popup className="relative h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) rounded-xl bg-surface shadow-md transition-[transform,opacity] duration-100 ease-out data-ending-style:transform-[scale(0.98)] data-ending-style:opacity-0 data-starting-style:transform-[scale(0.98)] data-starting-style:opacity-0">
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  )
}
