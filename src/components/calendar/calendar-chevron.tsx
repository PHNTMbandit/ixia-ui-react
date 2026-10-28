import { Icon } from '../icon'
import type { IconName } from '../icon'
import type { CalendarChevronProps } from './calendar.types'

const chevronIcons: Record<NonNullable<CalendarChevronProps['orientation']>, IconName> = {
  down: 'chevronDown',
  left: 'chevronLeft',
  right: 'chevronRight',
  up: 'chevronUp',
}

// DayPicker renders this inside its navigation and caption controls in place of its own blue chevron.
export function CalendarChevron({ orientation = 'left' }: CalendarChevronProps) {
  return <Icon name={chevronIcons[orientation]} />
}
