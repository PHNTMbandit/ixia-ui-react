import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import { menuItemBaseClasses, menuItemHighlightClasses } from '../menu/menu-tone'
import type { AutocompleteItemProps } from './autocomplete.types'

export function AutocompleteItem({ className, ref, ...props }: AutocompleteItemProps) {
  return (
    <BaseAutocomplete.Item
      className={cn(
        'group flex',
        menuItemBaseClasses,
        menuItemHighlightClasses,
        'hover:bg-neutral-container-high hover:text-neutral-on-container',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
