import { cn } from '@/utils/cn'

import { Button } from '../button'
import { Icon } from '../icon'
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

function getPageButtonTone(pageIndex: number, selectedPageIndex: number): 'brand' | 'neutral' {
  if (pageIndex === selectedPageIndex) {
    return 'brand'
  }
  return 'neutral'
}

function getPageButtonVariant(pageIndex: number, selectedPageIndex: number): 'fill' | 'outline' {
  if (pageIndex === selectedPageIndex) {
    return 'fill'
  }
  return 'outline'
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
          <div className={cn('flex items-center gap-2xs', className)} ref={ref} {...props}>
            {children}
            {leadingPageIndexes.map((pageIndex) => (
              <Button
                key={`page-${pageIndex}`}
                tone={getPageButtonTone(pageIndex, pagination.pageIndex)}
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
                    size="medium"
                    variant="outline"
                    className="shrink-0"
                  >
                    <Icon name="ellipsis" />
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
                tone={getPageButtonTone(pageIndex, pagination.pageIndex)}
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
