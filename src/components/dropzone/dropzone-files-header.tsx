import { cn } from '@/utils/cn'

import type { DropzoneFilesHeaderProps } from './dropzone.types'

export function DropzoneFilesHeader({ className, ref, ...props }: DropzoneFilesHeaderProps) {
  return (
    <div
      className={cn('flex items-center justify-between gap-sm', className)}
      ref={ref}
      {...props}
    />
  )
}
