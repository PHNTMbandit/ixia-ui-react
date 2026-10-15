import { cn } from '@/utils/cn'

import type { DropzoneIconProps } from './dropzone.types'

export function DropzoneIcon({ className, ref, ...props }: DropzoneIconProps) {
  return (
    <div
      className={cn(
        'rounded-full bg-brand-container p-sm [&>svg]:size-lg [&>svg]:text-brand-on-container',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
