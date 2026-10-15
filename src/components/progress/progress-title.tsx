import { cn } from '@/utils/cn'

import type { ProgressTitleProps } from './progress.types'

export function ProgressTitle({ className, children, ref, ...props }: ProgressTitleProps) {
  return (
    <span
      data-slot="progress-title"
      className={cn('block text-center style-text-strong--2 text-on-surface', className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
}
