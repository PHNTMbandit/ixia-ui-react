import { Drawer as BaseDrawer } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { DrawerPopupProps } from './drawer.types'

const backdropClassName =
    'fixed inset-0 min-h-dvh bg-scrim opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.2] [--bleed:3rem] data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*0.4s)] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]',
  viewportClassName = cn(
    'fixed inset-0 flex',
    // Down (bottom sheet) - default
    'items-end justify-center',
    // Up (top sheet)
    'has-[[data-swipe-direction=up]]:items-start has-[[data-swipe-direction=up]]:justify-center',
    // Right (right drawer)
    'has-[[data-swipe-direction=right]]:items-center has-[[data-swipe-direction=right]]:justify-end',
    // Left (left drawer)
    'has-[[data-swipe-direction=left]]:items-center has-[[data-swipe-direction=left]]:justify-start',
  ),
  popupClassName = cn(
    // Base styles (shared by all directions)
    'touch-auto overflow-y-auto overscroll-contain bg-surface-background p-md outline outline-border-strong transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*0.4s)] data-swiping:select-none',

    // Down (bottom sheet) - default, shadow goes up
    'mb-[-3rem] max-h-[calc(80vh+3rem)] w-full transform-[translateY(var(--drawer-swipe-movement-y))] rounded-t-2xl pb-[calc(1.5rem+env(safe-area-inset-bottom,0)+3rem)] shadow-[0_-8px_24px_var(--color-shadow)] data-ending-style:transform-[translateY(calc(100%-3rem+2px))] data-starting-style:transform-[translateY(calc(100%-3rem+2px))]',

    // Up (top sheet) - shadow goes down
    'data-[swipe-direction=up]:mt-[-3rem] data-[swipe-direction=up]:mb-0 data-[swipe-direction=up]:rounded-t-none data-[swipe-direction=up]:rounded-b-2xl data-[swipe-direction=up]:pt-[calc(1.5rem+env(safe-area-inset-top,0)+3rem)] data-[swipe-direction=up]:pb-md data-[swipe-direction=up]:shadow-[0_8px_24px_var(--color-shadow)] data-[swipe-direction=up]:data-ending-style:transform-[translateY(calc(-100%+3rem-2px))] data-[swipe-direction=up]:data-starting-style:transform-[translateY(calc(-100%+3rem-2px))]',

    // Right (right drawer) - shadow goes left
    'data-[swipe-direction=right]:mr-[-3rem] data-[swipe-direction=right]:mb-0 data-[swipe-direction=right]:h-full data-[swipe-direction=right]:max-h-dvh data-[swipe-direction=right]:w-[23rem] data-[swipe-direction=right]:max-w-[calc(100vw-3rem)] data-[swipe-direction=right]:transform-[translateX(var(--drawer-swipe-movement-x))] data-[swipe-direction=right]:rounded-none data-[swipe-direction=right]:rounded-l-2xl data-[swipe-direction=right]:pr-[4.5rem] data-[swipe-direction=right]:pb-md data-[swipe-direction=right]:shadow-[-8px_0_24px_var(--color-shadow)] data-[swipe-direction=right]:data-ending-style:transform-[translateX(calc(100%-3rem+2px))] data-[swipe-direction=right]:data-starting-style:transform-[translateX(calc(100%-3rem+2px))]',

    // Left (left drawer) - shadow goes right
    'data-[swipe-direction=left]:mb-0 data-[swipe-direction=left]:ml-[-3rem] data-[swipe-direction=left]:h-full data-[swipe-direction=left]:max-h-dvh data-[swipe-direction=left]:w-[23rem] data-[swipe-direction=left]:max-w-[calc(100vw-3rem)] data-[swipe-direction=left]:transform-[translateX(var(--drawer-swipe-movement-x))] data-[swipe-direction=left]:rounded-none data-[swipe-direction=left]:rounded-r-2xl data-[swipe-direction=left]:pb-md data-[swipe-direction=left]:pl-[4.5rem] data-[swipe-direction=left]:shadow-[8px_0_24px_var(--color-shadow)] data-[swipe-direction=left]:data-ending-style:transform-[translateX(calc(-100%+3rem-2px))] data-[swipe-direction=left]:data-starting-style:transform-[translateX(calc(-100%+3rem-2px))]',
  )

export function DrawerPopup({ className, children, ref, ...props }: DrawerPopupProps) {
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className={backdropClassName} />
      <BaseDrawer.Viewport className={viewportClassName}>
        <BaseDrawer.Popup className={cn(popupClassName, className)} ref={ref} {...props}>
          {children}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  )
}
