import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'

import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import { contextMenuSubmenuTriggerVariants } from './context-menu.types'
import type { ContextMenuSubmenuTriggerProps } from './context-menu.types'

export function ContextMenuSubmenuTrigger({
  className,
  children,
  ref,
  tone,
  ...props
}: ContextMenuSubmenuTriggerProps) {
  return (
    <BaseContextMenu.SubmenuTrigger
      className={cn(contextMenuSubmenuTriggerVariants({ tone }), className)}
      ref={ref}
      {...props}
    >
      <span className="flex min-w-3xl items-center gap-2xs pr-2xl">{children}</span>
      <Icon name="chevronRight" className="ml-auto size-xs shrink-0 self-center" />
    </BaseContextMenu.SubmenuTrigger>
  )
}
