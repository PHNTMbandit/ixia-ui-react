import { Select as BaseSelect } from '@base-ui/react/select'

import { cn } from '@/utils/cn'

import { selectVariants } from './select.types'
import type { SelectTriggerProps } from './select.types'

export function SelectTrigger({ variant, size, className, ref, ...props }: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      className={cn(selectVariants({ className, size, variant }))}
      ref={ref}
      {...props}
    />
  )
}
