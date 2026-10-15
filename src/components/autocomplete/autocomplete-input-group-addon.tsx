import { cn } from '@/utils/cn'

import type { AutocompleteInputGroupAddonProps } from './autocomplete.types'

export function AutocompleteInputGroupAddon({
  className,
  ref,
  ...props
}: AutocompleteInputGroupAddonProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-xs style-text-default-0 text-on-surface-variant',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
