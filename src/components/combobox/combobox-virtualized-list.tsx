import { useVirtualizer } from '@tanstack/react-virtual'
import React from 'react'

import { cn } from '@/utils/cn'

import { ComboboxItem } from './combobox-item'
import { useFilteredItems } from './combobox.types'
import type { ComboboxVirtualizedListProps } from './combobox.types'

const DEFAULT_ESTIMATE_SIZE = 32,
  DEFAULT_OVERSCAN = 20,
  PADDING = 8,
  FIRST_POSITION = 1
type TotalSizeStyle = React.CSSProperties & { '--total-size': string }

function renderItem<TItem>(
  children: React.ReactNode | ((item: TItem) => React.ReactNode),
  item: TItem,
) {
  if (typeof children === 'function') {
    return children(item)
  }
  return children
}

export function ComboboxVirtualizedList<TItem>({
  open,
  virtualizerRef,
  estimateSize = DEFAULT_ESTIMATE_SIZE,
  overscan = DEFAULT_OVERSCAN,
  className,
  children,
  ...props
}: ComboboxVirtualizedListProps<TItem>) {
  const filteredItems = useFilteredItems<TItem>(),
    // oxlint-disable-next-line unicorn(no-null)
    scrollElementRef = React.useRef<HTMLDivElement | null>(null),
    // oxlint-disable-next-line react/incompatible-library
    virtualizer = useVirtualizer<HTMLDivElement, HTMLDivElement>({
      count: filteredItems.length,
      directDomUpdates: true,
      enabled: open,
      estimateSize: () => estimateSize,
      getScrollElement: () => scrollElementRef.current,
      overscan,
      paddingEnd: PADDING,
      paddingStart: PADDING,
      scrollPaddingEnd: PADDING,
      scrollPaddingStart: PADDING,
    }),
    handleScrollElementRef = React.useCallback(
      (element: HTMLDivElement | null) => {
        scrollElementRef.current = element
        if (element) {
          virtualizer.measure()
        }
      },
      [virtualizer],
    ),
    totalSize = virtualizer.getTotalSize(),
    totalSizeStyle: TotalSizeStyle = { '--total-size': `${totalSize}px` }

  React.useEffect(() => {
    if (virtualizerRef) {
      virtualizerRef.current = virtualizer
    }
  }, [virtualizer, virtualizerRef])

  return (
    <div
      role="presentation"
      ref={handleScrollElementRef}
      style={totalSizeStyle}
      className={cn(
        'h-[min(22.5rem,var(--total-size))] max-h-(--available-height) scroll-py-3xs overflow-auto overscroll-contain',
        className,
      )}
      {...props}
    >
      <div role="presentation" className="relative w-full" style={{ height: totalSize }}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = filteredItems[virtualItem.index]
          if (!item) {
            return undefined
          }

          return (
            <ComboboxItem
              key={virtualItem.key}
              index={virtualItem.index}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              value={item}
              aria-setsize={filteredItems.length}
              aria-posinset={virtualItem.index + FIRST_POSITION}
              className="first-of-type:mt-0!"
              style={{
                left: 0,
                position: 'absolute',
                top: 0,
                transform: `translateY(${virtualItem.start}px)`,
                width: '100%',
              }}
            >
              {renderItem(children, item)}
            </ComboboxItem>
          )
        })}
      </div>
    </div>
  )
}
