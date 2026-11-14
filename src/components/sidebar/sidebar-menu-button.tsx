import { cn } from '@/utils/cn'

import { SIDEBAR_MENU_BUTTON_CLASSES } from './sidebar-menu-button.styles'
import { useSidebar } from './sidebar-provider'
import type { SidebarMenuButtonProps } from './sidebar.types'

export function SidebarMenuButton({ isActive, className, ref, ...props }: SidebarMenuButtonProps) {
  const { open, collapsible } = useSidebar()

  return (
    <button
      type="button"
      data-active={String(Boolean(isActive))}
      className={cn(
        SIDEBAR_MENU_BUTTON_CLASSES.base,
        '[&>:not(svg)]:transition-opacity [&>:not(svg)]:duration-200',
        isActive && 'pointer-events-none bg-surface-2 text-on-surface shadow-2xs',
        !isActive && SIDEBAR_MENU_BUTTON_CLASSES.idle,
        isActive && !open && 'bg-neutral-container',
        !open && cn(SIDEBAR_MENU_BUTTON_CLASSES.collapsed, '[&>:not(svg)]:opacity-0'),
        open && SIDEBAR_MENU_BUTTON_CLASSES.expanded,
        collapsible === 'offcanvas' && open && 'animate-in fade-in-0 slide-in-from-left-2',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
