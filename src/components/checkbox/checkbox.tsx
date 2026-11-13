import { Checkbox as BaseCheckbox } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { CheckboxIndicator } from './checkbox-indicator'
import { checkboxVariants } from './checkbox.types'
import type { CheckboxRootProps } from './checkbox.types'

export function Checkbox({ variant, className, ref, ...props }: CheckboxRootProps) {
  return (
    <BaseCheckbox.Root
      className={cn(checkboxVariants({ className, variant }))}
      ref={ref}
      {...props}
    >
      <CheckboxIndicator />
    </BaseCheckbox.Root>
  )
}
