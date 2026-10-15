import { useTableContext } from './table-feature-context'
import type { TableResultsProps } from './table.types'

const EMPTY_ROW_COUNT = 0,
  PAGE_NUMBER_OFFSET = 1

function getPageStart(totalRows: number, pageIndex: number, pageSize: number): number {
  if (totalRows === EMPTY_ROW_COUNT) {
    return EMPTY_ROW_COUNT
  }
  return pageIndex * pageSize + PAGE_NUMBER_OFFSET
}

function getPageEnd(start: number, pageSize: number, totalRows: number): number {
  if (totalRows === EMPTY_ROW_COUNT) {
    return EMPTY_ROW_COUNT
  }
  return Math.min(start + pageSize - PAGE_NUMBER_OFFSET, totalRows)
}

export function TableResults({ children }: TableResultsProps) {
  const table = useTableContext(),
    { pageIndex } = table.state.pagination,
    { pageSize } = table.state.pagination,
    totalRows = table.getFilteredRowModel().rows.length,
    start = getPageStart(totalRows, pageIndex, pageSize),
    end = getPageEnd(start, pageSize, totalRows)

  return children(start, end, totalRows)
}
