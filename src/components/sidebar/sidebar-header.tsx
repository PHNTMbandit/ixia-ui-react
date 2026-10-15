import { cn } from '@/utils/cn'

import { useSidebar } from './sidebar-provider'
import type { SidebarHeaderProps } from './sidebar.types'

export function SidebarHeader({ className, children, ref, ...props }: SidebarHeaderProps) {
  const { open, collapsible } = useSidebar(),
    isExpanded = collapsible === 'none' || open

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-start gap-xs truncate style-text-strong-1 transition-all duration-200 ease-out',
        !open && 'self-center',
        open && 'h-2xl pr-3xs pl-xs',
        open && 'justify-between',
        collapsible !== 'none' && 'animate-in',
        isExpanded && 'fade-in-0',
        !isExpanded && 'fade-out-0',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children(isExpanded)}
    </div>
  )
}
