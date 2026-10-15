import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

import { cn } from '@/utils/cn'

import type { AvatarFallbackProps } from './avatar.types'

export function AvatarFallback({ className, ref, ...props }: AvatarFallbackProps) {
  return (
    <BaseAvatar.Fallback
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-surface-3 align-middle shadow-2xs select-none',
        className,
      )}
      data-slot="avatar-fallback"
      ref={ref}
      {...props}
    />
  )
}
