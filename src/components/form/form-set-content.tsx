import { cn } from '@/utils/cn'

import type { FormSetContentProps } from './form.types'

export function FormSetContent({ className, ref, ...props }: FormSetContentProps) {
  return <div className={cn('flex flex-col gap-md', className)} ref={ref} {...props} />
}
