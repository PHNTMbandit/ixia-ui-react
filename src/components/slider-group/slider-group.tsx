import React from 'react'

import { cn } from '@/utils/cn'

import { SliderGroupContext, useStableNumberArray } from './slider-group-context'
import type { SliderGroupProps, SliderGroupConfig } from './slider-group.types'

const MIN_DEFAULT = 0,
  MAX_DEFAULT = 100,
  STEP_DEFAULT = 1

function toArray(value: number | readonly number[] | undefined): number[] | undefined {
  if (value === undefined) {
    return undefined
  }
  if (typeof value === 'number') {
    return [value]
  }
  return [...value]
}

function getControlledValue(
  isControlled: boolean,
  valueProp: SliderGroupProps['value'],
  internalValue: number[] | undefined,
): number[] | undefined {
  if (isControlled) {
    return toArray(valueProp)
  }
  return internalValue
}

function mergeConfig(
  prev: { min: number; max: number; step: number },
  incoming: SliderGroupConfig,
) {
  if (prev.min === incoming.min && prev.max === incoming.max && prev.step === incoming.step) {
    return prev
  }
  return { max: incoming.max, min: incoming.min, step: incoming.step }
}

export function SliderGroup({
  className,
  ref,
  defaultValue,
  value: valueProp,
  onValueChange,
  ...props
}: SliderGroupProps) {
  const isControlled = valueProp !== undefined,
    [internalValue, setInternalValue] = React.useState<number[] | undefined>(() =>
      toArray(defaultValue),
    ),
    [config, setConfig] = React.useState({
      max: MAX_DEFAULT,
      min: MIN_DEFAULT,
      step: STEP_DEFAULT,
    }),
    value = useStableNumberArray(getControlledValue(isControlled, valueProp, internalValue)),
    setValue = (next: number[]) => {
      if (!isControlled) {
        setInternalValue(next)
      }
      onValueChange?.(next)
    },
    registerConfig = (incoming: SliderGroupConfig) => {
      setConfig((prev) => mergeConfig(prev, incoming))
      if (incoming.defaultValue !== undefined) {
        setInternalValue((prev) => prev ?? toArray(incoming.defaultValue))
      }
    },
    context = {
      max: config.max,
      min: config.min,
      registerConfig,
      setValue,
      step: config.step,
      value,
    }

  return (
    <SliderGroupContext.Provider value={context}>
      <div
        data-slot="slider-group"
        className={cn(
          'flex w-full flex-wrap items-center gap-x-sm',
          '**:data-[slot=slider-label]:basis-full',
          '**:data-[slot=slider-root]:flex-1',
          '**:data-[slot=slider-description]:basis-full',
          className,
        )}
        ref={ref}
        {...props}
      />
    </SliderGroupContext.Provider>
  )
}
