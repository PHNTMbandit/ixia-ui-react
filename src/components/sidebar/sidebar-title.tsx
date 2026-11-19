import { cn } from '@/utils'

import type { SidebarTitleProps } from './sidebar.types'

export function SidebarTitle({ className, children, ref, ...props }: SidebarTitleProps) {
  return (
    <span
      className={cn(
        'block min-w-0 truncate [&_svg]:me-xs [&_svg]:inline-block [&_svg]:align-middle',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
}
