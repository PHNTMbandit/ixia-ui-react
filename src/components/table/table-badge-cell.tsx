import { cn } from '@/utils/cn'

import { Badge } from '../badge'
import { useCellContext } from './table-feature-context'
import type { TableBadgeCellProps } from './table.types'

function resolveTone(tone: TableBadgeCellProps['tone'], value: string) {
  if (typeof tone === 'function') {
    return tone(value)
  }
  return tone
}

export function TableBadgeCell({ className, children, ref, tone, ...props }: TableBadgeCellProps) {
  const cell = useCellContext<string>(),
    value = cell.getValue(),
    resolvedTone = resolveTone(tone, value)

  return (
    <Badge variant="soft" className={cn('', className)} ref={ref} tone={resolvedTone} {...props}>
      {children}
      {value}
    </Badge>
  )
}
