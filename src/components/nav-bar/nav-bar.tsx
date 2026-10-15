import { cn } from '@/utils/cn'

import { navBarVariants } from './nav-bar.types'
import type { NavBarProps } from './nav-bar.types'

export function NavBar({ itemOrientation, size, variant, className, ref, ...props }: NavBarProps) {
  return (
    <div
      className={cn(navBarVariants({ itemOrientation, size, variant }), className)}
      ref={ref}
      {...props}
    />
  )
}
