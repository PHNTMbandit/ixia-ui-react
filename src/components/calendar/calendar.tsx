import React from 'react'

import { calendarReducer } from './calendar.reducer'
import type { CalendarProps, CalendarContextValue } from './calendar.types'

const CalendarContext = React.createContext<CalendarContextValue | undefined>(undefined),
  useCalendar = () => {
    const context = React.useContext(CalendarContext)

    if (!context) {
      throw new Error('useCalendar must be used within a Calendar')
    }

    return context
  }

function Calendar({ defaultState, children }: CalendarProps) {
  const [state, dispatch] = React.useReducer(
    calendarReducer,
    defaultState ?? { selectedDates: undefined },
  )

  return <CalendarContext.Provider value={{ dispatch, state }}>{children}</CalendarContext.Provider>
}

export { Calendar, useCalendar }
