import { cn } from '@/utils/cn'

import type { ColorPickerGroupProps } from './color-picker.types'

export function ColorPickerGroup({ className, ref, ...props }: ColorPickerGroupProps) {
  return <div className={cn('flex flex-col gap-sm', className)} ref={ref} {...props} />
}
