import { cn } from '@/utils/cn'

import type { AlertTitleProps } from './alert.types'

export function AlertTitle({ className, ref, ...props }: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'flex items-center gap-2xs style-text-strong-0 [&:not(:has(~_[data-slot=alert-description]))]:leading-0',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
