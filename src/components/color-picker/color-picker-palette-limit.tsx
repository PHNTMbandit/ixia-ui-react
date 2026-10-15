import { cn } from '@/utils/cn'

import { useColorPicker } from './color-picker'
import type { ColorPickerPaletteLimitProps } from './color-picker.types'

export function ColorPickerPaletteLimit({
  className,
  children,
  ref,
  ...props
}: ColorPickerPaletteLimitProps) {
  const { palette, paletteLimit } = useColorPicker(),
    isAtLimit = paletteLimit && palette.length >= paletteLimit

  return (
    Boolean(paletteLimit) && (
      <span
        className={cn(
          'style-text-prose--2 text-on-surface-variant',
          isAtLimit && 'text-error-default',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
        {palette.length} / {paletteLimit}
      </span>
    )
  )
}
