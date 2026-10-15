import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

import { cn } from '@/utils/cn'

import type { CollapsibleProps } from './collapsible.types'

export function Collapsible({ className, ref, ...props }: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      className={cn('flex min-h-xl w-full flex-col justify-center gap-xs', className)}
      ref={ref}
      {...props}
    />
  )
}
