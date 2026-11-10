import { Menu as BaseMenu } from '@base-ui/react/menu'

import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import { menuItemBaseClasses, menuItemHighlightClasses } from './menu-tone'
import type { MenuRadioItemProps } from './menu.types'

export function MenuRadioItem({ className, children, ref, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      className={cn(
        'grid grid-cols-[1fr_0.75rem]',
        menuItemBaseClasses,
        menuItemHighlightClasses,
        className,
      )}
      ref={ref}
      {...props}
    >
      <span className="col-start-1 min-w-3xl text-box-trim">{children}</span>
      <BaseMenu.RadioItemIndicator className="col-start-2 flex items-center justify-center place-self-end self-center [&>svg]:size-sm!">
        <Icon name="selected" className="size-sm" />
      </BaseMenu.RadioItemIndicator>
    </BaseMenu.RadioItem>
  )
}
