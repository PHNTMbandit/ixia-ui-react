import { cn } from '@/utils/cn'

import { buttonGroupVariants } from './button-group.types'
import type { ButtonGroupProps } from './button-group.types'

export function ButtonGroup({
  size,
  variant,
  tone,
  orientation,
  className,
  ref,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={cn(buttonGroupVariants({ orientation, size, tone, variant }), className)}
      ref={ref}
      {...props}
    />
  )
}
