import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'

import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import { menuItemBaseClasses, menuItemHighlightClasses } from '../menu/menu-tone'
import type { ContextMenuCheckboxItemProps } from './context-menu.types'

export function ContextMenuCheckboxItem({
  className,
  children,
  ref,
  ...props
}: ContextMenuCheckboxItemProps) {
  return (
    <BaseContextMenu.CheckboxItem
      className={cn(
        'grid grid-cols-[1fr_0.75rem]',
        menuItemBaseClasses,
        menuItemHighlightClasses,
        className,
      )}
      ref={ref}
      {...props}
    >
      <span className="col-start-1">{children}</span>
      <BaseContextMenu.CheckboxItemIndicator className="col-start-2 flex items-center justify-center place-self-end self-center [&>svg]:size-sm!">
        <Icon name="selected" className="size-sm" />
      </BaseContextMenu.CheckboxItemIndicator>
    </BaseContextMenu.CheckboxItem>
  )
}
