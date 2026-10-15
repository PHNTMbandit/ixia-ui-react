import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'

import { cn } from '@/utils/cn'

import type { ContextMenuSeparatorProps } from './context-menu.types'

export function ContextMenuSeparator({ className, ref, ...props }: ContextMenuSeparatorProps) {
  return (
    <BaseContextMenu.Separator
      className={cn('mx-2xs my-3xs h-px bg-border-strong', className)}
      ref={ref}
      {...props}
    />
  )
}
