import { Calendar as CalendarRoot } from './calendar'
import { CalendarDayButton } from './calendar-day-button'
import { CalendarDropdown } from './calendar-dropdown'
import { CalendarFooter } from './calendar-footer'
import { CalendarHeader } from './calendar-header'
import { CalendarNextMonthButton } from './calendar-next-month-button'
import { CalendarPanel } from './calendar-panel'
import { CalendarPicker } from './calendar-picker'
import { CalendarPreviousMonthButton } from './calendar-previous-month-button'
import { CalendarSummary } from './calendar-summary'

const Calendar = Object.assign(CalendarRoot, {
  DayButton: CalendarDayButton,
  Dropdown: CalendarDropdown,
  Footer: CalendarFooter,
  Header: CalendarHeader,
  NextMonthButton: CalendarNextMonthButton,
  Panel: CalendarPanel,
  Picker: CalendarPicker,
  PreviousMonthButton: CalendarPreviousMonthButton,
  Summary: CalendarSummary,
})

export type {
  CalendarAction,
  CalendarContextValue,
  CalendarProps,
  CalendarFooterProps,
  CalendarHeaderProps,
  CalendarPanelProps,
  CalendarPickerProps,
  CalendarSummaryProps,
  CalendarDayButtonProps,
  CalendarChevronProps,
  CalendarNextMonthButtonProps,
  CalendarPreviousMonthButtonProps,
  CalendarDropdownProps,
  CalendarComponents,
} from './calendar.types'

export { CalendarPicker } from './calendar-picker'
export { CalendarFooter } from './calendar-footer'
export { CalendarHeader } from './calendar-header'
export { CalendarPanel } from './calendar-panel'
export { CalendarSummary } from './calendar-summary'
export { CalendarDayButton } from './calendar-day-button'
export { CalendarChevron } from './calendar-chevron'
export { CalendarNextMonthButton } from './calendar-next-month-button'
export { CalendarPreviousMonthButton } from './calendar-previous-month-button'
export { CalendarDropdown } from './calendar-dropdown'
export { Calendar }
