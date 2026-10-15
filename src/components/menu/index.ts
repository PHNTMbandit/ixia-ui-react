import { Menu as MenuRoot } from './menu'
import { MenuCheckboxItem } from './menu-checkbox-item'
import { MenuGroup } from './menu-group'
import { MenuGroupLabel } from './menu-group-label'
import { MenuItem } from './menu-item'
import { MenuPopup } from './menu-popup'
import { MenuRadioGroup } from './menu-radio-group'
import { MenuRadioItem } from './menu-radio-item'
import { MenuSeparator } from './menu-separator'
import { MenuShortcut } from './menu-shortcut'
import { MenuSubmenu } from './menu-submenu'
import { MenuSubmenuTrigger } from './menu-submenu-trigger'
import { MenuTrigger } from './menu-trigger'

const Menu = Object.assign(MenuRoot, {
  CheckboxItem: MenuCheckboxItem,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  Item: MenuItem,
  Popup: MenuPopup,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Separator: MenuSeparator,
  Shortcut: MenuShortcut,
  Submenu: MenuSubmenu,
  SubmenuTrigger: MenuSubmenuTrigger,
  Trigger: MenuTrigger,
})

export type {
  MenuCheckboxItemProps,
  MenuGroupLabelProps,
  MenuGroupProps,
  MenuItemProps,
  MenuPopupProps,
  MenuProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuSeparatorProps,
  MenuShortcutProps,
  MenuSubmenuProps,
  MenuSubmenuTriggerProps,
  MenuTriggerProps,
} from './menu.types'
export { MenuCheckboxItem } from './menu-checkbox-item'
export { MenuGroup } from './menu-group'
export { MenuGroupLabel } from './menu-group-label'
export { MenuItem } from './menu-item'
export { MenuPopup } from './menu-popup'
export { MenuRadioGroup } from './menu-radio-group'
export { MenuRadioItem } from './menu-radio-item'
export { MenuSeparator } from './menu-separator'
export { MenuShortcut } from './menu-shortcut'
export { MenuSubmenu } from './menu-submenu'
export { MenuSubmenuTrigger } from './menu-submenu-trigger'
export { MenuTrigger } from './menu-trigger'

export { Menu }
