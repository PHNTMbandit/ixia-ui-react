import { cn } from '@/utils'

import { siteHeaderGroupVariants } from './site-header.types'
import type { SiteHeaderGroupProps } from './site-header.types'

export function SiteHeaderGroup({ position, className, ref, ...props }: SiteHeaderGroupProps) {
  return (
    <div className={cn(siteHeaderGroupVariants({ position }), className)} ref={ref} {...props} />
  )
}
