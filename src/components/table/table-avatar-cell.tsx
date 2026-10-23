import { cn } from '@/utils'

import { Avatar } from '../avatar'
import { useCellContext } from './table-feature-context'
import type { TableAvatarCellProps } from './table.types'

export function TableAvatarCell({
  fallback,
  className,
  children,
  ref,
  ...props
}: TableAvatarCellProps) {
  const cell = useCellContext<string>(),
    value = cell.getValue()

  return (
    <Avatar className={cn('', className)} ref={ref} {...props}>
      <Avatar.Image src={value} />
      {fallback && <Avatar.Fallback>{fallback}</Avatar.Fallback>}
      {children}
    </Avatar>
  )
}
