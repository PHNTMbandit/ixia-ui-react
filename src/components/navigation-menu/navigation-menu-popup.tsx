import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { NavigationMenuPopupProps } from './navigation-menu.types'

export function NavigationMenuPopup({
  className,
  children,
  ref,
  ...props
}: NavigationMenuPopupProps) {
  return (
    <BaseNavigationMenu.Portal>
      <BaseNavigationMenu.Positioner
        sideOffset={10}
        collisionPadding={{ bottom: 5, left: 20, right: 20, top: 5 }}
        collisionAvoidance={{ side: 'none' }}
        className={cn(
          'h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--duration) ease-(--easing) before:absolute data-instant:transition-none data-[side=bottom]:before:inset-x-0 data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:h-2xs data-[side=left]:before:inset-y-0 data-[side=left]:before:right-[-10px] data-[side=left]:before:w-2xs data-[side=right]:before:inset-y-0 data-[side=right]:before:left-[-10px] data-[side=right]:before:w-2xs data-[side=top]:before:inset-x-0 data-[side=top]:before:bottom-[-10px] data-[side=top]:before:h-2xs',
          className,
        )}
        ref={ref}
        style={{
          ['--duration' as string]: '0.35s',
          ['--easing' as string]: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        {...props}
      >
        <BaseNavigationMenu.Popup className="relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-xl shadow-md transition-[opacity,transform,width,height,scale] duration-(--duration) ease-(--easing) outline-none data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-[ease] data-starting-style:scale-90 data-starting-style:opacity-0">
          <BaseNavigationMenu.Arrow className="relative block overflow-clip transition-[left,right] duration-(--duration) ease-(--easing) before:absolute before:bottom-0 before:left-1/2 before:block before:size-[calc(6px*sqrt(2))] before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45 before:border before:content-[''] data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180" />
          <BaseNavigationMenu.Viewport className="relative size-full overflow-hidden" />
          {children}
        </BaseNavigationMenu.Popup>
      </BaseNavigationMenu.Positioner>
    </BaseNavigationMenu.Portal>
  )
}
