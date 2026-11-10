import { Combobox as BaseCombobox } from '@base-ui/react/combobox'

import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import type { ComboboxTriggerProps } from './combobox.types'

function getPlaceholderLabel(placeholder: ComboboxTriggerProps['placeholder']): string | undefined {
  if (typeof placeholder === 'string') {
    return placeholder
  }
  return undefined
}

export function ComboboxTrigger({
  placeholder,
  className,
  children,
  ref,
  ...props
}: ComboboxTriggerProps) {
  return (
    <BaseCombobox.Trigger
      aria-label={getPlaceholderLabel(placeholder)}
      className={cn(
        'inline-flex h-xl items-center justify-between gap-xl rounded-xl bg-surface pr-sm pl-md style-text-default-0 outline-1 outline-border-strong transition-all hover:cursor-pointer hover:outline-2 data-popup-open:outline-brand-border-strong',
        className,
      )}
      ref={ref}
      {...props}
    >
      <BaseCombobox.Value placeholder={<span className="opacity-70">{placeholder}</span>} />
      <BaseCombobox.Icon>
        <Icon name="chevronsUpDown" />
      </BaseCombobox.Icon>
      {children}
    </BaseCombobox.Trigger>
  )
}
