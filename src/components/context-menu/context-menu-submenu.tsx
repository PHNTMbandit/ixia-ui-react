import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'

import type { ContextMenuSubmenuProps } from './context-menu.types'

export function ContextMenuSubmenu({ ...props }: ContextMenuSubmenuProps) {
  return <BaseContextMenu.SubmenuRoot {...props} />
}
