import { cn } from '@/utils'

import { TableOfContensIndicator } from './table-of-contens-indicator'
import type { TableOfContentsListProps } from './table-of-contents.types'

export function TableOfContentsList({
  className,
  children,
  ref,
  ...props
}: TableOfContentsListProps) {
  return (
    <div
      className={cn(
        "relative ml-3xs flex flex-col before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:rounded-full before:bg-border before:content-['']",
        className,
      )}
      ref={ref}
      {...props}
    >
      <TableOfContensIndicator />
      {children}
    </div>
  )
}
