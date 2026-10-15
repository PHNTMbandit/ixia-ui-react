import { cn } from '@/utils/cn'

import type { BentoBoxContentProps } from './bento-box.types'

export function BentoBoxContent({ className, ref, ...props }: BentoBoxContentProps) {
  return (
    <div className={cn('flex min-h-0 flex-1 flex-col gap-3xs', className)} ref={ref} {...props} />
  )
}
