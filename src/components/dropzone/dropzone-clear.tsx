import { cn } from '@/utils/cn'

import { Button } from '../button'
import type { DropzoneClearProps } from './dropzone.types'
import { useDropzone } from './dropzone.utils'

const EMPTY_FILE_COUNT = 0

export function DropzoneClear({ className, ref, ...props }: DropzoneClearProps) {
  const { files, setFiles } = useDropzone()

  return (
    <Button
      disabled={files.length === EMPTY_FILE_COUNT}
      onClick={() => setFiles([])}
      tone="error"
      variant="outline"
      className={cn('w-full', className)}
      ref={ref}
      {...props}
    />
  )
}
