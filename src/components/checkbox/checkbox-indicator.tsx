import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { CheckIcon, MinusIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import type { CheckboxIndicatorProps } from './checkbox.types'

export function CheckboxIndicator({ className, ...props }: CheckboxIndicatorProps) {
  return (
    <BaseCheckbox.Indicator
      className={cn('flex', className)}
      {...props}
      render={(innerProps, state) => {
        if (state.indeterminate) {
          return <MinusIcon weight="bold" {...innerProps} className="text-accent-default" />
        }
        return <CheckIcon weight="bold" {...innerProps} />
      }}
    />
  )
}
