import React from 'react'

import { cn } from '@/utils'

import { useTableOfContents } from './table-of-contents'
import { tableOfContentsItemVariants } from './table-of-contents.types'
import type { TableOfContentsItemProps } from './table-of-contents.types'

const VISIBILITY_THRESHOLD = 0

export function TableOfContentsItem({
  depth,
  targetId,
  visibilityThreshold = VISIBILITY_THRESHOLD,
  className,
  children,
  ref,
  onClick,
  ...props
}: TableOfContentsItemProps) {
  const [visibility, setVisibility] = React.useState({ inView: false, targetId }),
    inView = visibility.targetId === targetId && visibility.inView,
    { scrollToElement } = useTableOfContents()

  React.useEffect(() => {
    const element = document.getElementById(targetId),
      observer = new IntersectionObserver(
        ([entry]) => {
          setVisibility({
            inView: entry.isIntersecting && entry.intersectionRatio >= visibilityThreshold,
            targetId,
          })
        },
        { threshold: visibilityThreshold },
      )

    if (element) {
      observer.observe(element)
    } else {
      console.warn(`TableOfContents.Item could not find a target with ID "${targetId}"`)
    }

    return () => observer.disconnect()
  }, [targetId, visibilityThreshold])

  return (
    <button
      type="button"
      data-in-view={inView}
      className={cn(tableOfContentsItemVariants({ depth }), className)}
      ref={ref}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          scrollToElement(targetId)
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
}
