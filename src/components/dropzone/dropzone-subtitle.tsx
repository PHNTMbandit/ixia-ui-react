import { cn } from '@/utils/cn'

import type { DropzoneSubtitleProps } from './dropzone.types'

export function DropzoneSubtitle({ className, ref, ...props }: DropzoneSubtitleProps) {
  return <span className={cn('text-on-surface-variant', className)} ref={ref} {...props} />
}
