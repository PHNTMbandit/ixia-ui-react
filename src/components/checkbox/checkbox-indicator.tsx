import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'

import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import type { CheckboxIndicatorProps } from './checkbox.types'

export function CheckboxIndicator({ className, ...props }: CheckboxIndicatorProps) {
  return (
    <BaseCheckbox.Indicator
      className={cn('flex', className)}
      {...props}
      render={(innerProps, state) => {
        if (state.indeterminate) {
          return <Icon name="minus" {...innerProps} className="text-accent-default" />
        }
        return <Icon name="selected" {...innerProps} />
      }}
    />
  )
}
