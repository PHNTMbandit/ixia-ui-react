import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

import { cn } from '@/utils/cn'

import { avatarVariants } from './avatar.types'
import type { AvatarProps } from './avatar.types'

export function Avatar({ size = 'medium', className, ref, ...props }: AvatarProps) {
  return (
    <BaseAvatar.Root
      className={cn(avatarVariants({ className, size }))}
      data-size={size}
      data-slot="avatar"
      ref={ref}
      {...props}
    />
  )
}
