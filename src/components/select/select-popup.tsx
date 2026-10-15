import { Select as BaseSelect } from '@base-ui/react/select'
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import type { SelectPopupProps } from './select.types'

export function SelectPopup({ className, children, ref, ...props }: SelectPopupProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        className={cn('z-9999 outline-none select-none', className)}
        ref={ref}
        {...props}
      >
        <BaseSelect.Popup className="group min-w-(--anchor-width) origin-(--transform-origin) rounded-xl bg-surface-2 bg-clip-padding p-2xs shadow-md transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 data-[side=none]:data-ending-style:scale-90 data-[side=none]:data-ending-style:opacity-0 data-[side=none]:data-starting-style:scale-90 data-[side=none]:data-starting-style:opacity-0">
          <BaseSelect.ScrollUpArrow className="top-0 right-0 z-[1px] flex h-md w-full cursor-default items-center justify-center rounded-xl bg-surface-2 before:absolute before:left-0 before:size-full before:content-[''] data-[side=none]:before:-top-full">
            <CaretUpIcon className="size-sm" weight="fill" />
          </BaseSelect.ScrollUpArrow>
          {children}
          <BaseSelect.ScrollDownArrow className="right-0 bottom-0 z-[1px] flex h-md w-full cursor-default items-center justify-center rounded-xl bg-surface-2 before:absolute before:left-0 before:size-full before:content-[''] data-[side=none]:before:-bottom-full">
            <CaretDownIcon className="size-sm" weight="fill" />
          </BaseSelect.ScrollDownArrow>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}
