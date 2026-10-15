import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { NavigationMenuItemProps } from './navigation-menu.types'

export function NavigationMenuItem({ className, ref, ...props }: NavigationMenuItemProps) {
  return <BaseNavigationMenu.Item className={cn('', className)} ref={ref} {...props} />
}
