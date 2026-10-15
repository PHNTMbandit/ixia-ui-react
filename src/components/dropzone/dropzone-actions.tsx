import { cn } from '@/utils/cn'

import type { DropzoneActionsProps } from './dropzone.types'

export function DropzoneActions({ className, ref, ...props }: DropzoneActionsProps) {
  return <div className={cn('flex items-center gap-xs', className)} ref={ref} {...props} />
}
