import { Menu as BaseMenu } from '@base-ui/react/menu'

import type { MenuProps } from './menu.types'

export function Menu({ ...props }: MenuProps) {
  return <BaseMenu.Root {...props} />
}
