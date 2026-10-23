import { cn } from '@/utils'

import { useTableContext } from './table-feature-context'
import type { TableEmptyProps } from './table.types'

const EMPTY_LIMIT = 0

export function TableEmpty({ className, children, ref, ...props }: TableEmptyProps) {
  const table = useTableContext()
  return (
    <table.Subscribe selector={(state) => state.globalFilter}>
      {() =>
        table.getFilteredRowModel().rows.length <= EMPTY_LIMIT && (
          <div
            data-slot="table-empty"
            className={cn(
              'flex w-full min-w-0 flex-col items-center justify-center gap-md px-md py-3xl text-center',
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        )
      }
    </table.Subscribe>
  )
}
