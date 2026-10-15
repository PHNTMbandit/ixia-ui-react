import { NavBar as NavBarRoot } from './nav-bar'
import { NavBarItem } from './nav-bar-item'
import { NavBarItemIcon } from './nav-bar-item-icon'
import { NavBarItemLabel } from './nav-bar-item-label'

const NavBar = Object.assign(NavBarRoot, {
  Item: NavBarItem,
  ItemIcon: NavBarItemIcon,
  ItemLabel: NavBarItemLabel,
})

export type {
  NavBarProps,
  NavBarItemIconProps,
  NavBarItemProps,
  NavBarItemLabelProps,
} from './nav-bar.types'
export { NavBarItem } from './nav-bar-item'
export { NavBarItemIcon } from './nav-bar-item-icon'
export { NavBarItemLabel } from './nav-bar-item-label'

export { NavBar }
