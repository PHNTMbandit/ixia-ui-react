import { cn } from '@/utils/cn'

import { ColorChannelSlider } from '../color-channel-slider'
import { getLightnessTrack } from '../color-channel-slider/color-channel-slider.utils'
import { useColorPicker } from './color-picker'
import type { ColorPickerLightnessSliderProps } from './color-picker.types'

const MIN_LIGHTNESS = 0,
  MAX_LIGHTNESS = 100,
  LIGHTNESS_SCALE = 100,
  FIRST_VALUE_INDEX = 0

function getSliderValue(value: number | readonly number[]): number {
  if (typeof value === 'number') {
    return value
  }
  return value[FIRST_VALUE_INDEX]
}

export function ColorPickerLightnessSlider({
  className,
  ref,
  ...props
}: ColorPickerLightnessSliderProps) {
  const { color, setColor } = useColorPicker(),
    hslLightness = color.get('hsl.l'),
    lightness = hslLightness || MIN_LIGHTNESS,
    handleChange = (value: number | readonly number[]) => {
      setColor(color.set('hsl.l', getSliderValue(value) / LIGHTNESS_SCALE))
    }

  return (
    <ColorChannelSlider
      aria-label="Lightness"
      {...props}
      min={MIN_LIGHTNESS}
      max={MAX_LIGHTNESS}
      value={lightness * LIGHTNESS_SCALE}
      onValueChange={handleChange}
      trackStyle={getLightnessTrack(color.hex())}
      className={cn('', className)}
      ref={ref}
    />
  )
}
