import { cn } from '@/utils/cn'

import type { DropzoneIconProps } from './dropzone.types'

export function DropzoneIcon({ className, ref, ...props }: DropzoneIconProps) {
  return (
    <div
      className={cn(
        'rounded-full bg-brand-container p-sm [&>svg]:text-brand-on-container [:where(&)>svg]:size-lg',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
