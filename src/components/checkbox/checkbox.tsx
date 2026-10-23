import { Checkbox as BaseCheckbox } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { Label } from '../label'
import { CheckboxIndicator } from './checkbox-indicator'
import { checkboxVariants } from './checkbox.types'
import type { CheckboxRootProps } from './checkbox.types'

export function Checkbox({ variant, children, className, ref, ...props }: CheckboxRootProps) {
  return (
    <Label className="flex items-center gap-xs has-disabled:opacity-50">
      <BaseCheckbox.Root
        className={cn(checkboxVariants({ className, variant }))}
        ref={ref}
        {...props}
      >
        <CheckboxIndicator />
      </BaseCheckbox.Root>
      {children}
    </Label>
  )
}
