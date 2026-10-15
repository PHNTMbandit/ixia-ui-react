import { cn } from '@/utils/cn'

import { useColorPicker } from './color-picker'
import { ColorPickerPaletteSwatch } from './color-picker-palette-swatch'
import type { ColorPickerPaletteListProps } from './color-picker.types'

const DEFAULT_OCCURRENCE = 0,
  OCCURRENCE_INCREMENT = 1

export function ColorPickerPaletteList({
  className,
  children,
  ref,
  ...props
}: ColorPickerPaletteListProps) {
  const { palette } = useColorPicker(),
    occurrences = new Map<string, number>()

  return (
    <div
      className={cn('flex flex-wrap items-center justify-start gap-2xs', className)}
      ref={ref}
      {...props}
    >
      {palette.map((color) => {
        const value = color.hex('rgba'),
          occurrence = occurrences.get(value) ?? DEFAULT_OCCURRENCE
        occurrences.set(value, occurrence + OCCURRENCE_INCREMENT)

        return (
          <ColorPickerPaletteSwatch
            key={`${value}-${occurrence}`}
            color={color.css()}
            size="medium"
          />
        )
      })}
      {children}
    </div>
  )
}
