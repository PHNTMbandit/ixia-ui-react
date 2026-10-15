import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { NavigationMenuIconProps } from './navigation-menu.types'

export function NavigationMenuIcon({ className, ref, ...props }: NavigationMenuIconProps) {
  return (
    <BaseNavigationMenu.Icon
      className={cn(
        'transition-transform duration-200 ease-[ease] data-popup-open:rotate-180',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
