import { Menu as BaseMenu } from '@base-ui/react/menu'
import { CheckIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import type { MenuRadioItemProps } from './menu.types'

export function MenuRadioItem({ className, children, ref, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      className={cn(
        'relative z-0 grid h-lg cursor-default grid-cols-[1fr_2rem] items-center px-xs style-text-default-0 transition-colors outline-none select-none before:absolute before:inset-x-3xs before:inset-y-[0px] before:z-[-1] before:rounded-md before:bg-transparent before:transition-colors before:content-[""] hover:cursor-pointer data-highlighted:text-neutral-on-container data-highlighted:before:bg-neutral-container-high',
        className,
      )}
      ref={ref}
      {...props}
    >
      <span className="col-start-1 min-w-3xl">{children}</span>
      <BaseMenu.RadioItemIndicator className="col-start-2 flex items-center justify-center place-self-end self-center">
        <CheckIcon className="size-sm" weight="bold" />
      </BaseMenu.RadioItemIndicator>
    </BaseMenu.RadioItem>
  )
}
