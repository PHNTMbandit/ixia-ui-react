import { Combobox as BaseCombobox } from '@base-ui/react/combobox'

import { cn } from '@/utils/cn'

import type { ComboboxStatusProps } from './combobox.types'

export function ComboboxStatus({ className, ref, ...props }: ComboboxStatusProps) {
  return (
    <BaseCombobox.Status
      className={cn(
        'flex items-center gap-2xs p-xs style-text-prose--1 text-on-surface-variant empty:hidden',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
