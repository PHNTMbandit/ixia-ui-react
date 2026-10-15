import { cn } from '@/utils/cn'

import { useFieldContext } from '../form/form-contexts'
import { Slider } from '../slider'
import type { FieldSliderProps } from './field.types'

export function FieldSlider({ className, ref, ...props }: FieldSliderProps) {
  const field = useFieldContext<number | readonly number[]>()

  return (
    <Slider
      className={cn('', className)}
      onValueChange={(value) => field.setValue(value)}
      ref={ref}
      value={field.state.value}
      {...props}
    />
  )
}
