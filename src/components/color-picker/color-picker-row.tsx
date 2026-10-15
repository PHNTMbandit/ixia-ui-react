import { cn } from '@/utils/cn'

import type { ColorPickerRowProps } from './color-picker.types'

export function ColorPickerRow({ className, ref, ...props }: ColorPickerRowProps) {
  return (
    <div
      className={cn('flex items-center justify-between gap-xs', className)}
      ref={ref}
      {...props}
    />
  )
}
