import { cn } from '@/utils/cn'

import { bentoBoxVariants } from './bento-box.types'
import type { BentoBoxProps } from './bento-box.types'

export function BentoBox({ elevation, fill, size, className, ref, ...props }: BentoBoxProps) {
  return (
    <div
      data-size={size}
      className={cn(bentoBoxVariants({ className, elevation, fill, size }))}
      ref={ref}
      {...props}
    />
  )
}
