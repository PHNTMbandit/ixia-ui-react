import { cn } from '@/utils/cn'
import { trimTextChildren } from '@/utils/trim-text-children'

import type { BreadcrumbItemProps } from './breadcrumb.types'

export function BreadcrumbItem({ className, children, ref, ...props }: BreadcrumbItemProps) {
  return (
    <div
      className={cn(
        'inline-flex h-lg items-center justify-center gap-2xs rounded-full px-2xs style-text-default--1 text-accent-default [:where(&)>svg]:size-sm',
        className,
      )}
      ref={ref}
      {...props}
    >
      {trimTextChildren(children)}
    </div>
  )
}
