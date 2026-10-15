import { cn } from '@/utils/cn'

import type { FieldSetProps } from './field.types'

export function FieldSet({ className, ref, ...props }: FieldSetProps) {
  return <div className={cn('flex w-full flex-col gap-2xs', className)} ref={ref} {...props} />
}
