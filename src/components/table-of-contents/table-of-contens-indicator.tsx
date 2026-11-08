import React from 'react'

import { cn } from '@/utils'

import type { TableOfContensIndicatorProps } from './table-of-contents.types'

export function TableOfContensIndicator({
  className,
  style,
  ref,
  ...props
}: TableOfContensIndicatorProps) {
  const localRef = React.useRef<HTMLSpanElement>(null),
    [rect, setRect] = React.useState({ height: 0, top: 0, visible: false })

  React.useLayoutEffect(() => {
    const container = localRef.current?.parentElement,
      update = () => {
        if (!container) {
          return
        }
        const items = [...container.querySelectorAll<HTMLElement>('[data-in-view="true"]')],
          [first] = items,
          [last] = items.toReversed()
        if (!first || !last) {
          setRect((previous) => ({ ...previous, visible: false }))
          return
        }
        setRect({
          height: last.offsetTop + last.offsetHeight - first.offsetTop,
          top: first.offsetTop,
          visible: true,
        })
      },
      mutationObserver = new MutationObserver(update),
      resizeObserver = new ResizeObserver(update)

    if (container) {
      update()
      mutationObserver.observe(container, {
        attributeFilter: ['data-in-view'],
        childList: true,
        subtree: true,
      })
      resizeObserver.observe(container)
    }

    return () => {
      mutationObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <span
      aria-hidden="true"
      data-visible={rect.visible}
      className={cn(
        'pointer-events-none absolute top-0 left-0 w-[2px] rounded-full bg-brand-default opacity-0 transition-[transform,height,opacity] duration-300 ease-out data-[visible=true]:opacity-100 motion-reduce:transition-none',
        className,
      )}
      style={{ height: rect.height, transform: `translateY(${rect.top}px)`, ...style }}
      ref={(node) => {
        localRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      }}
      {...props}
    />
  )
}
