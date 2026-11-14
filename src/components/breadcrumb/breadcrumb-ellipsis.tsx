import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import type { BreadcrumbEllipsisProps } from './breadcrumb.types'

export function BreadcrumbEllipsis({
  className,
  children,
  ref,
  ...props
}: BreadcrumbEllipsisProps) {
  return (
    <div
      className={cn(
        'flex size-md min-target items-center justify-center rounded-full text-on-surface-variant transition-all duration-hover hover:cursor-pointer hover:bg-neutral-container hover:text-neutral-on-container active:scale-[0.98] active:bg-neutral-container disabled:opacity-50 [:where(&)>svg]:size-sm',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children ?? <Icon name="ellipsis" />}
    </div>
  )
}
