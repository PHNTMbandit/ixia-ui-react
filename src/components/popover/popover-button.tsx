import { cn } from '@/utils/cn'

import { Button } from '../button'
import type { PopoverButtonProps } from './popover.types'

export function PopoverButton({
  variant,
  tone,
  className,
  children,
  ref,
  ...props
}: PopoverButtonProps) {
  if (variant === 'ghost' && tone === 'neutral') {
    return (
      <Button
        variant={variant}
        tone={tone}
        className={cn('hover:bg-neutral-container-high!', className)}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    )
  }

  return (
    <Button variant={variant} tone={tone} className={cn('', className)} ref={ref} {...props}>
      {children}
    </Button>
  )
}
