import { cn } from '@/utils/cn'

import { alertVariants } from './alert.types'
import type { AlertProps } from './alert.types'

export function Alert({ tone, className, ref, ...props }: AlertProps) {
  return <div className={cn(alertVariants({ className, tone }))} ref={ref} {...props} />
}
