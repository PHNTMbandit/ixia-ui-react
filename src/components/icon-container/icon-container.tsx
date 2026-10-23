import { cn } from '@/utils/cn'

import { iconContainerVariants } from './icon-container.types'
import type { IconContainerProps } from './icon-container.types'

export function IconContainer({
  shape,
  size,
  tone,
  className,
  children,
  ref,
  ...props
}: IconContainerProps) {
  return (
    <div
      className={cn(iconContainerVariants({ shape, size, tone }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
