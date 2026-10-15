import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { CheckIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import type { ComboboxItemProps } from './combobox.types'

export function ComboboxItem({ className, children, ref, ...props }: ComboboxItemProps) {
  return (
    <BaseCombobox.Item
      className={cn(
        'mr-2xs grid cursor-default grid-cols-[1fr_0.75rem] items-center gap-xs rounded-md px-2xs py-3xs style-text-default-0 transition-colors duration-100 select-none group-data-[side=none]:pr-xs group-data-[side=none]:leading-lg first-of-type:mt-2xs last-of-type:mb-2xs hover:cursor-pointer data-highlighted:relative data-highlighted:z-0 data-highlighted:bg-neutral-container-high data-highlighted:text-neutral-on-container data-highlighted:before:absolute data-highlighted:before:inset-x-3xs data-highlighted:before:inset-y-[0px] data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-selected:bg-neutral-default data-selected:text-neutral-on-default pointer-coarse:py-xs',
        className,
      )}
      ref={ref}
      {...props}
    >
      <span className="col-start-1">{children}</span>
      <BaseCombobox.ItemIndicator className="col-start-2 place-self-end self-center">
        <CheckIcon className="size-sm" weight="bold" />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  )
}
