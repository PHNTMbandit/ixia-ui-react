import { cn } from '@/utils/cn'

import { fieldLegendVariants } from './field.types'
import type { FieldLegendProps } from './field.types'

export function FieldLegend({ size, className, ref, ...props }: FieldLegendProps) {
  return <legend className={cn(fieldLegendVariants({ size }), className)} ref={ref} {...props} />
}
