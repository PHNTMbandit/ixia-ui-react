import { cn } from '@/utils/cn'

import type { DropzoneHeadingProps } from './dropzone.types'

export function DropzoneHeading({ className, ref, ...props }: DropzoneHeadingProps) {
  return <span className={cn('style-text-default-0', className)} ref={ref} {...props} />
}
