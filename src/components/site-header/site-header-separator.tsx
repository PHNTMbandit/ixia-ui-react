import { cn } from '@/utils'

import { Separator } from '../separator'
import type { SiteHeaderSeparatorProps } from './site-header.types'

export function SiteHeaderSeparator({ className, ref, ...props }: SiteHeaderSeparatorProps) {
  return <Separator orientation="vertical" className={cn('h-md', className)} ref={ref} {...props} />
}
