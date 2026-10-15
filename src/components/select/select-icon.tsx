import { Select as BaseSelect } from '@base-ui/react/select'

import { cn } from '@/utils/cn'

import type { SelectIconProps } from './select.types'

export function SelectIcon({ className, ref, ...props }: SelectIconProps) {
  return (
    <BaseSelect.Icon
      className={cn('flex text-on-surface-variant', className)}
      ref={ref}
      {...props}
    />
  )
}
