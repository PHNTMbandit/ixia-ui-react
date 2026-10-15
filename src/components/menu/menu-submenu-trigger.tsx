import { Menu as BaseMenu } from '@base-ui/react/menu'
import { CaretRightIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { menuSubmenuTriggerVariants } from './menu.types'
import type { MenuSubmenuTriggerProps } from './menu.types'

export function MenuSubmenuTrigger({
  tone,
  className,
  children,
  ref,
  ...props
}: MenuSubmenuTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      className={cn(menuSubmenuTriggerVariants({ tone }), className)}
      ref={ref}
      {...props}
    >
      <div className="col-start-1 flex min-w-3xl items-center gap-2xs pr-2xl [&>svg]:size-sm">
        {children}
      </div>
      <CaretRightIcon className="col-start-2 size-xs place-self-end self-center" weight="bold" />
    </BaseMenu.SubmenuTrigger>
  )
}
