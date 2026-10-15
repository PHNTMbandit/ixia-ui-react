import { cn } from '@/utils/cn'

import type { LayerTreeFooterProps } from './layer-tree.types'

export function LayerTreeFooter({ className, ref, ...props }: LayerTreeFooterProps) {
  return <div className={cn('flex flex-col gap-3xs', className)} ref={ref} {...props} />
}
