import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react'
import React from 'react'

import { cn } from '@/utils/cn'

import type { CheckboxGroupProps } from './checkbox-group.types'

export function CheckboxGroup({ className, ref, ...props }: CheckboxGroupProps) {
  const id = React.useId()
  return (
    <BaseCheckboxGroup
      aria-labelledby={id}
      className={cn('flex flex-col items-start gap-2xs', className)}
      ref={ref}
      {...props}
    />
  )
}
