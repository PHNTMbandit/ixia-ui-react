import { CaretRightIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import type { BreadcrumbSeparatorProps } from './breadcrumb.types'

export function BreadcrumbSeparator({ className, ref, ...props }: BreadcrumbSeparatorProps) {
  return (
    <div className={cn('text-on-surface-variant [&>svg]:size-xs', className)} ref={ref} {...props}>
      <CaretRightIcon weight="bold" />
    </div>
  )
}
