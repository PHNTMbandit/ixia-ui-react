import { cn } from '@/utils/cn'

import type { BentoBoxFooterProps } from './bento-box.types'

export function BentoBoxFooter({ className, ref, ...props }: BentoBoxFooterProps) {
  return (
    <div
      className={cn(
        'mt-auto flex flex-wrap items-center justify-start gap-sm not-first:group-data-[size=large]/box:gap-lg not-first:group-data-[size=medium]/box:gap-md group-data-[size=small]/box:gap-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
