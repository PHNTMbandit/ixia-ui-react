import { cn } from '@/utils/cn'

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
      data-slot="accordion-down-icon"
      className={cn(
        'ml-auto flex shrink-0 items-center justify-center self-center text-on-surface-variant transition-transform duration-200 ease-out group-data-panel-open:rotate-180 [:where(&)>svg]:size-(--accordion-expand-icon-size,var(--spacing-sm))',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children ?? <Icon name="chevronDown" />}
    </div>
  )
}
