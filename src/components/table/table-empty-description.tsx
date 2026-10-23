import { cn } from '@/utils'

import type { TableEmptyDescriptionProps } from './table.types'

export function TableEmptyDescription({
  className,
  children,
  ref,
  ...props
}: TableEmptyDescriptionProps) {
  return (
    <span
      className={cn(
        'block max-w-[28rem] style-text-default--1 text-pretty wrap-break-word text-on-surface-variant',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
}
