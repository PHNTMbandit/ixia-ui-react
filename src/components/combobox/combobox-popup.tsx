import { Combobox as BaseCombobox } from '@base-ui/react/combobox'

import { cn } from '@/utils/cn'

import type { ComboboxPopupProps } from './combobox.types'

export function ComboboxPopup({ className, children, ref, ...props }: ComboboxPopupProps) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner className={cn('', className)} ref={ref} sideOffset={20} {...props}>
        <BaseCombobox.Popup className="max-h-[23rem] w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) rounded-xl bg-surface-2 pl-2xs shadow-md transition-[transform,scale,opacity] duration-100 [--input-container-height:4rem] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}
