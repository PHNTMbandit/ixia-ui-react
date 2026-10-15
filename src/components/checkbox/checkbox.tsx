import { Checkbox as BaseCheckbox } from '@base-ui/react'
import { useId } from 'react'

import { cn } from '@/utils/cn'

import { Label } from '../label'
import { CheckboxIndicator } from './checkbox-indicator'
import { checkboxVariants } from './checkbox.types'
import type { CheckboxRootProps } from './checkbox.types'

export function Checkbox({ variant, className, label, id, ref, ...props }: CheckboxRootProps) {
  const generatedId = useId(),
    hasLabel = label !== undefined && label !== null
  let checkboxId = id
  if (checkboxId === undefined && hasLabel) {
    checkboxId = generatedId
  }

  return (
    <div className="flex items-center gap-xs">
      <BaseCheckbox.Root
        className={cn(checkboxVariants({ className, variant }))}
        id={checkboxId}
        ref={ref}
        {...props}
      >
        <CheckboxIndicator />
      </BaseCheckbox.Root>
      {hasLabel && <Label htmlFor={checkboxId}>{label}</Label>}
    </div>
  )
}
