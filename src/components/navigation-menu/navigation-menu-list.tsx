import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { NavigationMenuListProps } from './navigation-menu.types'

export function NavigationMenuList({ className, ref, ...props }: NavigationMenuListProps) {
  return (
    <BaseNavigationMenu.List
      className={cn('relative flex gap-px', className)}
      ref={ref}
      {...props}
    />
  )
}
