import { cn } from '@/utils/cn'

import { Input } from '../input'
import { getPrimaryValue, useSliderGroupContext, withPrimaryValue } from './slider-group-context'
import type { SliderInputProps } from './slider-group.types'

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function SliderInput({ className, ref, ...props }: SliderInputProps) {
  const group = useSliderGroupContext(),
    handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const raw = event.target.value,
        parsed = Number(raw)
      if (raw === '' || Number.isNaN(parsed) || !group) {
        return
      }
      group.setValue(withPrimaryValue(group.value, clamp(parsed, group.min, group.max)))
    }

  if (!group) {
    return undefined
  }

  return (
    <Input
      aria-label="Value"
      data-slot="slider-input"
      className={cn('w-[4rem]', className)}
      ref={ref}
      {...props}
      type="number"
      min={group.min}
      max={group.max}
      step={group.step}
      value={getPrimaryValue(group.value, group.min)}
      onChange={handleChange}
    />
  )
}
