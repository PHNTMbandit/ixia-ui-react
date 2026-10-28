import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import type { BreadcrumbSeparatorProps } from './breadcrumb.types'

export function BreadcrumbSeparator({
  className,
  children,
  ref,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <div className={cn('text-on-surface-variant [&>svg]:size-xs', className)} ref={ref} {...props}>
      {children ?? <Icon name="chevronRight" />}
    </div>
  )
}
