import { cn } from '@/utils/cn'

import type { ProfileNameProps } from './profile.types'

export function ProfileName({ className, ref, ...props }: ProfileNameProps) {
  return (
    <span
      className={cn('flex items-center gap-xs style-text-default-0 [&>svg]:size-md', className)}
      ref={ref}
      {...props}
    />
  )
}
