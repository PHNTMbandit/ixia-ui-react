import { cn } from '@/utils/cn'

import { tableContainerVariants } from './table.types'
import type { TableContainerProps } from './table.types'

export function TableContainer({
  variant = 'outline',
  className,
  ref,
  ...props
}: TableContainerProps) {
  return (
    <div
      data-slot="table-container"
      data-variant={variant}
      className={cn(tableContainerVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  )
}
