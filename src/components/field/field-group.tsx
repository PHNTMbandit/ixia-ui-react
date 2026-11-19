import { cn } from '@/utils/cn'

import type { FieldGroupProps } from './field.types'

export function FieldGroup({ className, children, ref, ...props }: FieldGroupProps) {
  return (
    <div className={cn('mt-sm flex flex-col gap-sm', className)} ref={ref} {...props}>
      {children}
    </div>
  )
}
