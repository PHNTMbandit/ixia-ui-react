import { RadioGroup as BaseRadioGroup } from '@base-ui/react'
import React from 'react'

import { cn } from '@/utils/cn'

import type { RadioGroupProps } from './radio-group.types'

export function RadioGroup({ className, ref, ...props }: RadioGroupProps) {
  const id = React.useId()

  return (
    <BaseRadioGroup
      aria-labelledby={id}
      className={cn('flex flex-col items-start gap-2xs data-disabled:opacity-50', className)}
      ref={ref}
      {...props}
    />
  )
}
