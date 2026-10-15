import chroma from 'chroma-js'
import React from 'react'

import { cn } from '@/utils/cn'

import { colorPickerVariants, VALUE_TYPES } from './color-picker.types'
import type {
  ColorPickerAction,
  ColorPickerContextType,
  ColorPickerProps,
  ColorPickerState,
} from './color-picker.types'

const MIN_COLOR_CHANNEL = 0,
  FIRST_VALUE_TYPE_INDEX = 0,
  ColorPickerContext = React.createContext<ColorPickerContextType | undefined>(undefined),
  normalizeToColor = (value: string | chroma.Color, fallback: chroma.Color): chroma.Color => {
    try {
      if (typeof value === 'string') {
        return chroma(value.trim())
      }

      return chroma(value)
    } catch {
      return fallback
    }
  },
  getValidChannel = (channel: number | undefined, fallback: number): number => {
    if (channel === undefined || Number.isNaN(channel)) {
      return fallback
    }
    return channel
  },
  updateColorState = (
    { saturation: previousSaturation, ...state }: ColorPickerState,
    color: chroma.Color,
  ): ColorPickerState => {
    const [nextHue, nextSaturation, nextValue] = color.hsv()
    let saturation = previousSaturation
    if (nextValue !== MIN_COLOR_CHANNEL) {
      saturation = getValidChannel(nextSaturation, previousSaturation)
    }

    return {
      ...state,
      alpha: color.alpha(),
      hue: getValidChannel(nextHue, state.hue),
      saturation,
      value: nextValue,
    }
  },
  updateSimpleState = (state: ColorPickerState, action: ColorPickerAction): ColorPickerState => {
    switch (action.type) {
      case 'set_hue': {
        return { ...state, hue: action.hue }
      }
      case 'set_saturation': {
        return { ...state, saturation: action.saturation }
      }
      case 'set_value': {
        return { ...state, value: action.value }
      }
      case 'set_saturation_value': {
        return { ...state, saturation: action.saturation, value: action.value }
      }
      case 'set_alpha': {
        return { ...state, alpha: action.alpha }
      }
      case 'set_lightness': {
        return { ...state, value: action.lightness }
      }
      case 'set_value_type': {
        return { ...state, valueType: action.valueType }
      }
      default: {
        return state
      }
    }
  },
  colorPickerReducer = (state: ColorPickerState, action: ColorPickerAction): ColorPickerState => {
    switch (action.type) {
      case 'set_color': {
        return updateColorState(state, action.color)
      }
      case 'set_palette': {
        return { ...state, palette: action.palette }
      }
      case 'add_palette_color': {
        return { ...state, palette: [...state.palette, action.color] }
      }
      default: {
        return updateSimpleState(state, action)
      }
    }
  }

