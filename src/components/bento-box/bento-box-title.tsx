import { cn } from '@/utils/cn'

import type { BentoBoxTitleProps } from './bento-box.types'

export function BentoBoxTitle({ className, ref, ...props }: BentoBoxTitleProps) {
  return (
    <span
      className={cn(
        'group-data-[size=large]/box:style-text-strong-1 not-first:group-data-[size=large]/box:pt-xs group-data-[size=medium]/box:style-text-strong-0 not-first:group-data-[size=medium]/box:pt-2xs group-data-[size=small]/box:style-text-strong--1 not-first:group-data-[size=small]/box:pt-3xs',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
