import { cn } from '@/utils/cn'

import type { FieldSetProps } from './field.types'

export function FieldSet({ className, ref, ...props }: FieldSetProps) {
  return <fieldset className={cn('flex min-w-0 flex-col gap-md', className)} ref={ref} {...props} />
}
