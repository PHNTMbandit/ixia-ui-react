import { Combobox as BaseCombobox } from '@base-ui/react/combobox'

import { cn } from '@/utils/cn'

import type { ComboboxChipsProps } from './combobox.types'

export function ComboboxChips({ className, ref, ...props }: ComboboxChipsProps) {
  return (
    <BaseCombobox.Chips
      data-chips
      className={cn('group flex flex-wrap items-center gap-2xs empty:hidden', className)}
      ref={ref}
      {...props}
    />
  )
}
