import { cn } from '@/utils/cn'

import { avatarBadgeVariants } from './avatar.types'
import type { AvatarBadgeProps } from './avatar.types'

export function AvatarBadge({ tone, position, className, ref, ...props }: AvatarBadgeProps) {
  return (
    <div
      data-slot="avatar-badge"
      className={cn(avatarBadgeVariants({ className, position, tone }))}
      ref={ref}
      {...props}
    />
  )
}
