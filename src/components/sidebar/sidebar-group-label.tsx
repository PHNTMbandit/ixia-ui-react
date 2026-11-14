import { cn } from '@/utils/cn'

import { useSidebar } from './sidebar-provider'
import type { SidebarGroupLabelProps } from './sidebar.types'

export function SidebarGroupLabel({ className, ref, ...props }: SidebarGroupLabelProps) {
  const { open, collapsible } = useSidebar(),
    showLabel = collapsible === 'none' || open

  return (
    <span
      aria-hidden={!showLabel || undefined}
      className={cn(
        'inline-flex h-md min-target-h w-full items-center justify-between truncate pr-3xs pl-[calc(var(--ixia-spacing-md)-1px)] style-text-default--1 text-on-surface-variant transition-all duration-300 ease-in-out motion-reduce:transition-none',
        collapsible === 'offcanvas' && open && 'animate-in fade-in-0 slide-in-from-left-2',
        !showLabel && '-mb-2xs h-0 min-h-0! opacity-0',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
