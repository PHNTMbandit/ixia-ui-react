import { cn } from '@/utils/cn'

import type { DropzoneFilesProps } from './dropzone.types'

export function DropzoneFiles({ className, ref, ...props }: DropzoneFilesProps) {
  return <div className={cn('flex flex-col gap-xs', className)} ref={ref} {...props} />
}
