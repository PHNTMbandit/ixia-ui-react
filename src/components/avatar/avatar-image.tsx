import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import type { ImageLoadingStatus } from '@base-ui/react/avatar'
import React from 'react'

import { cn } from '@/utils/cn'

import { Skeleton } from '../skeleton'
import type { AvatarImageProps } from './avatar.types'

export function AvatarImage({ className, ref, ...props }: AvatarImageProps) {
  const [status, setStatus] = React.useState<ImageLoadingStatus>('loading')

  return (
    <>
      {status === 'loading' && <Skeleton className="absolute inset-0 size-full rounded-full" />}
      <BaseAvatar.Image
        onLoadingStatusChange={setStatus}
        className={cn('size-full rounded-full object-cover', className)}
        data-slot="avatar-image"
        ref={ref}
        {...props}
      />
    </>
  )
}
