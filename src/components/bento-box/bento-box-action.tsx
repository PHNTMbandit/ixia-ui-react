import { cn } from '@/utils/cn'

import type { BentoBoxActionProps } from './bento-box.types'

export function BentoBoxAction({ className, ref, ...props }: BentoBoxActionProps) {
  return (
    <div
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end pl-lg',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
