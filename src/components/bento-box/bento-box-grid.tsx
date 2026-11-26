import { cn } from '@/utils/cn'

import type { BentoBoxGridProps } from './bento-box.types'

export function BentoBoxGrid({ className, ref, ...props }: BentoBoxGridProps) {
  return (
    <div
      className={cn(
        'grid w-full grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
