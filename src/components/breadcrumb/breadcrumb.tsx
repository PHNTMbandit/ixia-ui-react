import { cn } from '@/utils/cn'

import type { BreadcrumbProps } from './breadcrumb.types'

export function Breadcrumb({ className, ref, ...props }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center gap-2xs px-sm py-2xs', className)} ref={ref} {...props} />
  )
}
