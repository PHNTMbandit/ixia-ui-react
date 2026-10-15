import { Select as BaseSelect } from '@base-ui/react/select'
import { CheckIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import type { SelectItemProps } from './select.types'

export function SelectItem({ className, children, ref, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item
      className={cn(
        // oxlint-disable-next-line tailwindcss/no-unknown-classes
        'group/item grid min-h-lg cursor-default grid-cols-[1fr_0.75rem] items-center gap-xs rounded-lg px-2xs py-3xs transition-colors outline-none select-none group-data-[side=none]:pr-xs hover:cursor-pointer data-highlighted:relative data-highlighted:z-0 data-highlighted:bg-neutral-container-high data-highlighted:text-neutral-on-container data-highlighted:before:absolute data-highlighted:before:inset-x-3xs data-highlighted:before:inset-y-[0px] data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-selected:bg-neutral-default data-selected:text-neutral-on-default [&_svg]:size-sm',
        className,
      )}
      ref={ref}
      {...props}
    >
      <BaseSelect.ItemText className="flex flex-col">{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="place-self-end self-center">
        <CheckIcon weight="bold" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}
