import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { NavigationMenuProps } from './navigation-menu.types'

export function NavigationMenu({ className, ref, ...props }: NavigationMenuProps) {
  return <BaseNavigationMenu.Root className={cn('min-w-max', className)} ref={ref} {...props} />
}
