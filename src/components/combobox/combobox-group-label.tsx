import { Combobox as BaseCombobox } from '@base-ui/react/combobox'

import { cn } from '@/utils/cn'

import type { ComboboxGroupLabelProps } from './combobox.types'

export function ComboboxGroupLabel({ className, ref, ...props }: ComboboxGroupLabelProps) {
  return (
    <BaseCombobox.GroupLabel
      className={cn(
        'sticky top-[0px] z-1 my-[0px] mr-[0px] -ml-2xs bg-surface-2 px-sm pt-2xs pb-3xs style-text-strong--2 text-on-surface-variant',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
