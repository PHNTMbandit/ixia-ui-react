import { NavigationMenu as NavigationMenuRoot } from './navigation-menu'
import { NavigationMenuContent } from './navigation-menu-content'
import { NavigationMenuContentLink } from './navigation-menu-content-link'
import { NavigationMenuIcon } from './navigation-menu-icon'
import { NavigationMenuItem } from './navigation-menu-item'
import { NavigationMenuLink } from './navigation-menu-link'
import { NavigationMenuList } from './navigation-menu-list'
import { NavigationMenuPopup } from './navigation-menu-popup'
import { NavigationMenuTrigger } from './navigation-menu-trigger'

const NavigationMenu = Object.assign(NavigationMenuRoot, {
  Content: NavigationMenuContent,
  ContentLink: NavigationMenuContentLink,
  Icon: NavigationMenuIcon,
  Item: NavigationMenuItem,
  Link: NavigationMenuLink,
  List: NavigationMenuList,
  Popup: NavigationMenuPopup,
  Trigger: NavigationMenuTrigger,
})

export type {
  NavigationMenuContentLinkProps,
  NavigationMenuContentProps,
  NavigationMenuIconProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuPopupProps,
  NavigationMenuProps,
  NavigationMenuTriggerProps,
} from './navigation-menu.types'

export { NavigationMenuContent } from './navigation-menu-content'
export { NavigationMenuContentLink } from './navigation-menu-content-link'
export { NavigationMenuIcon } from './navigation-menu-icon'
export { NavigationMenuItem } from './navigation-menu-item'
export { NavigationMenuLink } from './navigation-menu-link'
export { NavigationMenuList } from './navigation-menu-list'
export { NavigationMenuPopup } from './navigation-menu-popup'
export { NavigationMenuTrigger } from './navigation-menu-trigger'

export { NavigationMenu }
