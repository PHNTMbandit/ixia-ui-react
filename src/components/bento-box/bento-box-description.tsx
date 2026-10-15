import { cn } from '@/utils/cn'

import type { BentoBoxDescriptionProps } from './bento-box.types'

export function BentoBoxDescription({ className, ref, ...props }: BentoBoxDescriptionProps) {
  return (
    <span
      className={cn(
        'text-on-surface-variant group-data-[size=large]/box:style-text-prose-0 group-data-[size=medium]/box:style-text-prose--1 group-data-[size=small]/box:style-text-prose--2',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
