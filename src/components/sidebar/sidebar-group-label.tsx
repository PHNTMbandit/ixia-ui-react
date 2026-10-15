import { cn } from '@/utils/cn'

import { useSidebar } from './sidebar-provider'
import type { SidebarGroupLabelProps } from './sidebar.types'

export function SidebarGroupLabel({ className, ref, ...props }: SidebarGroupLabelProps) {
  const { open, collapsible } = useSidebar(),
    showLabel = collapsible === 'none' || open

  if (!showLabel) {
    return undefined
  }

  return (
    <span
      className={cn(
        'inline-flex h-md w-full items-center justify-between truncate pr-3xs pl-sm style-text-default--1 text-on-surface-variant transition-all duration-200 ease-out',
        collapsible !== 'none' && open && 'animate-in fade-in-0 slide-in-from-left-2',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
