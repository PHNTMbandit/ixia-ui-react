import { cn } from '@/utils/cn'

import { fieldVariants } from './field.types'
import type { FieldProps } from './field.types'

export function Field({
  orientation = 'vertical',
  className,
  children,
  ref,
  ...props
}: FieldProps) {
  return (
    <div
      className={cn(fieldVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot="field"
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
