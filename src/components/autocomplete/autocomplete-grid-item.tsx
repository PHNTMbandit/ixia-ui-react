import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import type { AutocompleteGridItemProps } from './autocomplete.types'

export function AutocompleteGridItem({
  className,
  children,
  ref,
  ...props
}: AutocompleteGridItemProps) {
  return (
    <BaseAutocomplete.Item
      className={cn(
        'group flex h-lg min-w-(--anchor-width) cursor-default items-center rounded-md style-text-prose--1 select-none hover:cursor-pointer hover:bg-accent-default hover:text-surface data-highlighted:relative data-highlighted:z-0 data-highlighted:bg-accent-default data-highlighted:text-surface before:data-highlighted:absolute before:data-highlighted:inset-[0px] before:data-highlighted:z-[-1] before:data-highlighted:rounded-md',
        className,
      )}
      ref={ref}
      {...props}
    >
      <span className="text-lg leading-none">{children}</span>
    </BaseAutocomplete.Item>
  )
}
