import { Button as BaseButton } from '@base-ui/react'

import { cn } from '@/utils/cn'
import { hasSingleElementChild } from '@/utils/has-single-element-child'
import { trimTextChildren } from '@/utils/trim-text-children'

import { useButtonGroupContext } from '../button-group/button-group-context'
import { buttonVariants } from './button.types'
import type { ButtonProps } from './button.types'

export function Button(buttonProps: ButtonProps) {
  const group = useButtonGroupContext(),
    {
      size = group?.size,
      tone = group?.tone,
      variant = group?.variant,
      className,
      children,
      ...props
    } = buttonProps

  let iconOnly: '' | undefined = undefined

  if (hasSingleElementChild(children)) {
    iconOnly = ''
  }

  return (
    <BaseButton
      data-slot="button"
      data-icon-only={iconOnly}
      data-size={size}
      className={cn(
        buttonVariants({ size, tone, variant }),
        group && 'border-0 shadow-none',
        group && variant === 'elevated' && 'not-active:hover:shadow-none active:scale-100',
        group &&
          variant === 'elevated' &&
          tone === 'neutral' &&
          'not-active:hover:text-neutral-on-container active:bg-surface',
        className,
      )}
      {...props}
    >
      {trimTextChildren(children)}
    </BaseButton>
  )
}
