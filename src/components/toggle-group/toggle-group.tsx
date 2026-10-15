import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'

import { cn } from '@/utils/cn'

import { ToggleGroupContext } from './toggle-group-context'
import { toggleGroupVariants } from './toggle-group.types'
import type { ToggleGroupProps } from './toggle-group.types'

export function ToggleGroup({
  size = 'medium',
  variant,
  className,
  ref,
  ...props
}: ToggleGroupProps) {
  const displaySize = size ?? 'medium'
  return (
    <ToggleGroupContext.Provider value={{ size: displaySize }}>
      <BaseToggleGroup
        className={cn(toggleGroupVariants({ className, size: displaySize, variant }))}
        data-size={displaySize}
        ref={ref}
        {...props}
      />
    </ToggleGroupContext.Provider>
  )
}
