import { cn } from '@/utils/cn'

import { ColorChannelSlider } from '../color-channel-slider'
import { getHueTrack } from '../color-channel-slider/color-channel-slider.utils'
import { useColorPicker } from './color-picker'
import type { ColorPickerHueSliderProps } from './color-picker.types'

const HUE_VALUE_INDEX = 0

export function ColorPickerHueSlider({ className, ref, ...props }: ColorPickerHueSliderProps) {
  const { hue, setHue } = useColorPicker(),
    handleChange = (value: number | readonly number[]) => {
      if (typeof value === 'number') {
        setHue(value)
        return
      }

      setHue(value[HUE_VALUE_INDEX])
    }

  return (
    <ColorChannelSlider
      aria-label="Hue"
      {...props}
      min={0}
      max={360}
      value={hue}
      onValueChange={handleChange}
      trackStyle={getHueTrack()}
      className={cn('', className)}
      ref={ref}
    />
  )
}
