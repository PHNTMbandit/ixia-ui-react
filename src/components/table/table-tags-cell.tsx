import { cn } from '@/utils/cn'

import { Badge } from '../badge'
import { useCellContext } from './table-feature-context'
import type { TableTagsCellProps } from './table.types'

export function TableTagsCell({ badgeProps, className, children, ...props }: TableTagsCellProps) {
  const cell = useCellContext<readonly string[] | null | undefined>(),
    value = cell.getValue()

  if (value === undefined || value === null) {
    return undefined
  }

  return (
    <div className={cn('flex flex-wrap gap-3xs', className)} {...props}>
      {children}
      {value.map((tag, index) => (
        // oxlint-disable-next-line react/no-array-index-key -- Labels may repeat; badges have no local state.
        <Badge key={`${index}-${tag}`} variant="soft" {...badgeProps}>
          {tag}
        </Badge>
      ))}
    </div>
  )
}
