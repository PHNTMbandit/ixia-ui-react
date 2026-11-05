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
    <div
      className={cn(navigationMenuContentLinkVariants({ tone }), className)}
      ref={ref}
      {...props}
    />
  )
}
