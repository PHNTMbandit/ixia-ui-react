import { cn } from '@/utils/cn'
import { hasSingleElementChild } from '@/utils/has-single-element-child'
import { trimTextChildren } from '@/utils/trim-text-children'

import { badgeVariants } from './badge.types'
import type { BadgeProps } from './badge.types'

export function Badge({ className, size, tone, variant, ref, children, ...props }: BadgeProps) {
  let iconOnly: '' | undefined = undefined

  if (hasSingleElementChild(children)) {
    iconOnly = ''
  }

  return (
    <div
      data-icon-only={iconOnly}
      className={cn(badgeVariants({ className, size, tone, variant }))}
      ref={ref}
      {...props}
    >
      {trimTextChildren(children)}
    </div>
  )
}
