import { Accordion as BaseAccordion } from '@base-ui/react/accordion'

import { cn } from '@/utils/cn'

import { accordionItemVariants } from './accordion.types'
import type { AccordionItemProps } from './accordion.types'

export function AccordionItem({ size, tone, className, ref, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      className={cn(accordionItemVariants({ className, size, tone }))}
      ref={ref}
      {...props}
    />
  )
}
