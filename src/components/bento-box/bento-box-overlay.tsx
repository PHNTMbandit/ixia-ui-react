import { cn } from '@/utils/cn'

import type { BentoBoxOverlayProps } from './bento-box.types'

export function BentoBoxOverlay({ className, ref, ...props }: BentoBoxOverlayProps) {
  return (
    <div
      data-slot="bento-box-overlay"
      className={cn(
        'group/box-overlay col-start-1 row-start-1 flex flex-col gap-2xs self-end rounded-b-[inherit] bg-white/10 text-white backdrop-blur-md group-data-[size=large]/box:p-lg group-data-[size=medium]/box:p-md group-data-[size=small]/box:p-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
