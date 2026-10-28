import type { ChangeEvent } from 'react'

import { cn } from '@/utils'

import { Icon } from '../icon'
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTitle,
  SelectTrigger,
  SelectValue,
} from '../select'
import type { CalendarDropdownProps } from './calendar.types'

function createSelectTarget(value: string): HTMLSelectElement {
  const element = document.createElement('select'),
    option = Object.assign(document.createElement('option'), { value })

  element.append(option)
  element.value = value

  return element
}

export function CalendarDropdown({
  children,
  className,
  disabled,
  value,
  options,
  onChange,
  'aria-label': ariaLabel,
}: CalendarDropdownProps) {
  const handleValueChange = (newValue: string | null) => {
    if (onChange) {
      const element = createSelectTarget(newValue ?? ''),
        syntheticEvent = {
          bubbles: false,
          cancelable: false,
          currentTarget: element,
          defaultPrevented: false,
          eventPhase: Event.NONE,
          isDefaultPrevented: () => false,
          isPropagationStopped: () => false,
          isTrusted: false,
          nativeEvent: new Event('change'),
          persist: () => undefined,
          preventDefault: () => undefined,
          stopPropagation: () => undefined,
          target: element,
          timeStamp: performance.now(),
          type: 'change',
        } satisfies ChangeEvent<HTMLSelectElement>

      onChange(syntheticEvent)
    }
  }

  return (
    <Select<string> disabled={disabled} value={value?.toString()} onValueChange={handleValueChange}>
      <SelectTrigger variant="ghost" aria-label={ariaLabel} className={cn('', className)}>
        <SelectValue>{options?.find((option) => option.value === value)?.label}</SelectValue>
        {children ?? (
          <SelectIcon>
            <Icon name="chevronsUpDown" />
          </SelectIcon>
        )}
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value.toString()}
              disabled={option.disabled}
            >
              <SelectTitle>{option.label}</SelectTitle>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  )
}
