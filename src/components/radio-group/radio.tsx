import { Radio as BaseRadio } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { radioVariants } from './radio-group.types'
import type { RadioProps } from './radio-group.types'

export function Radio({ variant, className, children, ref, ...props }: RadioProps) {
  const ariaLabel = typeof children === 'string' ? children : undefined

  return (
    <div className="flex items-center gap-2xs">
      <BaseRadio.Root
        aria-label={ariaLabel}
        className={cn(radioVariants({ className, variant }))}
        ref={ref}
        {...props}
      >
        <BaseRadio.Indicator
          data-indicator
          className="size-2xs origin-center scale-0 rounded-full bg-surface shadow-2xs transition-transform duration-200 ease-out data-checked:scale-100"
        />
      </BaseRadio.Root>
      {children && <span className="text-sm">{children}</span>}
    </div>
  )
}
