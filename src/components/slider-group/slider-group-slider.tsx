import React from 'react'

import { Slider } from '../slider'
import { useSliderGroupContext, useStableNumberArray } from './slider-group-context'
import type { SliderGroupContextValue, SliderGroupSliderProps } from './slider-group.types'

const MIN_DEFAULT = 0,
  MAX_DEFAULT = 100,
  STEP_DEFAULT = 1

function toSingleNumber(input: number | readonly number[] | undefined): number | undefined {
  if (typeof input === 'number') {
    return input
  }
  return undefined
}

function toNumberArray(next: number | readonly number[]): number[] {
  if (typeof next === 'number') {
    return [next]
  }
  return [...next]
}

function resolveInitialValue(
  defaultValue: SliderGroupSliderProps['defaultValue'],
  value: SliderGroupSliderProps['value'],
  min: number,
): number[] {
  if (Array.isArray(defaultValue)) {
    return [...defaultValue]
  }
  return [toSingleNumber(value) ?? toSingleNumber(defaultValue) ?? min]
}

function getGroupValue(
  group: SliderGroupContextValue | undefined,
  fallback: number[],
): number[] | undefined {
  if (!group) {
    return undefined
  }
  return group.value ?? fallback
}

// The group-bound Slider: it reads/writes the shared value from SliderGroup and
// Publishes its min/max/step so siblings (SliderInput, SliderValue) stay in sync.
export function SliderGroupSlider({
  min = MIN_DEFAULT,
  max = MAX_DEFAULT,
  step = STEP_DEFAULT,
  defaultValue,
  value,
  onValueChange,
  ...props
}: SliderGroupSliderProps) {
  const group = useSliderGroupContext(),
    groupValue = useStableNumberArray(
      getGroupValue(group, resolveInitialValue(defaultValue, value, min)),
    ),
    handleValueChange = (
      ...args: Parameters<NonNullable<SliderGroupSliderProps['onValueChange']>>
    ) => {
      const [next] = args
      group?.setValue(toNumberArray(next))
      onValueChange?.(...args)
    }

  React.useEffect(() => {
    group?.registerConfig({ defaultValue, max, min, step })
  }, [group, min, max, step, defaultValue])

  return (
    <Slider
      min={min}
      max={max}
      step={step}
      value={groupValue}
      onValueChange={handleValueChange}
      {...props}
    />
  )
}
