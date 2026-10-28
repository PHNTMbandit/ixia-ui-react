import { cn } from '@/utils'

import type { SiteHeaderTitleProps } from './site-header.types'

export function SiteHeaderTitle({ className, ref, ...props }: SiteHeaderTitleProps) {
  return <span className={cn('style-text-strong-2', className)} ref={ref} {...props} />
}
