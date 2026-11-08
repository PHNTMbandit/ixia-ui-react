import React from 'react'

import { cn } from '@/utils'

import type { TableOfContentsProps } from './table-of-contents.types'

interface TableOfContentsContextValue {
  scrollToElement: (targetId: string) => void
  scrollOptions?: ScrollIntoViewOptions
}

const TableOfContentsContext = React.createContext<TableOfContentsContextValue | undefined>(
  undefined,
)

function TableOfContents({
  className,
  children,
  ref,
  scrollOptions,
  ...props
}: TableOfContentsProps) {
  const handleScrollToElement = (targetId: string) => {
    const element = document.getElementById(targetId)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', ...scrollOptions })
    }
  }

  return (
    <TableOfContentsContext.Provider
      value={{ scrollOptions, scrollToElement: handleScrollToElement }}
    >
      <div className={cn('', className)} ref={ref} {...props}>
        {children}
      </div>
    </TableOfContentsContext.Provider>
  )
}

function useTableOfContents() {
  const context = React.useContext(TableOfContentsContext)

  if (!context) {
    throw new Error('TableOfContents.Item must be used within a TableOfContents')
  }

  return context
}

export { TableOfContents, useTableOfContents }
