import { Menu as BaseMenu } from '@base-ui/react/menu'

import type { MenuSubmenuProps } from './menu.types'

export function MenuSubmenu({ ...props }: MenuSubmenuProps) {
  return <BaseMenu.SubmenuRoot {...props} />
}
