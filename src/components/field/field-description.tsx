import { cn } from '@/utils/cn'

import type { FieldDescriptionProps } from './field.types'

export function FieldDescription({ className, ref, ...props }: FieldDescriptionProps) {
  return (
    <p
      className={cn('mt-2xs style-text-prose--1 text-on-surface-variant', className)}
      ref={ref}
      {...props}
    />
  )
}
