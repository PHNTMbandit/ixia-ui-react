import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'

import { cn } from '@/utils/cn'

import type { ContextMenuPopupProps } from './context-menu.types'

export function ContextMenuPopup({ className, ref, ...props }: ContextMenuPopupProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner>
        <BaseContextMenu.Popup
          className={cn(
            'z-99 flex w-[calc(100%+var(--spacing-xl))] origin-(--transform-origin) translate-x-[-calc(var(--spacing-xl)/2)] flex-col gap-3xs rounded-xl bg-surface-2 p-3xs py-2xs shadow-md transition-[transform,scale,opacity] outline-none data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0',
            className,
          )}
          ref={ref}
          {...props}
        />
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  )
}
