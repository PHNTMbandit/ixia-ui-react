import { cn } from '@/utils/cn'

import type { BreadcrumbLinkProps } from './breadcrumb.types'

export function BreadcrumbLink({ className, ref, ...props }: BreadcrumbLinkProps) {
  return (
    <div
      className={cn(
        'inline-flex h-md items-center justify-center gap-3xs rounded-full px-2xs style-text-default--1 text-on-surface-variant transition-all hover:cursor-pointer hover:bg-neutral-container active:scale-[0.98] active:bg-neutral-container disabled:opacity-50 [&>svg]:size-xs',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
