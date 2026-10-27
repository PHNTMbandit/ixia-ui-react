import { Select as BaseSelect } from '@base-ui/react/select'

import { cn } from '@/utils/cn'

import type { SelectIconProps } from './select.types'

export function SelectIcon({ className, ref, ...props }: SelectIconProps) {
  return (
    <BaseSelect.Icon
      data-slot="select-icon"
      className={cn('flex text-on-surface-muted', className)}
      ref={ref}
      {...props}
    />
  )
}
