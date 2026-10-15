import { cn } from '@/utils/cn'

import type { DropzoneFileSizeLimitProps } from './dropzone.types'
import { useDropzone } from './dropzone.utils'

export function DropzoneFileSizeLimit({
  className,
  children,
  ref,
  ...props
}: DropzoneFileSizeLimitProps) {
  const { maxFileSize } = useDropzone()

  return (
    <span className={cn('', className)} ref={ref} {...props}>
      {children}
      {maxFileSize}
    </span>
  )
}
