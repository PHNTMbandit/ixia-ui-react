import { cn } from '@/utils/cn'

import type { DropzoneInfoProps } from './dropzone.types'

export function DropzoneInfo({ className, ref, ...props }: DropzoneInfoProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-sm', className)}
      ref={ref}
      {...props}
    />
  )
}
