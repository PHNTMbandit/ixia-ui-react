import { cn } from '@/utils/cn'

import type { SelectTitleProps } from './select.types'

export function SelectTitle({ className, ref, ...props }: SelectTitleProps) {
  return (
    <span
      className={cn(
        'flex items-center gap-2xs style-text-default-0 text-on-surface transition-colors group-data-highlighted/item:text-neutral-on-container group-data-selected/item:text-neutral-on-default',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
