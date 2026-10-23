import { Switch as BaseSwitch } from '@base-ui/react/switch'

import { cn } from '@/utils/cn'

import { Label } from '../label'
import type { SwitchProps } from './switch.types'

export function Switch({ children, className, ref, ...props }: SwitchProps) {
  return (
    <Label className="flex items-center gap-xs">
      <BaseSwitch.Root
        className={cn(
          'group relative flex h-lg w-2xl items-center rounded-full bg-surface-low bg-size-[6.5rem_100%] outline-2 outline-transparent transition-colors ease-[cubic-bezier(0.26,0.75,0.38,0.45)] before:absolute before:rounded-full hover:cursor-pointer hover:not-disabled:outline-accent-border-strong disabled:pointer-events-none disabled:opacity-50 data-checked:bg-accent-default data-disabled:pointer-events-none data-disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      >
        <BaseSwitch.Thumb className="size-md translate-x-[calc(0%+3px)] rounded-full shadow-2xs transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] data-checked:translate-x-[calc(100%--7px)] data-checked:bg-accent-on-default data-unchecked:bg-white" />
      </BaseSwitch.Root>
      {children != undefined && (
        <span data-slot="switch-label" className="leading-none">
          {children}
        </span>
      )}
    </Label>
  )
}
