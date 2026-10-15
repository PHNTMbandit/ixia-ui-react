import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'

import { cn } from '@/utils/cn'

import { contextMenuItemVariants } from './context-menu.types'
import type { ContextMenuItemProps } from './context-menu.types'

export function ContextMenuItem({
  className,
  tone,
  children,
  ref,
  ...props
}: ContextMenuItemProps) {
  return (
    <BaseContextMenu.Item
      className={cn(contextMenuItemVariants({ tone }), className)}
      nativeButton
      ref={ref}
      render={(renderProps) => (
        <button
          type="button"
          {...renderProps}
          className={cn('w-full gap-2xs [&>svg]:size-sm', renderProps.className)}
        >
          {children}
        </button>
      )}
      {...props}
    />
  )
}
