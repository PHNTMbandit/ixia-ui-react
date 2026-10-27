import { cn } from '@/utils/cn'

import type { AlertTitleProps } from './alert.types'

export function AlertTitle({ className, ref, ...props }: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'flex items-center gap-2xs font-heading text-base font-bold [&:has(~_[data-slot=alert-description])]:leading-[1.2] [&:not(:has(~_[data-slot=alert-description]))]:leading-none',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
