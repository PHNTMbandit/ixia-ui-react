import { Button as BaseButton } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { buttonVariants } from './button.types'
import type { ButtonProps } from './button.types'

export function Button({ tone, variant, size, className, ...props }: ButtonProps) {
  return (
    <BaseButton
      data-size={size}
      className={cn(buttonVariants({ className, size, tone, variant }))}
      {...props}
    />
  )
}
