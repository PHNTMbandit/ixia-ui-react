import { Menu as BaseMenu } from '@base-ui/react/menu'
import { CheckIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import type { MenuCheckboxItemProps } from './menu.types'

export function MenuCheckboxItem({ className, children, ref, ...props }: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      className={cn(
        'relative z-0 grid h-lg cursor-default grid-cols-[1fr_2rem] items-center px-xs style-text-default-0 transition-colors outline-none select-none before:absolute before:inset-x-3xs before:inset-y-[0px] before:z-[-1] before:rounded-md before:bg-transparent before:transition-colors before:content-[""] hover:cursor-pointer data-highlighted:text-neutral-on-container data-highlighted:before:bg-neutral-container-high',
        className,
      )}
      ref={ref}
      {...props}
    >
      <span className="col-start-1 flex items-center gap-2xs">{children}</span>
      <BaseMenu.CheckboxItemIndicator className="col-start-2 flex items-center justify-center place-self-end self-center">
        <CheckIcon className="size-sm" weight="bold" />
      </BaseMenu.CheckboxItemIndicator>
    </BaseMenu.CheckboxItem>
  )
}
