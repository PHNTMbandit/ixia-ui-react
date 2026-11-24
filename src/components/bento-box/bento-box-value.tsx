import { cn } from '@/utils/cn'

import type { BentoBoxValueProps } from './bento-box.types'

export function BentoBoxValue({ className, ref, ...props }: BentoBoxValueProps) {
  return (
    <span
      className={cn(
        'text-on-surface group-data-[size=large]/box:style-text-strong-3 group-data-[size=medium]/box:style-text-strong-2 group-data-[size=small]/box:style-text-strong-1 group-data-[slot=bento-box-overlay]/box-overlay:text-inherit',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
