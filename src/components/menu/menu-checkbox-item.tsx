import { Menu as BaseMenu } from '@base-ui/react/menu'

import { cn } from '@/utils/cn'
import { trimTextChildren } from '@/utils/trim-text-children'

import { Icon } from '../icon'
import { menuItemBaseClasses, menuItemHighlightClasses } from './menu-tone'
import type { MenuCheckboxItemProps } from './menu.types'

export function MenuCheckboxItem({ className, children, ref, ...props }: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      className={cn(
        'grid grid-cols-[1fr_0.75rem]',
        menuItemBaseClasses,
        menuItemHighlightClasses,
        className,
      )}
      ref={ref}
      {...props}
    >
      <span className="col-start-1 flex items-center gap-2xs">{trimTextChildren(children)}</span>
      <BaseMenu.CheckboxItemIndicator className="col-start-2 flex items-center justify-center place-self-end self-center [&>svg]:size-sm!">
        <Icon name="selected" className="size-sm" />
      </BaseMenu.CheckboxItemIndicator>
    </BaseMenu.CheckboxItem>
  )
}
