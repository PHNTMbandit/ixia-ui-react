import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { useContext } from 'react'

import { cn } from '@/utils/cn'

import { ToggleGroupContext } from '../toggle-group/toggle-group-context'
import { toggleVariants } from './toggle.types'
import type { ToggleProps } from './toggle.types'

export function Toggle({ size, tone, className, children, ref, ...props }: ToggleProps) {
  const toggleGroupContext = useContext(ToggleGroupContext),
    effectiveSize = size ?? toggleGroupContext?.size ?? 'medium'

  return (
    <BaseToggle
      ref={ref}
      {...props}
      render={(innerProps, state) => (
        <button
          {...innerProps}
          className={cn(toggleVariants({ className, size: effectiveSize, tone }))}
          type="button"
        >
          {typeof children === 'function' && children(state)}
          {typeof children !== 'function' && children}
        </button>
      )}
    />
  )
}
