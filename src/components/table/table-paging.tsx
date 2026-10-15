import { DotsThreeIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { Menu, MenuPopup, MenuRadioGroup, MenuRadioItem, MenuTrigger } from '../menu'
import { useTableContext } from './table-feature-context'
import type { TablePagingProps } from './table.types'

const DEFAULT_VISIBLE_START_PAGES = 3,
  DEFAULT_VISIBLE_END_PAGES = 1,
  FIRST_PAGE_INDEX = 0,
  PAGE_NUMBER_OFFSET = 1,
  PAGE_INDEX_INCREMENT = 1,
  MORE_PAGES_MAX_HEIGHT = 200

function getLeadingPageIndexes(minimumPages: number, totalPages: number): number[] {
  const pageIndexes: number[] = []
  for (
    let pageIndex = FIRST_PAGE_INDEX;
    pageIndex < minimumPages && pageIndex < totalPages;
    pageIndex += PAGE_INDEX_INCREMENT
  ) {
    pageIndexes.push(pageIndex)
  }
  return pageIndexes
}

function getOverflowPageIndexes(
  minimumPages: number,
  maximumPages: number,
  totalPages: number,
): number[] {
  const pageIndexes: number[] = []
  for (
    let pageIndex = minimumPages;
    pageIndex < totalPages - maximumPages;
    pageIndex += PAGE_INDEX_INCREMENT
  ) {
    pageIndexes.push(pageIndex)
  }
  return pageIndexes
}

function getTrailingPageIndexes(
  minimumPages: number,
  maximumPages: number,
  totalPages: number,
): number[] {
  const pageIndexes: number[] = []
  for (
    let pageIndex = totalPages - maximumPages;
    pageIndex < totalPages;
    pageIndex += PAGE_INDEX_INCREMENT
  ) {
    if (pageIndex >= minimumPages) {
      pageIndexes.push(pageIndex)
    }
  }
  return pageIndexes
}

function getPageButtonVariant(pageIndex: number, selectedPageIndex: number): 'fill' | 'ghost' {
  if (pageIndex === selectedPageIndex) {
    return 'fill'
  }
  return 'ghost'
}

export function TablePaging({
  min = DEFAULT_VISIBLE_START_PAGES,
  max = DEFAULT_VISIBLE_END_PAGES,
  className,
  children,
  ref,
  ...props
}: TablePagingProps) {
  const table = useTableContext(),
    handleClick = (pageIndex: number) => {
      table.setPageIndex(pageIndex)
    }

  return (
    <table.Subscribe selector={(state) => state.pagination}>
      {(pagination) => {
        const totalPages = table.getPageCount(),
          leadingPageIndexes = getLeadingPageIndexes(min, totalPages),
          overflowPageIndexes = getOverflowPageIndexes(min, max, totalPages),
          trailingPageIndexes = getTrailingPageIndexes(min, max, totalPages)

        return (
          <div className={cn('flex items-center gap-3xs', className)} ref={ref} {...props}>
            {children}
            {leadingPageIndexes.map((pageIndex) => (
              <Button
                key={`page-${pageIndex}`}
                tone="neutral"
                size="iconMedium"
                variant={getPageButtonVariant(pageIndex, pagination.pageIndex)}
                className="shrink-0"
                onClick={() => handleClick(pageIndex)}
              >
                {pageIndex + PAGE_NUMBER_OFFSET}
              </Button>
            ))}
            {totalPages > min + max && (
              <Menu>
                <MenuTrigger>
                  <Button
                    aria-label="Show more pages"
                    tone="neutral"
                    size="iconMedium"
                    variant="ghost"
                    className="shrink-0"
                  >
                    <DotsThreeIcon weight="bold" />
                  </Button>
                </MenuTrigger>
                <MenuPopup align="center">
                  <MenuRadioGroup
                    value={pagination.pageIndex}
                    onValueChange={handleClick}
                    className="overflow-y-auto"
                    style={{ maxHeight: `${MORE_PAGES_MAX_HEIGHT}px` }}
                  >
                    {overflowPageIndexes.map((pageIndex) => (
                      <MenuRadioItem key={pageIndex} value={pageIndex} closeOnClick>
                        {pageIndex + PAGE_NUMBER_OFFSET}
                      </MenuRadioItem>
                    ))}
                  </MenuRadioGroup>
                </MenuPopup>
              </Menu>
            )}
            {trailingPageIndexes.map((pageIndex) => (
              <Button
                key={`last-page-${pageIndex}`}
                tone="neutral"
                size="iconMedium"
                variant={getPageButtonVariant(pageIndex, pagination.pageIndex)}
                className="shrink-0"
                onClick={() => handleClick(pageIndex)}
              >
                {pageIndex + PAGE_NUMBER_OFFSET}
              </Button>
            ))}
          </div>
        )
      }}
    </table.Subscribe>
  )
}
