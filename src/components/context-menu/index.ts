import { ContextMenu as ContextMenuRoot } from './context-menu'
import { ContextMenuCheckboxItem } from './context-menu-checkbox-item'
import { ContextMenuGroup } from './context-menu-group'
import { ContextMenuGroupLabel } from './context-menu-group-label'
import { ContextMenuItem } from './context-menu-item'
import { ContextMenuPopup } from './context-menu-popup'
import { ContextMenuRadioGroup } from './context-menu-radio-group'
import { ContextMenuRadioItem } from './context-menu-radio-item'
import { ContextMenuSeparator } from './context-menu-separator'
import { ContextMenuShortcut } from './context-menu-shortcut'
import { ContextMenuSubmenu } from './context-menu-submenu'
import { ContextMenuSubmenuTrigger } from './context-menu-submenu-trigger'
import { ContextMenuTrigger } from './context-menu-trigger'

const ContextMenu = Object.assign(ContextMenuRoot, {
  CheckboxItem: ContextMenuCheckboxItem,
  Group: ContextMenuGroup,
  GroupLabel: ContextMenuGroupLabel,
  Item: ContextMenuItem,
  Popup: ContextMenuPopup,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Separator: ContextMenuSeparator,
  Shortcut: ContextMenuShortcut,
  Submenu: ContextMenuSubmenu,
  SubmenuTrigger: ContextMenuSubmenuTrigger,
  Trigger: ContextMenuTrigger,
})

export type {
  ContextMenuCheckboxItemProps,
  ContextMenuGroupLabelProps,
  ContextMenuGroupProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuShortcutProps,
  ContextMenuItemProps,
  ContextMenuPopupProps,
  ContextMenuProps,
  ContextMenuSeparatorProps,
  ContextMenuSubmenuProps,
  ContextMenuSubmenuTriggerProps,
  ContextMenuTriggerProps,
} from './context-menu.types'
export { ContextMenuCheckboxItem } from './context-menu-checkbox-item'
export { ContextMenuGroup } from './context-menu-group'
export { ContextMenuGroupLabel } from './context-menu-group-label'
export { ContextMenuRadioGroup } from './context-menu-radio-group'
export { ContextMenuRadioItem } from './context-menu-radio-item'
export { ContextMenuShortcut } from './context-menu-shortcut'
export { ContextMenuItem } from './context-menu-item'
export { ContextMenuPopup } from './context-menu-popup'
export { ContextMenuSeparator } from './context-menu-separator'
export { ContextMenuSubmenu } from './context-menu-submenu'
export { ContextMenuSubmenuTrigger } from './context-menu-submenu-trigger'
export { ContextMenuTrigger } from './context-menu-trigger'

export { ContextMenu }
