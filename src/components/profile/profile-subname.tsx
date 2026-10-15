import { cn } from '@/utils/cn'

import type { ProfileSubnameProps } from './profile.types'

export function ProfileSubname({ className, ref, ...props }: ProfileSubnameProps) {
  return (
    <span
      className={cn('style-text-default--2 text-on-surface-variant', className)}
      ref={ref}
      {...props}
    />
  )
}
