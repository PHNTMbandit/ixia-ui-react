import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { navigationMenuContentLinkVariants } from './navigation-menu.types'
import type { NavigationMenuContentLinkProps } from './navigation-menu.types'

export function NavigationMenuContentLink({
  tone,
  className,
  ref,
  ...props
}: NavigationMenuContentLinkProps) {
  return (
    <BaseNavigationMenu.Link
      className={(state) => {
        const classes = navigationMenuContentLinkVariants({ tone })
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
