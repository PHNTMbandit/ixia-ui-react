import { cn } from '@/utils/cn'

import { useSidebar } from './sidebar-provider'
import type { SidebarFooterProps } from './sidebar.types'

export function SidebarFooter({ className, children, ref, ...props }: SidebarFooterProps) {
  const { open, collapsible } = useSidebar(),
    isExpanded = collapsible === 'none' || open
  return (
    <div
      className={cn(
        'flex shrink-0 animate-in items-center truncate p-3xs transition-all duration-300 ease-in-out',
        open && 'justify-start fade-in-0',
        !open && 'justify-center self-center fade-out-0',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children(isExpanded)}
    </div>
  )
}
