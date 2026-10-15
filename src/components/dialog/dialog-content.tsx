import { cn } from '@/utils/cn'

import type { DialogContentProps } from './dialog.types'

export function DialogContent({ className, ref, ...props }: DialogContentProps) {
  return <div className={cn('flex h-full flex-col gap-sm', className)} ref={ref} {...props} />
}
