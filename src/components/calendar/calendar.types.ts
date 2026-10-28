import type { DateRange, DayButton, Mode, PropsBase } from '@daypicker/react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type React from 'react'

const calendarPanelVariants = cva('w-fit', {
  compoundVariants: [
    {
      className: 'rounded-2xl p-sm',
      variant: ['elevated', 'outline'],
    },
  ],
  defaultVariants: {
    variant: 'elevated',
  },
  variants: {
    variant: {
      elevated: 'bg-surface shadow-2xs',
      ghost: 'bg-transparent',
      outline: 'border border-border',
    },
  },
})

type CalendarSelected = Date | Date[] | DateRange

interface CalendarState {
  selectedDates: CalendarSelected | undefined
}

interface CalendarAction {
  type: 'SET_SELECTED_DATES'
  payload: CalendarSelected | undefined
}

type CalendarProps = React.ComponentProps<'div'> & {
  defaultState?: CalendarState
}
interface CalendarContextValue {
  state: CalendarState
  dispatch: React.Dispatch<CalendarAction>
}

type CalendarPickerProps = PropsBase & {
  selected?: CalendarSelected
  onSelect?: (date: CalendarSelected | undefined) => void
  mode?: Mode
}
type CalendarPanelProps = React.ComponentProps<'div'> & VariantProps<typeof calendarPanelVariants>
type CalendarHeaderProps = React.ComponentProps<'div'>
type CalendarSummaryProps = React.ComponentProps<'div'>
type CalendarFooterProps = React.ComponentProps<'div'>
type CalendarComponents = NonNullable<PropsBase['components']>
type CalendarChevronProps = React.ComponentProps<NonNullable<CalendarComponents['Chevron']>>
type CalendarNextMonthButtonProps = React.ComponentProps<
  NonNullable<CalendarComponents['NextMonthButton']>
>
type CalendarPreviousMonthButtonProps = React.ComponentProps<
  NonNullable<CalendarComponents['PreviousMonthButton']>
>
type CalendarDropdownProps = React.ComponentProps<NonNullable<CalendarComponents['Dropdown']>> & {
  children?: React.ReactNode
}
type CalendarDayButtonProps = React.ComponentProps<typeof DayButton>

export type {
  CalendarSelected,
  CalendarState,
  CalendarAction,
  CalendarProps,
  CalendarContextValue,
  CalendarPickerProps,
  CalendarPanelProps,
  CalendarHeaderProps,
  CalendarSummaryProps,
  CalendarFooterProps,
  CalendarNextMonthButtonProps,
  CalendarChevronProps,
  CalendarPreviousMonthButtonProps,
  CalendarDropdownProps,
  CalendarDayButtonProps,
  CalendarComponents,
}
export { calendarPanelVariants }
