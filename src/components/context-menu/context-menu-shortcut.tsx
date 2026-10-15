import { cn } from '@/utils/cn'

import type { ContextMenuShortcutProps } from './context-menu.types'

export function ContextMenuShortcut({ className, ref, ...props }: ContextMenuShortcutProps) {
  return (
    <div
      className={cn('ml-auto inline-flex items-center gap-3xs', className)}
      ref={ref}
      {...props}
    />
  )
}
