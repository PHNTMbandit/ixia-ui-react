import type { CalendarState, CalendarAction } from './calendar.types'

export const calendarReducer = (state: CalendarState, action: CalendarAction): CalendarState => {
  switch (action.type) {
    case 'SET_SELECTED_DATES': {
      return {
        ...state,
        selectedDates: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
