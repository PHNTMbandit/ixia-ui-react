import { Tooltip as TooltipRoot } from './tooltip'
import { TooltipContent } from './tooltip-context'
import { TooltipTrigger } from './tooltip-trigger'

const Tooltip = Object.assign(TooltipRoot, {
  Content: TooltipContent,
  Trigger: TooltipTrigger,
})

export type { TooltipContentProps, TooltipProps, TooltipTriggerProps } from './tooltip.types'
export { TooltipContent } from './tooltip-context'
export { TooltipTrigger } from './tooltip-trigger'

export { Tooltip }
