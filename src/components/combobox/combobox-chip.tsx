import { Combobox as BaseCombobox } from '@base-ui/react/combobox'

import { cn } from '@/utils/cn'
import { trimTextChildren } from '@/utils/trim-text-children'

import { Button } from '../button'
import { Icon } from '../icon'
import type { ComboboxChipProps } from './combobox.types'

export function ComboboxChip({ className, children, ref, ...props }: ComboboxChipProps) {
  return (
    <BaseCombobox.Chip
      className={cn(
        'inline-flex h-lg items-center justify-center gap-xs rounded-lg bg-neutral-container pr-3xs pl-xs style-text-default-0 text-neutral-on-container',
        className,
      )}
      ref={ref}
      {...props}
    >
      {trimTextChildren(children)}
      <BaseCombobox.ChipRemove
        aria-label="Remove"
        render={<Button variant="ghost" tone="error" size="extraSmall" />}
      >
        <Icon name="close" className="size-sm" />
      </BaseCombobox.ChipRemove>
    </BaseCombobox.Chip>
  )
}
