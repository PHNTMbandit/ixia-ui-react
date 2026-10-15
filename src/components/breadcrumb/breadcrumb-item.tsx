import { cn } from '@/utils/cn'

import type { BreadcrumbItemProps } from './breadcrumb.types'

export function BreadcrumbItem({ className, ref, ...props }: BreadcrumbItemProps) {
  return (
    <div
      className={cn(
        'inline-flex h-md items-center justify-center gap-2xs rounded-full px-2xs style-text-default--1 text-accent-default [&>svg]:size-xs',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
