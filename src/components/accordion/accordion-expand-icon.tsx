import { cn } from '@/utils'

import { Icon } from '../icon'
import type { AccordionExpandIconProps } from './accordion.types'

export function AccordionExpandIcon({
  className,
  children,
  ref,
  ...props
}: AccordionExpandIconProps) {
  return (
    <div
      className={cn(
        'ml-auto shrink-0 text-on-surface-variant transition-transform duration-200 ease-out group-data-panel-open:rotate-180',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children ?? <Icon name="chevronDown" />}
    </div>
  )
}
