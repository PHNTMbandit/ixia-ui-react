import { Slider as BaseSlider } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { SliderThumb } from './slider-thumb'
import { sliderVariants } from './slider.types'
import type { SliderProps } from './slider.types'

const MIN_DEFAULT = 0,
  MAX_DEFAULT = 100,
  STEP_DEFAULT = 1

function resolveThumbValues(
  value: SliderProps['value'],
  defaultValue: SliderProps['defaultValue'],
  min: number,
): number[] {
  if (typeof value === 'number') {
    return [value]
  }
  if (Array.isArray(value)) {
    return [...value]
  }
  if (typeof defaultValue === 'number') {
    return [defaultValue]
  }
  if (Array.isArray(defaultValue)) {
    return [...defaultValue]
  }
  return [min]
}

export function Slider({
  size,
  tone,
  defaultValue,
  min = MIN_DEFAULT,
  max = MAX_DEFAULT,
  step = STEP_DEFAULT,
  showIndicator = true,
  showTooltip = true,
  showThumbOnHover = true,
  value,
  onValueChange,
  className,
  'aria-label': ariaLabel = 'Slider',
  ref,
  ...props
}: SliderProps) {
  const thumbValues = resolveThumbValues(value, defaultValue, min)

  return (
    <BaseSlider.Root
      className={cn(sliderVariants({ size, tone }), className)}
      defaultValue={defaultValue}
      data-slot="slider-root"
      max={max}
      min={min}
      onValueChange={onValueChange}
      ref={ref}
      step={step}
      value={value}
      {...props}
    >
      <BaseSlider.Control className="shrink-0 hover:cursor-pointer data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full">
        <BaseSlider.Track
          data-slot="slider-track"
          className={cn(
            'relative size-full rounded-full',
            !showThumbOnHover &&
              "**:data-[slot='slider-thumb']:opacity-0 hover:**:data-[slot='slider-thumb']:opacity-100 active:**:data-[slot='slider-thumb']:opacity-100 data-dragging:**:data-[slot='slider-thumb']:opacity-100",
          )}
        >
          <BaseSlider.Indicator
            data-slot="slider-indicator"
            className={cn('rounded-full', !showIndicator && 'opacity-0')}
          />
          {[...thumbValues.keys()].map((index) => (
            <SliderThumb aria-label={ariaLabel} index={index} key={index} hide={!showTooltip} />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}
