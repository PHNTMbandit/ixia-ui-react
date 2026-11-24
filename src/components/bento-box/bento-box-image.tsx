import { cn } from '@/utils/cn'

import type { BentoBoxImageProps } from './bento-box.types'

export function BentoBoxImage({ alt, className, ref, ...props }: BentoBoxImageProps) {
  return (
    <img
      className={cn(
        'col-start-1 row-start-1 aspect-video size-full min-h-0 flex-1 object-cover',
        className,
      )}
      ref={ref}
      alt={alt}
      {...props}
    />
  )
}
