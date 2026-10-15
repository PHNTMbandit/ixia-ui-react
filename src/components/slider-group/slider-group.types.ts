import type { Input } from '../input'
import type { SliderProps } from '../slider'

type SliderGroupProps = Omit<React.ComponentProps<'div'>, 'defaultValue' | 'onChange'> & {
  defaultValue?: number | number[]
  value?: number | number[]
  onValueChange?: (value: number[]) => void
}
interface SliderGroupConfig {
  min: number
  max: number
  step: number
  defaultValue?: number | readonly number[]
}
interface SliderGroupContextValue {
  value: number[] | undefined
  setValue: (value: number[]) => void
  min: number
  max: number
  step: number
  // Lets the group-bound Slider publish its min/max/step (and seed the initial value) to the group.
  registerConfig: (config: SliderGroupConfig) => void
}
type SliderGroupSliderProps = SliderProps
type SliderDescriptionProps = React.ComponentProps<'p'>
type SliderIconProps = React.ComponentProps<'div'>
type SliderInputProps = Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange' | 'type'>
type SliderLabelProps = React.ComponentProps<'span'>
type SliderValueProps = React.ComponentProps<'span'>

export type {
  SliderGroupProps,
  SliderGroupConfig,
  SliderGroupContextValue,
  SliderGroupSliderProps,
  SliderDescriptionProps,
  SliderIconProps,
  SliderInputProps,
  SliderLabelProps,
  SliderValueProps,
}
