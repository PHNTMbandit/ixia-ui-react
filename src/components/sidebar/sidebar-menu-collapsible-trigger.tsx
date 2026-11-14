import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { Popover as BasePopover } from '@base-ui/react/popover'
import { useState } from 'react'

import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import { SIDEBAR_MENU_BUTTON_CLASSES } from './sidebar-menu-button.styles'
import { useSidebar } from './sidebar-provider'
import type { SidebarMenuCollapsibleTriggerProps } from './sidebar.types'

export function SidebarMenuCollapsibleTrigger({
  className,
  children,
  ref,
  ...props
}: SidebarMenuCollapsibleTriggerProps) {
  const { open } = useSidebar(),
    [renderedOpen, setRenderedOpen] = useState(open),
    [hasToggled, setHasToggled] = useState(false),
    label = (
      <span className="flex items-center gap-2xs [&>:not(svg)]:transition-opacity [&>:not(svg)]:duration-200">
        {children}
      </span>
    )

  if (renderedOpen !== open) {
    setRenderedOpen(open)
    setHasToggled(true)
  }

  if (!open) {
    return (
      <BasePopover.Trigger
        className={cn(
          SIDEBAR_MENU_BUTTON_CLASSES.base,
          SIDEBAR_MENU_BUTTON_CLASSES.idle,
          SIDEBAR_MENU_BUTTON_CLASSES.collapsed,
          'data-popup-open:bg-neutral-container [&>span>:not(svg)]:opacity-0',
          hasToggled &&
            cn(SIDEBAR_MENU_BUTTON_CLASSES.fromExpanded, 'starting:[&>span>:not(svg)]:opacity-100'),
          className,
        )}
        ref={ref}
        {...props}
      >
        {label}
        <Icon name="chevronRight" className="absolute right-3xs size-xs text-on-surface-variant" />
      </BasePopover.Trigger>
    )
  }

  return (
    <BaseCollapsible.Trigger
      className={cn(
        SIDEBAR_MENU_BUTTON_CLASSES.base,
        SIDEBAR_MENU_BUTTON_CLASSES.idle,
        SIDEBAR_MENU_BUTTON_CLASSES.expanded,
        'group/trigger pr-sm',
        hasToggled &&
          cn(SIDEBAR_MENU_BUTTON_CLASSES.fromCollapsed, 'starting:[&>span>:not(svg)]:opacity-0'),
        className,
      )}
      ref={ref}
      {...props}
    >
      {label}
      <Icon
        name="chevronRight"
        className="ml-auto transition-transform duration-150 ease-out group-data-panel-open/trigger:rotate-90"
      />
    </BaseCollapsible.Trigger>
  )
}
