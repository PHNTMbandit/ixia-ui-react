import { cn } from '@/utils/cn'

import type { DropzoneFileLimitProps } from './dropzone.types'
import { useDropzone } from './dropzone.utils'

export function DropzoneFileLimit({ className, children, ref, ...props }: DropzoneFileLimitProps) {
  const { files, maxFiles } = useDropzone()

  if (maxFiles === undefined) {
    return undefined
  }

  return (
    <span
      className={cn('style-text-default--1 text-on-surface-variant', className)}
      ref={ref}
      {...props}
    >
      {files.length}/{maxFiles}
      {children}
    </span>
  )
}
