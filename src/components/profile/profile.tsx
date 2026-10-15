import { cn } from '@/utils/cn'

import type { ProfileProps } from './profile.types'

export function Profile({ className, ref, ...props }: ProfileProps) {
  return (
    <div
      className={cn('flex w-full items-center gap-sm rounded-full', className)}
      ref={ref}
      {...props}
    />
  )
}
