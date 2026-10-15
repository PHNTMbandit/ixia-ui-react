import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'

import { cn } from '@/utils/cn'

import type { ContextMenuTriggerProps } from './context-menu.types'

export function ContextMenuTrigger({ className, ref, ...props }: ContextMenuTriggerProps) {
  return (
    <BaseContextMenu.Trigger
      className={cn('flex min-w-0 flex-1', className)}
      ref={ref}
      {...props}
    />
  )
}
