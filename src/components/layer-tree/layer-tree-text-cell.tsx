import { cn } from '@/utils/cn'

import { useCellContext } from './layer-tree-context'
import { layerTreeTextCellVariants } from './layer-tree.types'
import type { LayerTreeTextCellProps } from './layer-tree.types'

export function LayerTreeTextCell({
  size,
  className,
  children,
  ref,
  ...props
}: LayerTreeTextCellProps) {
  const cell = useCellContext<string>()

  return (
    <span className={cn(layerTreeTextCellVariants({ className, size }))} ref={ref} {...props}>
      {children}
      {cell.getValue()}
    </span>
  )
}
