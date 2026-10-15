import chroma from 'chroma-js'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import type { ColorChannelSlider } from '../color-channel-slider'
import type { InputGroup } from '../input-group'
import type { SelectTrigger } from '../select'

interface ColorPickerContextType {
  color: chroma.Color
  setColor: (color: chroma.Color) => void
  hue: number
  saturation: number
  value: number
  alpha: number
  setHue: (hue: number) => void
  setSaturation: (saturation: number) => void
  setValue: (value: number) => void
  setSaturationValue: (saturation: number, value: number) => void
  setAlpha: (alpha: number) => void
  setLightness: (lightness: number) => void
  valueType: ValueType
  setValueType: (valueType: ValueType) => void
  palette: chroma.Color[]
  setPalette: (palette: chroma.Color[]) => void
  addPaletteColor: (color: chroma.Color) => void
  paletteLimit?: number
}

interface ColorPickerState {
  hue: number
  saturation: number
  value: number
  alpha: number
  valueType: ValueType
  palette: chroma.Color[]
}

type ColorPickerAction =
  | { type: 'set_color'; color: chroma.Color }
  | { type: 'set_hue'; hue: number }
  | { type: 'set_saturation'; saturation: number }
  | { type: 'set_value'; value: number }
  | { type: 'set_saturation_value'; saturation: number; value: number }
  | { type: 'set_alpha'; alpha: number }
  | { type: 'set_lightness'; lightness: number }
  | { type: 'set_value_type'; valueType: ValueType }
  | { type: 'set_palette'; palette: chroma.Color[] }
  | { type: 'add_palette_color'; color: chroma.Color }

type ColorPickerProps = React.ComponentProps<'div'> &
  VariantProps<typeof colorPickerVariants> & {
    value?: string
    onValueChange?: (color: string) => void
    defaultColor?: string
    palette?: string[]
    defaultPalette?: string[]
    onPaletteChange?: (palette: string[]) => void
    paletteLimit?: number
    defaultValueType?: ValueTypeValue
  }

const colorPickerVariants = cva('flex flex-col space-y-sm', {
    defaultVariants: {
      variant: 'elevated',
    },
    variants: {
      variant: {
        elevated: 'rounded-xl bg-surface p-md shadow-2xs',
        ghost: '',
        outline: 'rounded-xl border border-border p-md',
      },
    },
  }),
  colorPickerSwatchVariants = cva(
    'overflow-hidden border border-border hover:cursor-pointer focus:outline-2 focus:outline-offset-2',
    {
      defaultVariants: {
        size: 'medium',
      },
      variants: {
        size: {
          large: 'size-lg rounded-xl',
          medium: 'size-md rounded-lg',
          small: 'size-sm rounded-md',
        },
      },
    },
  ),
  RGB_CHANNEL_COUNT = 3,
  DECIMAL_RADIX = 10,
  VALUE_TYPES: ValueType[] = [
    {
      getValue: (color: chroma.Color) => color.rgb(),
      label: 'RGB',
      parseValue: (value: string) => {
        const rgbChannels = value
          .split(',')
          .map((channelText) => parseInt(channelText.trim(), DECIMAL_RADIX))
        if (
          rgbChannels.length === RGB_CHANNEL_COUNT &&
          rgbChannels.every((channel) => !Number.isNaN(channel))
        ) {
          const [red, green, blue] = rgbChannels
          return chroma.rgb(red, green, blue)
        }
        return undefined
      },
      value: 'rgb',
    },
    {
      getValue: (color: chroma.Color) => color.css(),
      label: 'CSS',
      parseValue: (value: string) => {
        try {
          return chroma(value)
        } catch {
          return undefined
        }
      },
      value: 'css',
    },
    {
      getValue: (color: chroma.Color) => color.hex('rgb'),
      label: 'HEX',
      parseValue: (value: string) => {
        try {
          return chroma(value)
        } catch {
          return undefined
        }
      },
      value: 'hex',
    },
    {
      getValue: (color: chroma.Color) => color.hsl(),
      label: 'HSL',
      parseValue: (value: string) => {
        try {
          return chroma(value)
        } catch {
          return undefined
        }
      },
      value: 'hsl',
    },
    {
      getValue: (color: chroma.Color) => color.hsv(),
      label: 'HSV',
      parseValue: (value: string) => {
        try {
          return chroma(value)
        } catch {
          return undefined
        }
      },
      value: 'hsv',
    },
  ]
interface ValueType {
  label: string
  value: string
  getValue: (color: chroma.Color) => string | number[]
  parseValue: (value: string) => chroma.Color | undefined
}

type ValueTypeValue = 'rgb' | 'css' | 'hex' | 'hsl' | 'hsv'

type ColorPickerInputProps = React.ComponentProps<typeof InputGroup> & {
  showPopover?: boolean
  showTransparencyField?: boolean
}
type ColorPickerAreaProps = React.ComponentProps<'div'>
type ColorPickerHueSliderProps = Partial<React.ComponentProps<typeof ColorChannelSlider>>
type ColorPickerLightnessSliderProps = Partial<React.ComponentProps<typeof ColorChannelSlider>>
type ColorPickerTransparencySliderProps = Partial<React.ComponentProps<typeof ColorChannelSlider>>
type ColorPickerValueTypeProps = React.ComponentProps<typeof SelectTrigger>
type ColorPickerRowProps = React.ComponentProps<'div'>
type ColorPickerGroupProps = React.ComponentProps<'div'>
type ColorPickerLabelProps = React.ComponentProps<'span'>
type ColorPickerPaletteListChild = (props: { color: string; index: number }) => React.ReactNode

type ColorPickerPaletteListProps = React.ComponentProps<'div'>
type ColorPickerPaletteSwatchProps = Omit<React.ComponentProps<'button'>, 'color'> &
  VariantProps<typeof colorPickerSwatchVariants> & {
    color: string
  }
type ColorPickerPaletteAddProps = React.ComponentProps<'button'>
type ColorPickerPaletteLimitProps = React.ComponentProps<'span'>

export type {
  ColorPickerContextType,
  ColorPickerState,
  ColorPickerAction,
  ColorPickerProps,
  ValueType,
  ValueTypeValue,
  ColorPickerInputProps,
  ColorPickerAreaProps,
  ColorPickerHueSliderProps,
  ColorPickerLightnessSliderProps,
  ColorPickerTransparencySliderProps,
  ColorPickerValueTypeProps,
  ColorPickerRowProps,
  ColorPickerGroupProps,
  ColorPickerLabelProps,
  ColorPickerPaletteListChild,
  ColorPickerPaletteListProps,
  ColorPickerPaletteSwatchProps,
  ColorPickerPaletteAddProps,
  ColorPickerPaletteLimitProps,
}
export { colorPickerVariants, colorPickerSwatchVariants, VALUE_TYPES }
