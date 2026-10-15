import { cn } from '@/utils/cn'

import { Button } from '../button'
import type { DropzoneTriggerProps } from './dropzone.types'
import { useDropzone } from './dropzone.utils'

export function DropzoneTrigger({ className, ref, ...props }: DropzoneTriggerProps) {
  const { inputRef } = useDropzone(),
    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      inputRef.current?.click()
    }

  return (
    <Button
      variant="link"
      onClick={handleClick}
      className={cn('', className)}
      ref={ref}
      {...props}
    />
  )
}
