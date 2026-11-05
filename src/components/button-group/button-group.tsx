import { cn } from '@/utils/cn'

import { ButtonGroupContext } from './button-group-context'
import { buttonGroupVariants } from './button-group.types'
import type { ButtonGroupProps } from './button-group.types'

export function ButtonGroup({
  size = 'medium',
  variant = 'fill',
  tone = 'brand',
  orientation,
  className,
  ref,
  ...props
}: ButtonGroupProps) {
  return (
    <ButtonGroupContext value={{ size, tone, variant }}>
      <div
        className={cn(buttonGroupVariants({ orientation, tone, variant }), className)}
        ref={ref}
        {...props}
      />
    </ButtonGroupContext>
  )
}
