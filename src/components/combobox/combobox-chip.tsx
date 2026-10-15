import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { XIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
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
      {children}
      <BaseCombobox.ChipRemove
        aria-label="Remove"
        render={(innerProps) => (
          <Button
            aria-label="Remove"
            onClick={() => innerProps.onClick}
            variant="ghost"
            tone="error"
            size="iconExtraSmall"
          >
            <XIcon className="size-sm" weight="bold" />
          </Button>
        )}
      />
    </BaseCombobox.Chip>
  )
}
