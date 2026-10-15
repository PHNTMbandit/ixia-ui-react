import { DayPicker, getDefaultClassNames, isDateRange } from '@daypicker/react'
import type { OnSelectHandler, PropsBase } from '@daypicker/react'
import { CaretLeftIcon, CaretRightIcon, CaretUpDownIcon } from '@phosphor-icons/react'
import type { ChangeEvent, ComponentProps } from 'react'

// eslint-disable-next-line import/no-unassigned-import -- DayPicker styles are required globally.
import '@daypicker/react/style.css'
import { cn } from '@/utils/cn'

import { Button } from '../button'
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
import { useCalendar } from './calendar'
import type { CalendarPickerProps, CalendarSelected } from './calendar.types'

type CalendarComponents = NonNullable<PropsBase['components']>

function createSelectTarget(value: string): HTMLSelectElement {
  const element = document.createElement('select'),
    option = Object.assign(document.createElement('option'), { value })

  element.append(option)
  element.value = value

  return element
}

function CalendarDropdown({
  options,
  onChange,
  value,
  'aria-label': ariaLabel,
}: ComponentProps<NonNullable<CalendarComponents['Dropdown']>>) {
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
    <Select<string> value={value?.toString()} onValueChange={handleValueChange}>
      <SelectTrigger variant="ghost" aria-label={ariaLabel}>
        <SelectValue>{options?.find((option) => option.value === value)?.label}</SelectValue>
        <SelectIcon>
          <CaretUpDownIcon weight="bold" />
        </SelectIcon>
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

function CalendarNextMonthButton({
  onClick,
  disabled,
  ...props
}: ComponentProps<NonNullable<CalendarComponents['NextMonthButton']>>) {
  return (
    <Button
      {...props}
      variant="ghost"
      tone="neutral"
      size="iconSmall"
      onClick={onClick}
      disabled={disabled}
    >
      <CaretRightIcon weight="bold" />
    </Button>
  )
}

function CalendarPreviousMonthButton({
  onClick,
  disabled,
  ...props
}: ComponentProps<NonNullable<CalendarComponents['PreviousMonthButton']>>) {
  return (
    <Button
      {...props}
      variant="ghost"
      tone="neutral"
      size="iconSmall"
      onClick={onClick}
      disabled={disabled}
    >
      <CaretLeftIcon weight="bold" />
    </Button>
  )
}

function getMultipleSelected(selectedDates: CalendarSelected | undefined): Date[] | undefined {
  if (Array.isArray(selectedDates)) {
    return selectedDates
  }
  return undefined
}

function getRangeSelected(selectedDates: CalendarSelected | undefined) {
  if (isDateRange(selectedDates)) {
    return selectedDates
  }
  return undefined
}

function getSingleSelected(selectedDates: CalendarSelected | undefined): Date | undefined {
  if (selectedDates instanceof Date) {
    return selectedDates
  }
  return undefined
}

const defaultClassNames = getDefaultClassNames(),
  calendarClassNames: PropsBase['classNames'] = {
    caption_label: 'style-text-strong-0',
    day: cn(
      'rounded-xl style-text-default-0 transition-colors hover:bg-brand-container hover:text-brand-on-container data-selected:text-brand-on-default data-selected:hover:bg-brand-default',
      defaultClassNames.day,
    ),
    disabled: cn('pointer-events-none text-on-surface', defaultClassNames.disabled),
    month_caption: 'flex items-center justify-center h-lg',
    month_grid: cn('mt-xs', defaultClassNames.month_grid),
    nav: cn('h-lg! w-full justify-between!', defaultClassNames.nav),
    outside: cn('border-none text-on-surface', defaultClassNames.outside),
    range_end: cn('rounded-l-none bg-brand-default text-brand-on-default'),
    range_middle: cn(
      'rounded-none! border-y border-brand-border bg-brand-container! text-brand-on-container! transition-none',
    ),
    range_start: cn(
      'rounded-r-none bg-brand-default text-brand-on-default',
      '[&.rounded-l-none]:rounded-xl',
    ),
    selected: cn('bg-brand-default text-brand-on-default'),
    today: cn('text-brand-default! data-selected:text-brand-on-default!', defaultClassNames.today),
    weekdays: cn('style-text-default-0 text-on-surface', defaultClassNames.weekdays),
  },
  calendarComponents: CalendarComponents = {
    Dropdown: CalendarDropdown,
    NextMonthButton: CalendarNextMonthButton,
    PreviousMonthButton: CalendarPreviousMonthButton,
  }

export function CalendarPicker({
  className,
  mode = 'single',
  selected,
  onSelect,
  ...props
}: CalendarPickerProps) {
  const { state, dispatch } = useCalendar(),
    selectedValue = selected ?? state.selectedDates,
    handleSelect: OnSelectHandler<CalendarSelected | undefined> = (next) => {
      dispatch({ payload: next, type: 'SET_SELECTED_DATES' })
      onSelect?.(next)
    },
    baseProps: PropsBase = {
      className,
      classNames: calendarClassNames,
      components: calendarComponents,
      ...props,
    }

  switch (mode) {
    case 'multiple': {
      return (
        <DayPicker
          {...baseProps}
          mode="multiple"
          selected={getMultipleSelected(selectedValue)}
          onSelect={handleSelect}
        />
      )
    }
    case 'range': {
      return (
        <DayPicker
          {...baseProps}
          mode="range"
          selected={getRangeSelected(selectedValue)}
          onSelect={handleSelect}
        />
      )
    }
    default: {
      return (
        <DayPicker
          {...baseProps}
          mode="single"
          selected={getSingleSelected(selectedValue)}
          onSelect={handleSelect}
        />
      )
    }
  }
}
