import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'

import { cn } from '@/utils/cn'

import type { TooltipContentProps } from './tooltip.types'

const DEFAULT_ALIGN_OFFSET = 0,
  DEFAULT_SIDE_OFFSET = 5

export function TooltipContent({
  side = 'top',
  alignOffset = DEFAULT_ALIGN_OFFSET,
  sideOffset = DEFAULT_SIDE_OFFSET,
  className,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner side={side} alignOffset={alignOffset} sideOffset={sideOffset}>
        <BaseTooltip.Popup
          className={cn(
            'z-50 w-fit origin-(--transform-origin) animate-in rounded-md bg-surface-2 px-xs py-3xs text-sm text-balance shadow-md fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            className,
          )}
          {...props}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}
