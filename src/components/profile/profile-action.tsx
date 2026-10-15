import { cn } from '@/utils/cn'

import type { ProfileActionProps } from './profile.types'

export function ProfileAction({ className, ref, ...props }: ProfileActionProps) {
  return (
    <div
      className={cn('ml-auto text-on-surface-variant [&>svg]:size-sm', className)}
      ref={ref}
      {...props}
    />
  )
}
