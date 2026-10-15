import { cn } from '@/utils/cn'

import { navigationMenuLinkVariants } from './navigation-menu.types'
import type { NavigationMenuLinkProps } from './navigation-menu.types'

export function NavigationMenuLink({ tone, className, ref, ...props }: NavigationMenuLinkProps) {
  return (
    <div
      className={cn(
        navigationMenuLinkVariants({
          className,
          tone,
        }),
      )}
      ref={ref}
      {...props}
    />
  )
}
