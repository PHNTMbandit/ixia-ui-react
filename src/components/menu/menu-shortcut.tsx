import { cn } from '@/utils/cn'

import type { MenuShortcutProps } from './menu.types'

export function MenuShortcut({ className, ref, ...props }: MenuShortcutProps) {
  return (
    <div
      className={cn('ml-auto inline-flex items-center gap-3xs', className)}
      ref={ref}
      {...props}
    />
  )
}
