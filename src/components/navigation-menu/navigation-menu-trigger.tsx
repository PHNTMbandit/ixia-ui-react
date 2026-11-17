import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { navigationMenuTriggerVariants } from './navigation-menu.types'
import type { NavigationMenuTriggerProps } from './navigation-menu.types'

export function NavigationMenuTrigger({
  size,
  tone,
  className,
  ref,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <BaseNavigationMenu.Trigger
      className={(state) => {
        const classes = navigationMenuTriggerVariants({ size, tone })
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
