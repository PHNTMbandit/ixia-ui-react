import { PlusIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

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
        'flex size-md items-center justify-center rounded-lg border border-border-strong text-border-strong hover:cursor-pointer [&>svg]:size-xs',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <PlusIcon weight="bold" />
    </button>
  )
}
