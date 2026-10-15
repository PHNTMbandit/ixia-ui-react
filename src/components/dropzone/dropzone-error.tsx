import { WarningCircleIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import type { DropzoneErrorProps } from './dropzone.types'
import { useDropzone } from './dropzone.utils'

export function DropzoneError({ className, children, ref, ...props }: DropzoneErrorProps) {
  const { fileError } = useDropzone()

  if (!fileError && !children) {
    return undefined
  }

  return (
    <p
      className={cn('flex items-center gap-2xs style-text-strong--1 text-error-default', className)}
      ref={ref}
      role="alert"
      {...props}
    >
      <WarningCircleIcon weight="bold" />
      {children ?? fileError}
    </p>
  )
}
