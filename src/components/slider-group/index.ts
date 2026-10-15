import { SliderDescription } from './slider-description'
import { SliderGroup as SliderGroupRoot } from './slider-group'
import { SliderGroupSlider } from './slider-group-slider'
import { SliderIcon } from './slider-icon'
import { SliderInput } from './slider-input'
import { SliderLabel } from './slider-label'
import { SliderValue } from './slider-value'

const SliderGroup = Object.assign(SliderGroupRoot, {
  Description: SliderDescription,
  Icon: SliderIcon,
  Input: SliderInput,
  Label: SliderLabel,
  Slider: SliderGroupSlider,
  Value: SliderValue,
})

export { SliderGroupSlider } from './slider-group-slider'
export { SliderInput } from './slider-input'
export { SliderValue } from './slider-value'
export { SliderLabel } from './slider-label'
export { SliderDescription } from './slider-description'
export { SliderIcon } from './slider-icon'
export { useSliderGroupContext } from './slider-group-context'
export type {
  SliderGroupProps,
  SliderGroupSliderProps,
  SliderInputProps,
  SliderValueProps,
  SliderLabelProps,
  SliderDescriptionProps,
  SliderIconProps,
} from './slider-group.types'

export { SliderGroup }
