import { Combobox as BaseCombobox } from '@base-ui/react/combobox'

import { cn } from '@/utils/cn'

import type { ComboboxGroupProps } from './combobox.types'

export function ComboboxGroup({ className, ref, ...props }: ComboboxGroupProps) {
  return <BaseCombobox.Group className={cn('block pb-3xs', className)} ref={ref} {...props} />
}
