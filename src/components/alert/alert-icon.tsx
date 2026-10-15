import { cn } from '@/utils/cn'

import type { AlertIconProps } from './alert.types'

export function AlertIcon({ className, ref, ...props }: AlertIconProps) {
  return (
    <div
      data-slot="alert-icon"
      className={cn(
        'col-start-1 row-start-1 self-start transition-colors [&>svg]:size-md',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
