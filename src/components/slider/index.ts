import { Slider as SliderRoot } from './slider'
import { SliderThumb } from './slider-thumb'

const Slider = Object.assign(SliderRoot, {
  Thumb: SliderThumb,
})

export type { SliderProps, SliderThumbProps } from './slider.types'
export { SliderThumb } from './slider-thumb'

export { Slider }
