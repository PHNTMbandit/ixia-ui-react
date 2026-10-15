import { cn } from '@/utils/cn'

import { useCellContext } from './table-feature-context'
import type { TableImageCellProps } from './table.types'

export function TableImageCell({ className, ref, ...props }: TableImageCellProps) {
  const cell = useCellContext<string>()

  return (
    <img
      alt=""
      src={cell.getValue()}
      className={cn('my-xs size-xl', className)}
      ref={ref}
      {...props}
    />
  )
}
