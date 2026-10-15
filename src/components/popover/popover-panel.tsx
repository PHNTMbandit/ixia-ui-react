import { Popover as BasePopover } from '@base-ui/react/popover'

import { cn } from '../../utils/cn'
import { popoverPanelVariants } from './popover.types'
import type { PopoverPanelProps } from './popover.types'

export function PopoverPanel({ elevation, className, ref, children, ...props }: PopoverPanelProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        className={cn(
          'h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none',
        )}
        ref={ref}
        sideOffset={8}
        {...props}
      >
        <BasePopover.Popup className={popoverPanelVariants({ className, elevation })}>
          <BasePopover.Arrow className="flex transition-[left] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180" />
          <BasePopover.Viewport
            className={cn(
              "relative h-(--popup-height,auto) w-(--popup-width,auto) max-w-full overflow-clip p-[1rem] transition-[width,height] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] **:data-current:w-[calc(var(--popup-width)-2rem)] **:data-current:translate-x-0 **:data-current:opacity-100 **:data-current:transition-[translate,opacity] **:data-current:duration-[350ms,175ms] **:data-current:ease-[cubic-bezier(0.22,1,0.36,1)] **:data-previous:w-[calc(var(--popup-width)-2rem)] **:data-previous:translate-x-0 **:data-previous:opacity-100 **:data-previous:transition-[translate,opacity] **:data-previous:duration-[350ms,175ms] **:data-previous:ease-[cubic-bezier(0.22,1,0.36,1)] **:data-[activation-direction~='left']:data-previous:data-ending-style:translate-x-1/2 **:data-[activation-direction~='left']:data-previous:data-ending-style:opacity-0 **:data-[activation-direction~='left']:data-current:data-starting-style:-translate-x-1/2 **:data-[activation-direction~='left']:data-current:data-starting-style:opacity-0 **:data-[activation-direction~='right']:data-previous:data-ending-style:-translate-x-1/2 **:data-[activation-direction~='right']:data-previous:data-ending-style:opacity-0 **:data-[activation-direction~='right']:data-current:data-starting-style:translate-x-1/2 **:data-[activation-direction~='right']:data-current:data-starting-style:opacity-0",
              className,
            )}
          >
            {children}
          </BasePopover.Viewport>
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}
