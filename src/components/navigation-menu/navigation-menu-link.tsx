import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { navigationMenuLinkVariants } from './navigation-menu.types'
import type { NavigationMenuLinkProps } from './navigation-menu.types'

export function NavigationMenuLink({
  size,
  tone,
  className,
  ref,
  ...props
}: NavigationMenuLinkProps) {
  return (
    <BaseNavigationMenu.Link
      className={(state) => {
        const classes = navigationMenuLinkVariants({ size, tone })
        if (typeof className === 'function') {
          return cn(classes, className(state))
        }
        return cn(classes, className)
      }}
      ref={ref}
      {...props}
    />
  )
}
