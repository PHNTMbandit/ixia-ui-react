import { cn } from '@/utils'

import type { SidebarInsetProps } from './sidebar.types'

export function SidebarInset({ className, children, ref, ...props }: SidebarInsetProps) {
  return (
    <div className={cn('min-h-0 min-w-0 flex-1 overflow-auto', className)} ref={ref} {...props}>
      {children}
    </div>
  )
}
