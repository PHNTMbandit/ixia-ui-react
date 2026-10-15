import { cn } from '@/utils/cn'

import { ColorChannelSlider } from '../color-channel-slider'
import { getTransparencyTrack } from '../color-channel-slider/color-channel-slider.utils'
import { useColorPicker } from './color-picker'
import type { ColorPickerTransparencySliderProps } from './color-picker.types'

const FIRST_VALUE_INDEX = 0,
  ALPHA_PERCENTAGE_SCALE = 100

function getSliderValue(value: number | readonly number[]): number {
  if (typeof value === 'number') {
    return value
  }
  return value[FIRST_VALUE_INDEX]
}

export function ColorPickerTransparencySlider({
  className,
  ref,
  ...props
}: ColorPickerTransparencySliderProps) {
  const { color, setColor } = useColorPicker(),
    alpha = color.alpha(),
    handleChange = (value: number | readonly number[]) => {
      const nextAlpha = getSliderValue(value)
      setColor(color.alpha(nextAlpha / ALPHA_PERCENTAGE_SCALE))
    }

  return (
    <ColorChannelSlider
      aria-label="Transparency"
      {...props}
      min={0}
      max={ALPHA_PERCENTAGE_SCALE}
      value={alpha * ALPHA_PERCENTAGE_SCALE}
      onValueChange={handleChange}
      trackStyle={getTransparencyTrack(color.hex())}
      className={cn('', className)}
      ref={ref}
    />
  )
}
