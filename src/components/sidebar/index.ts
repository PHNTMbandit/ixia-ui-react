import { Sidebar as SidebarRoot } from './sidebar'
import { SidebarContent } from './sidebar-content'
import { SidebarFooter } from './sidebar-footer'
import { SidebarGroup } from './sidebar-group'
import { SidebarGroupContent } from './sidebar-group-content'
import { SidebarGroupLabel } from './sidebar-group-label'
import { SidebarHeader } from './sidebar-header'
import { SidebarMenu } from './sidebar-menu'
import { SidebarMenuBadge } from './sidebar-menu-badge'
import { SidebarMenuButton } from './sidebar-menu-button'
import { SidebarMenuCollapsible } from './sidebar-menu-collapsible'
import { SidebarMenuCollapsiblePanel } from './sidebar-menu-collapsible-panel'
import { SidebarMenuCollapsibleTrigger } from './sidebar-menu-collapsible-trigger'
import { SidebarMenuItem } from './sidebar-menu-item'
import { SidebarProvider } from './sidebar-provider'
import { SidebarToggle } from './sidebar-toggle'

const Sidebar = Object.assign(SidebarRoot, {
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupContent: SidebarGroupContent,
  GroupLabel: SidebarGroupLabel,
  Header: SidebarHeader,
  Menu: SidebarMenu,
  MenuBadge: SidebarMenuBadge,
  MenuButton: SidebarMenuButton,
  MenuCollapsible: SidebarMenuCollapsible,
  MenuCollapsiblePanel: SidebarMenuCollapsiblePanel,
  MenuCollapsibleTrigger: SidebarMenuCollapsibleTrigger,
  MenuItem: SidebarMenuItem,
  Provider: SidebarProvider,
  Toggle: SidebarToggle,
})

export type {
  SidebarContentProps,
  SidebarFooterProps,
  SidebarGroupContentProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarMenuButtonProps,
  SidebarMenuProps,
  SidebarProps,
  SidebarToggleProps,
  SidebarMenuBadgeProps,
  SidebarMenuCollapsiblePanelProps,
  SidebarMenuCollapsibleProps,
  SidebarMenuCollapsibleTriggerProps,
  SidebarMenuItemProps,
} from './sidebar.types'
export { SidebarContent } from './sidebar-content'
export { SidebarFooter } from './sidebar-footer'
export { SidebarGroup } from './sidebar-group'
export { SidebarGroupContent } from './sidebar-group-content'
export { SidebarGroupLabel } from './sidebar-group-label'
export { SidebarHeader } from './sidebar-header'
export { SidebarMenu } from './sidebar-menu'
export { SidebarProvider, useSidebar } from './sidebar-provider'
export { SidebarToggle } from './sidebar-toggle'
export { SidebarMenuBadge } from './sidebar-menu-badge'
export { SidebarMenuButton } from './sidebar-menu-button'
export { SidebarMenuCollapsible } from './sidebar-menu-collapsible'
export { SidebarMenuCollapsiblePanel } from './sidebar-menu-collapsible-panel'
export { SidebarMenuCollapsibleTrigger } from './sidebar-menu-collapsible-trigger'
export { SidebarMenuItem } from './sidebar-menu-item'
export { getStoredSidebarOpen } from './sidebar.utils'

export { Sidebar }
