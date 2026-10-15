import { Accordion as BaseAccordion } from '@base-ui/react/accordion'

import { cn } from '@/utils/cn'

import type { AccordionPanelProps } from './accordion.types'

export function AccordionPanel({ className, children, ref, ...props }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      className={cn(
        'h-(--accordion-panel-height) overflow-hidden transition-all duration-300 ease-out data-ending-style:h-[0px] data-starting-style:h-[0px]',
        className,
      )}
      data-panel
      ref={ref}
      {...props}
    >
      <div className="px-md pb-sm">{children}</div>
    </BaseAccordion.Panel>
  )
}
