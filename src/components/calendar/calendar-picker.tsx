import {
  DayPicker,
  getDefaultClassNames,
  isDateRange,
  DayButton,
  labelDayButton,
} from '@daypicker/react'
import type { OnSelectHandler, PropsBase } from '@daypicker/react'
import { CaretLeftIcon, CaretRightIcon, CaretUpDownIcon } from '@phosphor-icons/react'
import type { ChangeEvent, ComponentProps } from 'react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { buttonVariants } from '../button/button.types'
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

function CalendarDayButton({ className, modifiers, ...props }: ComponentProps<typeof DayButton>) {
  return (
    <DayButton
      {...props}
      modifiers={modifiers}
      className={cn(
        buttonVariants({ size: 'medium', tone: 'neutral', variant: 'ghost' }),
        'text-inherit hover:bg-brand-container hover:text-brand-on-container',
        modifiers.selected && 'hover:bg-brand-default hover:text-brand-on-default',
        className,
      )}
    />
  )
}

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
      size="iconMedium"
      className={cn('hover:bg-neutral-container-high hover:text-neutral-on-container')}
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
      size="iconMedium"
      className={cn('hover:bg-neutral-container-high hover:text-neutral-on-container')}
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

// WCAG 2.5.3: the accessible name must contain the visible text, which is the day number.
function labelDayButtonWithVisibleText(...args: Parameters<typeof labelDayButton>) {
  const [date, modifiers, options, dateLib] = args,
    visibleDay = dateLib?.format(date, 'd') ?? String(date.getDate())
  return `${visibleDay}, ${labelDayButton(date, modifiers, options, dateLib)}`
}

const defaultClassNames = getDefaultClassNames(),
  calendarClassNames: PropsBase['classNames'] = {
    caption_label: 'style-text-strong-0',
    day: cn(
      'size-xl! rounded-full style-text-default-0 transition-colors hover:bg-brand-container hover:text-brand-on-container data-selected:text-brand-on-default data-selected:hover:bg-brand-default',
      defaultClassNames.day,
    ),
    day_button: cn('size-xl! rounded-full', defaultClassNames.day_button),
    disabled: cn('pointer-events-none text-on-surface', defaultClassNames.disabled),
    month_caption: 'flex items-center justify-center h-lg',
    month_grid: cn('mt-xs border-separate! border-spacing-3xs', defaultClassNames.month_grid),
    nav: cn('h-lg! w-full justify-between!', defaultClassNames.nav),
    outside: cn('border-none text-on-surface-muted', defaultClassNames.outside),
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
    week: cn('', defaultClassNames.week),
    weekdays: cn('style-text-default-0 text-on-surface-muted', defaultClassNames.weekdays),
  },
  calendarComponents: CalendarComponents = {
    DayButton: CalendarDayButton,
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
      labels: { labelDayButton: labelDayButtonWithVisibleText },
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
