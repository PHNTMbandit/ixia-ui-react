import { Button as BaseButton } from '@base-ui/react'

import { cn } from '@/utils/cn'
import { hasSingleElementChild } from '@/utils/has-single-element-child'

import { buttonVariants } from './button.types'
import type { ButtonProps } from './button.types'

export function Button({ tone, variant, size, className, children, ...props }: ButtonProps) {
  let iconOnly: '' | undefined = undefined

  if (hasSingleElementChild(children)) {
    iconOnly = ''
  }

  return (
    <BaseButton
      data-icon-only={iconOnly}
      data-size={size}
      className={cn(buttonVariants({ className, size, tone, variant }))}
      {...props}
    >
      {children}
    </BaseButton>
  )
}
