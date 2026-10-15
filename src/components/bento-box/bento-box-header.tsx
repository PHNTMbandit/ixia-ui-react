import { cn } from '@/utils/cn'

import type { BentoBoxHeaderProps } from './bento-box.types'

export function BentoBoxHeader({ className, ref, ...props }: BentoBoxHeaderProps) {
  return (
    <div
      className={cn(
        'group/box-header grid auto-rows-min items-start space-y-2xs group-data-[size=large]/box:gap-0 group-data-[size=medium]/box:gap-0 group-data-[size=small]/box:gap-0',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
