import { Combobox as BaseCombobox } from '@base-ui/react/combobox'

import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import { menuItemBaseClasses, menuItemHighlightClasses } from '../menu/menu-tone'
import type { ComboboxItemProps } from './combobox.types'

export function ComboboxItem({ className, children, ref, ...props }: ComboboxItemProps) {
  return (
    <BaseCombobox.Item
      className={cn(
        'mr-2xs grid grid-cols-[1fr_0.75rem]',
        menuItemBaseClasses,
        menuItemHighlightClasses,
        'group-data-[side=none]:pr-xs group-data-[side=none]:leading-lg first-of-type:mt-2xs last-of-type:mb-2xs data-selected:bg-neutral-default data-selected:text-neutral-on-default pointer-coarse:py-xs',
        className,
      )}
      ref={ref}
      {...props}
    >
      <span className="col-start-1">{children}</span>
      <BaseCombobox.ItemIndicator className="col-start-2 place-self-end self-center [&>svg]:size-sm!">
        <Icon name="selected" className="size-sm" />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  )
}
