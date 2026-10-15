import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { CaretDownIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn.ts'

import type { AccordionHeaderProps } from './accordion.types'

export function AccordionHeader({ className, children, ref, ...props }: AccordionHeaderProps) {
  return (
    <BaseAccordion.Header className={cn('', className)} ref={ref} {...props}>
      <BaseAccordion.Trigger
        className={cn(
          'group flex min-h-2xl w-full items-center justify-between gap-sm py-sm pr-sm pl-md hover:cursor-pointer',
        )}
      >
        <div className="grid auto-rows-min items-center gap-x-sm has-data-[slot=accordion-icon]:grid-cols-[auto_1fr] has-data-[slot=accordion-subtitle]:grid-rows-[auto_auto] has-data-[slot=accordion-subtitle]:**:data-[slot=accordion-icon]:row-span-2">
          {children}
        </div>
        <CaretDownIcon
          className="ml-auto shrink-0 text-on-surface-variant transition-transform duration-200 ease-out group-data-panel-open:rotate-180"
          weight="bold"
        />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  )
}
