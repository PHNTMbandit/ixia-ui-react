import { Combobox as BaseCombobox } from '@base-ui/react/combobox'

import { cn } from '@/utils/cn'

import type { ComboboxListProps } from './combobox.types'

export function ComboboxList({ className, ref, ...props }: ComboboxListProps) {
  return (
    <BaseCombobox.List
      className={cn(
        'max-h-[min(calc(23rem-var(--input-container-height,0rem)),calc(var(--available-height)-var(--input-container-height,0rem)))] scroll-py-[0.5rem] space-y-3xs overflow-y-auto overscroll-contain data-empty:p-[0px]',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
