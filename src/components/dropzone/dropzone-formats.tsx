import { cn } from '@/utils/cn'

import type { DropzoneFormatsProps } from './dropzone.types'
import { useDropzone } from './dropzone.utils'

export function DropzoneFormats({ className, children, ref, ...props }: DropzoneFormatsProps) {
  const { acceptedFileTypes } = useDropzone()

  return (
    <span className={cn('', className)} ref={ref} {...props}>
      {acceptedFileTypes.join(', ')}
      {children}
    </span>
  )
}
