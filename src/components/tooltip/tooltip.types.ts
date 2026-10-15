import type { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import type { ComponentProps } from 'react'

type TooltipProps = ComponentProps<typeof BaseTooltip.Root>
type TooltipTriggerProps = ComponentProps<typeof BaseTooltip.Trigger>
type TooltipContentProps = ComponentProps<typeof BaseTooltip.Popup> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
  alignOffset?: number
  sideOffset?: number
}

export type { TooltipProps, TooltipTriggerProps, TooltipContentProps }
