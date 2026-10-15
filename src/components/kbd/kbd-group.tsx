import { cn } from '@/utils/cn'

import type { KbdGroupProps } from './kbd.types'

export function KbdGroup({ className, ref, ...props }: KbdGroupProps) {
  return (
    <div
      className={cn('flex items-center justify-center gap-2xs', className)}
      ref={ref}
      {...props}
    />
  )
}
