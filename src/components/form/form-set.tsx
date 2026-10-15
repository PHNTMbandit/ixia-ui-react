import { cn } from '@/utils/cn'

import type { FormSetProps } from './form.types'

export function FormSet({ className, ref, ...props }: FormSetProps) {
  return <div className={cn('flex flex-col gap-xs', className)} ref={ref} {...props} />
}
