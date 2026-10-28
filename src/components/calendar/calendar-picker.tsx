import { DayPicker, getDefaultClassNames, isDateRange, labelDayButton } from '@daypicker/react'
import type { OnSelectHandler, PropsBase } from '@daypicker/react'

import { cn } from '@/utils/cn'

import { useCalendar } from './calendar'
import { CalendarChevron } from './calendar-chevron'
import { CalendarDayButton } from './calendar-day-button'
import { CalendarDropdown } from './calendar-dropdown'
import { CalendarNextMonthButton } from './calendar-next-month-button'
import { CalendarPreviousMonthButton } from './calendar-previous-month-button'
import type { CalendarComponents, CalendarPickerProps, CalendarSelected } from './calendar.types'

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
  defaultComponents: CalendarComponents = {
    Chevron: CalendarChevron,
    DayButton: CalendarDayButton,
    Dropdown: CalendarDropdown,
    NextMonthButton: CalendarNextMonthButton,
    PreviousMonthButton: CalendarPreviousMonthButton,
  },
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
  }

export function CalendarPicker({
  className,
  components,
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
      components: { ...defaultComponents, ...components },
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
