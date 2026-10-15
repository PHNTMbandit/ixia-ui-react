import { cn } from '@/utils/cn'

import type { SelectDescriptionProps } from './select.types'

export function SelectDescription({ className, ref, ...props }: SelectDescriptionProps) {
  return (
    <span
      className={cn(
        'style-text-prose--1 text-on-surface-variant transition-colors group-data-highlighted/item:text-neutral-on-container group-data-selected/item:text-neutral-on-default',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
