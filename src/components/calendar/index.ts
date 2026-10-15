import { Calendar as CalendarRoot } from './calendar'
import { CalendarFooter } from './calendar-footer'
import { CalendarHeader } from './calendar-header'
import { CalendarPanel } from './calendar-panel'
import { CalendarPicker } from './calendar-picker'
import { CalendarSummary } from './calendar-summary'

const Calendar = Object.assign(CalendarRoot, {
  Footer: CalendarFooter,
  Header: CalendarHeader,
  Panel: CalendarPanel,
  Picker: CalendarPicker,
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
} from './calendar.types'

export { CalendarPicker } from './calendar-picker'
export { CalendarFooter } from './calendar-footer'
export { CalendarHeader } from './calendar-header'
export { CalendarPanel } from './calendar-panel'
export { CalendarSummary } from './calendar-summary'
export { Calendar }
