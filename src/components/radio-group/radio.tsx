import { Radio as BaseRadio } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { Label } from '../label'
import { radioVariants } from './radio-group.types'
import type { RadioProps } from './radio-group.types'

export function Radio({ variant, className, children, ref, ...props }: RadioProps) {
  return (
    <Label htmlFor={props.id}>
      <BaseRadio.Root className={cn(radioVariants({ className, variant }))} ref={ref} {...props}>
        <BaseRadio.Indicator
          data-indicator
          className="size-2xs origin-center scale-0 rounded-full bg-surface shadow-2xs transition-transform duration-200 ease-out data-checked:scale-100"
        />
      </BaseRadio.Root>
      {children}
    </Label>
  )
}
