import { cn } from '@/utils'

import type { TableOfContentsTitleProps } from './table-of-contents.types'

export function TableOfContentsTitle({
  className,
  children,
  ref,
  ...props
}: TableOfContentsTitleProps) {
  return (
    <span
      className={cn(
        'flex items-center gap-2xs pb-xs text-base leading-none font-medium text-box-trim [&>svg]:size-md',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
}
