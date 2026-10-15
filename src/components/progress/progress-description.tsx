import { cn } from '@/utils/cn'

import type { ProgressDescriptionProps } from './progress.types'

export function ProgressDescription({
  className,
  children,
  ref,
  ...props
}: ProgressDescriptionProps) {
  return (
    <span
      data-slot="progress-description"
      className={cn('block text-center style-text-prose--2 text-on-surface-variant', className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
}
