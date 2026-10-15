import { Popover as BasePopover } from '@base-ui/react/popover'
import { isValidElement } from 'react'
import type { ReactElement } from 'react'

import { cn } from '@/utils/cn'

import type { PopoverTriggerProps } from './popover.types'

export function PopoverTrigger({ className, children, ref, ...props }: PopoverTriggerProps) {
  let render: ReactElement | undefined = undefined
  if (isValidElement(children)) {
    render = children
  }

  return (
    <BasePopover.Trigger className={cn('px-xs', className)} ref={ref} render={render} {...props} />
  )
}
