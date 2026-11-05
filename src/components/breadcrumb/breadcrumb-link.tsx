import { cn } from '@/utils/cn'
import { trimTextChildren } from '@/utils/trim-text-children'

import type { BreadcrumbLinkProps } from './breadcrumb.types'

export function BreadcrumbLink({ className, children, ref, ...props }: BreadcrumbLinkProps) {
  return (
    <div
      className={cn(
        'inline-flex h-lg items-center justify-center gap-3xs rounded-full px-2xs font-body text-sm leading-none font-medium text-on-surface-variant transition-all hover:cursor-pointer hover:bg-neutral-container active:scale-[0.98] active:bg-neutral-container disabled:opacity-50 [&>svg]:size-sm',
        className,
      )}
      ref={ref}
      {...props}
    >
      {trimTextChildren(children)}
    </div>
  )
}
