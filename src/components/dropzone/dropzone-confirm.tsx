import { cn } from '@/utils/cn'

import { Button } from '../button'
import type { DropzoneConfirmProps } from './dropzone.types'
import { useDropzone } from './dropzone.utils'

const EMPTY_FILE_COUNT = 0

export function DropzoneConfirm({ className, ref, ...props }: DropzoneConfirmProps) {
  const { files, onConfirm } = useDropzone(),
    handleClick = () => {
      if (onConfirm) {
        onConfirm(files)
      }
    }
  return (
    <Button
      disabled={files.length === EMPTY_FILE_COUNT}
      onClick={handleClick}
      className={cn('w-full', className)}
      ref={ref}
      {...props}
    />
  )
}
