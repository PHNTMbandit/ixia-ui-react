import type { Badge } from '../badge'
import type { Button } from '../button'
import type { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '../collapsible'

type SidebarToggleProps = Omit<React.ComponentProps<typeof Button>, 'children'> & {
  children: React.ReactNode | ((open?: boolean) => React.ReactNode)
}
type SidebarContentProps = React.ComponentProps<'div'>
type SidebarGroupContentProps = React.ComponentProps<'div'>
type SidebarGroupLabelProps = React.ComponentProps<'span'>
type SidebarGroupProps = React.ComponentProps<'div'>
type SidebarHeaderProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  children: (isExpanded?: boolean) => React.ReactNode
}
type SidebarFooterProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  children: (isExpanded?: boolean) => React.ReactNode
}
type SidebarMenuProps = React.ComponentProps<'div'>
type SidebarProps = React.ComponentProps<'div'> & {
  tone?: 'primary' | 'secondary' | 'ghost'
  width?: string | number
}

type SidebarMenuButtonProps = React.ComponentProps<'button'> & {
  isActive?: boolean
}
type SidebarMenuItemProps = React.ComponentProps<'div'>
type SidebarMenuBadgeProps = React.ComponentProps<typeof Badge>
type SidebarMenuCollapsibleTriggerProps = React.ComponentProps<typeof CollapsibleTrigger>
type SidebarMenuCollapsibleProps = React.ComponentProps<typeof Collapsible>
type SidebarMenuCollapsiblePanelProps = React.ComponentProps<typeof CollapsiblePanel>

export type {
  SidebarToggleProps,
  SidebarContentProps,
  SidebarGroupContentProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarFooterProps,
  SidebarMenuProps,
  SidebarProps,
  SidebarMenuButtonProps,
  SidebarMenuItemProps,
  SidebarMenuBadgeProps,
  SidebarMenuCollapsibleTriggerProps,
  SidebarMenuCollapsibleProps,
  SidebarMenuCollapsiblePanelProps,
}
