import { cn } from '@/utils/cn'

import { bentoBoxVariants } from './bento-box.types'
import type { BentoBoxProps } from './bento-box.types'

export function BentoBox({
  elevation,
  fill,
  size = 'medium',
  span,
  className,
  ref,
  ...props
}: BentoBoxProps) {
  return (
    <div
      data-size={size}
      className={cn(bentoBoxVariants({ className, elevation, fill, size, span }))}
      ref={ref}
      {...props}
    />
  )
}
