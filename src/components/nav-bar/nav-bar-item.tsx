import { cn } from '@/utils/cn'

import { navBarItemVariants } from './nav-bar.types'
import type { NavBarItemProps } from './nav-bar.types'

export function NavBarItem({ isActive = false, tone, className, ref, ...props }: NavBarItemProps) {
  return (
    <button
      type="button"
      data-active={isActive}
      data-nav-bar-item
      className={cn(navBarItemVariants({ tone }), className)}
      ref={ref}
      {...props}
    />
  )
}
