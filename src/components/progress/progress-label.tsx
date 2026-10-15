import { cn } from '@/utils/cn'

import type { ProgressLabelProps } from './progress.types'

export function ProgressLabel({ className, children, ref, ...props }: ProgressLabelProps) {
  return (
    <span
      data-slot="progress-label"
      className={cn('inline-flex items-center justify-center', className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
}
