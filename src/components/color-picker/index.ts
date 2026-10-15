import { ColorPicker as ColorPickerRoot } from './color-picker'
import { ColorPickerArea } from './color-picker-area'
import { ColorPickerGroup } from './color-picker-group'
import { ColorPickerHueSlider } from './color-picker-hue-slider'
import { ColorPickerInput } from './color-picker-input'
import { ColorPickerLabel } from './color-picker-label'
import { ColorPickerLightnessSlider } from './color-picker-lightness-slider'
import { ColorPickerPaletteAdd } from './color-picker-palette-add'
import { ColorPickerPaletteLimit } from './color-picker-palette-limit'
import { ColorPickerPaletteList } from './color-picker-palette-list'
import { ColorPickerPaletteSwatch } from './color-picker-palette-swatch'
import { ColorPickerRow } from './color-picker-row'
import { ColorPickerTransparencySlider } from './color-picker-transparency-slider'
import { ColorPickerValueType } from './color-picker-value-type'

const ColorPicker = Object.assign(ColorPickerRoot, {
  Area: ColorPickerArea,
  Group: ColorPickerGroup,
  HueSlider: ColorPickerHueSlider,
  Input: ColorPickerInput,
  Label: ColorPickerLabel,
  LightnessSlider: ColorPickerLightnessSlider,
  PaletteAdd: ColorPickerPaletteAdd,
  PaletteLimit: ColorPickerPaletteLimit,
  PaletteList: ColorPickerPaletteList,
  PaletteSwatch: ColorPickerPaletteSwatch,
  Row: ColorPickerRow,
  TransparencySlider: ColorPickerTransparencySlider,
  ValueType: ColorPickerValueType,
})

export { ColorPickerArea } from './color-picker-area'
export { ColorPickerGroup } from './color-picker-group'
export { ColorPickerHueSlider } from './color-picker-hue-slider'
export { ColorPickerInput } from './color-picker-input'
export { ColorPickerLabel } from './color-picker-label'
export { ColorPickerPaletteLimit } from './color-picker-palette-limit'
export { ColorPickerPaletteList } from './color-picker-palette-list'
export { ColorPickerPaletteSwatch } from './color-picker-palette-swatch'
export { ColorPickerRow } from './color-picker-row'
export { ColorPickerTransparencySlider } from './color-picker-transparency-slider'
export { ColorPickerValueType } from './color-picker-value-type'
export { ColorPickerLightnessSlider } from './color-picker-lightness-slider'

export type {
  ColorPickerProps,
  ColorPickerPaletteAddProps,
  ColorPickerState,
  ColorPickerAction,
  ColorPickerAreaProps,
  ColorPickerContextType,
  ColorPickerGroupProps,
  ColorPickerHueSliderProps,
  ColorPickerInputProps,
  ColorPickerLabelProps,
  ColorPickerPaletteLimitProps,
  ColorPickerPaletteListProps,
  ColorPickerPaletteSwatchProps,
  ColorPickerRowProps,
  ColorPickerTransparencySliderProps,
  ColorPickerValueTypeProps,
  ColorPickerLightnessSliderProps,
} from './color-picker.types'

export { ColorPicker }
