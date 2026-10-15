import { Accordion as BaseAccordion } from '@base-ui/react/accordion'

import { cn } from '@/utils/cn'

import { accordionVariants } from './accordion.types'
import type { AccordionProps } from './accordion.types'

export function Accordion({
  withSeparator = true,
  variant,
  className,
  ref,
  ...props
}: AccordionProps) {
  return (
    <BaseAccordion.Root
      className={cn(
        accordionVariants({ className, variant }),
        withSeparator && 'divide-y divide-border',
      )}
      ref={ref}
      {...props}
    />
  )
}
