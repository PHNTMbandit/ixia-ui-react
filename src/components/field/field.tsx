import { cn } from '@/utils/cn'

import type { FieldProps } from './field.types'

export function Field({ className, children, ref, ...props }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2xs', className)} ref={ref} {...props}>
      {children}
    </div>
  )
}
