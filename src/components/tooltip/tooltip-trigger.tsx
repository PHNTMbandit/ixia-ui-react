import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { isValidElement } from 'react'
import type { ReactElement } from 'react'

import type { TooltipTriggerProps } from './tooltip.types'

export function TooltipTrigger({ children, ...props }: TooltipTriggerProps) {
  let render: ReactElement | undefined = undefined
  if (isValidElement(children)) {
    render = children
  }

  return <BaseTooltip.Trigger render={render} {...props} />
}
