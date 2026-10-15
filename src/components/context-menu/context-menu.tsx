import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'

import type { ContextMenuProps } from './context-menu.types'

export function ContextMenu({ ...props }: ContextMenuProps) {
  return <BaseContextMenu.Root {...props} />
}
