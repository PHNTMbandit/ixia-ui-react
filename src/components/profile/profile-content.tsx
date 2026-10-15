import { cn } from '@/utils/cn'

import type { ProfileContentProps } from './profile.types'

export function ProfileContent({ compact, className, ref, ...props }: ProfileContentProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-start justify-start gap-3xs',
        compact && 'hidden',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
