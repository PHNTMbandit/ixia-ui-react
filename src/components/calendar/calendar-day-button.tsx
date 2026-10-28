import { DayButton } from '@daypicker/react'

import { cn } from '@/utils'

import { buttonVariants } from '../button/button.types'
import type { CalendarDayButtonProps } from './calendar.types'

export function CalendarDayButton({ className, modifiers, ...props }: CalendarDayButtonProps) {
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
