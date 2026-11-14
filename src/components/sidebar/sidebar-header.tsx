import { cn } from '@/utils/cn'

import { useSidebar } from './sidebar-provider'
import type { SidebarHeaderProps } from './sidebar.types'

export function SidebarHeader({ className, children, ref, ...props }: SidebarHeaderProps) {
  const { open, collapsible, isMobile } = useSidebar(),
    isExpanded = collapsible === 'none' || open

  return (
    <div
      className={cn(
        'flex h-2xl shrink-0 items-center justify-between gap-xs truncate style-text-strong-1 transition-all duration-300 ease-in-out motion-reduce:transition-none [&>:not([data-sidebar=toggle])]:min-w-0 [&>:not([data-sidebar=toggle])]:overflow-hidden [&>[data-sidebar=toggle]]:ml-auto',
        open && 'pr-3xs pl-xs',
        !open && 'h-xl pr-[calc(2*var(--spacing-3xs))] pl-0',
        collapsible !== 'none' && 'animate-in',
        isExpanded && 'fade-in-0',
        !isExpanded && 'fade-out-0',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children(isExpanded, isMobile)}
    </div>
  )
}
