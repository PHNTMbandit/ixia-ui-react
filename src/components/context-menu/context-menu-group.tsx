import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'

import { cn } from '@/utils/cn'

import type { ContextMenuGroupProps } from './context-menu.types'

export function ContextMenuGroup({ className, ref, ...props }: ContextMenuGroupProps) {
  return <BaseContextMenu.Group className={cn('', className)} ref={ref} {...props} />
}
