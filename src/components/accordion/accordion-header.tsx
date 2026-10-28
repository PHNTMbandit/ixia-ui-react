import { Accordion as BaseAccordion } from '@base-ui/react/accordion'

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
        {children}
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  )
}
