import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import { useColorPicker } from './color-picker'
import type { ColorPickerPaletteAddProps } from './color-picker.types'

export function ColorPickerPaletteAdd({
  className,
  children,
  ref,
  ...props
}: ColorPickerPaletteAddProps) {
  const { color, addPaletteColor } = useColorPicker(),
    handleClick = () => {
      addPaletteColor(color)
    }

  return (
    <button
      type="button"
      aria-label="Add current color to palette"
      onClick={handleClick}
      className={cn(
        'flex size-md min-target items-center justify-center rounded-lg border border-on-surface-variant text-on-surface-variant hover:cursor-pointer [&>svg]:size-xs',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children ?? <Icon name="add" />}
    </button>
  )
}
