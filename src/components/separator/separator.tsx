import { Separator as BaseSeparator } from '@base-ui/react/separator'

import { cn } from '@/utils/cn'

import { separatorVariants } from './separator.types'
import type { SeparatorProps } from './separator.types'

export function Separator({
  orientation,
  weight,
  style,
  variant,
  children,
  className,
  labelClassName,
  ref,
  ...props
}: SeparatorProps) {
  return (
    <BaseSeparator
      className={cn(
        'relative',
        separatorVariants({ orientation, style, variant, weight }),
        className,
      )}
      orientation={orientation}
      ref={ref}
      {...props}
    >
      <span
        data-label
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-background px-2xs whitespace-nowrap text-on-surface-variant',
          labelClassName,
        )}
      >
        {children}
      </span>
    </BaseSeparator>
  )
}
