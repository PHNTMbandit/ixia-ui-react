import { Switch as BaseSwitch } from '@base-ui/react/switch'

import { cn } from '@/utils/cn'

import { Label } from '../label'
import type { SwitchProps } from './switch.types'

export function Switch({ children, className, ref, ...props }: SwitchProps) {
  return (
    <Label className="flex items-center gap-xs">
      <BaseSwitch.Root
        className={cn(
          'group relative flex h-md w-xl items-center rounded-full bg-surface-low bg-size-[6.5rem_100%] p-[0.5px] inset-shadow-2xs outline-2 outline-transparent transition-colors ease-[cubic-bezier(0.26,0.75,0.38,0.45)] before:absolute before:rounded-full hover:cursor-pointer hover:not-disabled:outline-accent-border-strong disabled:pointer-events-none disabled:opacity-50 data-checked:bg-accent-default data-disabled:pointer-events-none data-disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      >
        <BaseSwitch.Thumb className="size-xs translate-x-[4px] rounded-full shadow-2xs transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] data-checked:size-sm data-checked:translate-x-[20px] data-checked:scale-[1.1] data-checked:bg-accent-on-default data-unchecked:bg-accent-default" />
      </BaseSwitch.Root>
      {children != undefined && (
        <span data-slot="switch-label" className="leading-none">
          {children}
        </span>
      )}
    </Label>
  )
}
