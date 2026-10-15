import chroma from 'chroma-js'

import { cn } from '@/utils/cn'

import { useColorPicker } from './color-picker'
import { colorPickerSwatchVariants } from './color-picker.types'
import type { ColorPickerPaletteSwatchProps } from './color-picker.types'

export function ColorPickerPaletteSwatch({
  size,
  color,
  className,
  children,
  ref,
  ...props
}: ColorPickerPaletteSwatchProps) {
  const { setColor } = useColorPicker(),
    handleClick = () => {
      setColor(chroma(color))
    }

  return (
    <button
      type="button"
      aria-label={`Select color ${color}`}
      onClick={handleClick}
      className={cn(colorPickerSwatchVariants({ size }), className)}
      ref={ref}
      style={{
        color,
      }}
      {...props}
    >
      {children}
      <div className="size-full" style={{ backgroundColor: color }} />
    </button>
  )
}