function ColorPicker({
  variant,
  value: controlledValue,
  defaultColor,
  palette: controlledPalette,
  defaultPalette,
  onPaletteChange,
  paletteLimit,
  defaultValueType,
  onValueChange,
  className,
  ref,
  ...props
}: ColorPickerProps) {
  const [state, dispatch] = React.useReducer(
      colorPickerReducer,
      { controlledPalette, controlledValue, defaultColor, defaultPalette, defaultValueType },
      ({
        controlledValue: initialControlledValue,
        controlledPalette: initialControlledPalette,
        defaultColor: initialDefaultColor,
        defaultPalette: initialDefaultPalette,
        defaultValueType: initialDefaultValueType,
      }): ColorPickerState => {
        const initialColor = normalizeToColor(
            initialControlledValue ?? initialDefaultColor ?? '#ffffff',
            chroma('#ffffff'),
          ),
          [initialHue, initialSaturation, initialValue] = initialColor.hsv()

        return {
          alpha: initialColor.alpha(),
          hue: getValidChannel(initialHue, MIN_COLOR_CHANNEL),
          palette: (initialControlledPalette ?? initialDefaultPalette ?? []).map((colorOption) =>
            chroma(colorOption),
          ),
          saturation: getValidChannel(initialSaturation, MIN_COLOR_CHANNEL),
          value: initialValue,
          valueType:
            VALUE_TYPES.find((typeOption) => typeOption.value === initialDefaultValueType) ??
            VALUE_TYPES[FIRST_VALUE_TYPE_INDEX],
        }
      },
    ),
    {
      hue: internalHue,
      saturation: internalSaturation,
      value: internalValue,
      alpha: internalAlpha,
      valueType,
      palette,
    } = state,
    color = chroma.hsv(internalHue, internalSaturation, internalValue).alpha(internalAlpha),
    hue = internalHue,
    saturation = internalSaturation,
    value = internalValue,
    alpha = internalAlpha,
    lastSyncedColorRef = React.useRef<string | undefined>(undefined),
    lastSyncedPaletteRef = React.useRef<string | undefined>(undefined),
    setColor = (nextColor: chroma.Color) => {
      dispatch({ color: nextColor, type: 'set_color' })
      onValueChange?.(nextColor.hex())
    },
    setHue = (nextHue: number) => {
      dispatch({ hue: nextHue, type: 'set_hue' })
      onValueChange?.(chroma.hsv(nextHue, saturation, value).alpha(alpha).hex())
    },
    setSaturation = (nextSaturation: number) => {
      dispatch({ saturation: nextSaturation, type: 'set_saturation' })
      onValueChange?.(chroma.hsv(hue, nextSaturation, value).alpha(alpha).hex())
    },
    setValue = (nextValue: number) => {
      dispatch({ type: 'set_value', value: nextValue })
      onValueChange?.(chroma.hsv(hue, saturation, nextValue).alpha(alpha).hex())
    },
    setSaturationValue = (nextSaturation: number, nextValue: number) => {
      dispatch({ saturation: nextSaturation, type: 'set_saturation_value', value: nextValue })
      onValueChange?.(chroma.hsv(hue, nextSaturation, nextValue).alpha(alpha).hex())
    },
    setAlpha = (nextAlpha: number) => setColor(color.alpha(nextAlpha)),
    setLightness = (nextLightness: number) => setColor(color.set('hsl.l', nextLightness)),
    setValueType = (nextValueType: ColorPickerState['valueType']) =>
      dispatch({ type: 'set_value_type', valueType: nextValueType }),
    setPalette = (nextPalette: chroma.Color[]) => {
      lastSyncedPaletteRef.current = nextPalette
        .map((paletteColor) => paletteColor.hex('rgba'))
        .join('|')
      dispatch({ palette: nextPalette, type: 'set_palette' })
      onPaletteChange?.(nextPalette.map((paletteColor) => paletteColor.hex()))
    },
    addPaletteColor = (nextColor: chroma.Color) => {
      if (paletteLimit && palette.length >= paletteLimit) {
        return
      }

      const nextPalette = [...palette, nextColor]
      lastSyncedPaletteRef.current = nextPalette
        .map((paletteColor) => paletteColor.hex('rgba'))
        .join('|')
      dispatch({ color: nextColor, type: 'add_palette_color' })
      onPaletteChange?.(nextPalette.map((paletteColor) => paletteColor.hex()))
    }

  React.useEffect(() => {
    if (controlledValue === undefined) {
      return
    }

    const nextColor = normalizeToColor(controlledValue, color),
      nextKey = nextColor.hex('rgba')

    if (nextKey === lastSyncedColorRef.current) {
      return
    }

    lastSyncedColorRef.current = nextKey

    if (nextKey !== color.hex('rgba')) {
      dispatch({ color: nextColor, type: 'set_color' })
    }
  }, [controlledValue, color])

  React.useEffect(() => {
    if (controlledPalette === undefined) {
      return
    }

    const parsedPalette = controlledPalette.map((colorOption) => chroma(colorOption)),
      nextKey = parsedPalette.map((paletteColor) => paletteColor.hex('rgba')).join('|')

    if (nextKey === lastSyncedPaletteRef.current) {
      return
    }

    lastSyncedPaletteRef.current = nextKey
    dispatch({ palette: parsedPalette, type: 'set_palette' })
  }, [controlledPalette])

  return (
    <ColorPickerContext.Provider
      value={{
        addPaletteColor,
        alpha,
        color,
        hue,
        palette,
        paletteLimit,
        saturation,
        setAlpha,
        setColor,
        setHue,
        setLightness,
        setPalette,
        setSaturation,
        setSaturationValue,
        setValue,
        setValueType,
        value,
        valueType,
      }}
    >
      <div className={cn(colorPickerVariants({ variant }), className)} ref={ref} {...props} />
    </ColorPickerContext.Provider>
  )
}

function useColorPicker() {
  const context = React.useContext(ColorPickerContext)

  if (!context) {
    throw new Error('useColorPicker must be used within a ColorPicker')
  }

  return context
}

export { ColorPicker, useColorPicker }
