import { cn } from '@/utils/cn'

import type { SiteHeaderProps } from './site-header.types'

export function SiteHeader({ sticky = false, className, ref, ...props }: SiteHeaderProps) {
  return (
    <div
      className={cn(
        'z-50 grid auto-cols-fr grid-flow-col items-center gap-xs border-b border-border bg-surface-background px-lg py-xs',
        sticky && 'sticky top-0',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
