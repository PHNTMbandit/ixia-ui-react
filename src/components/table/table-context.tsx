import { createTableHook } from '@tanstack/react-table'

import { TableBadgeCell } from './table-badge-cell'
import { TableBody } from './table-body'
import { TableCheckboxCell } from './table-checkbox-cell'
import { TableColumnToggle } from './table-column-toggle'
import { TableContainer } from './table-container'
import { TableDateCell } from './table-date-cell'
import { cellContext, features, headerContext, tableContext } from './table-feature-context'
import { TableFilterList } from './table-filter-list'
import { TableFilterMenu } from './table-filter-menu'
import { TableFirstPage } from './table-first-page'
import { TableFooter } from './table-footer'
import { TableHeader } from './table-header'
import { TableImageCell } from './table-image-cell'
import { TableLastPage } from './table-last-page'
import { TableNav } from './table-nav'
import { TableNextPage } from './table-next-page'
import { TableNumberCell } from './table-number-cell'
import { TablePagination } from './table-pagination'
import { TablePaging } from './table-paging'
import { TablePreviousPage } from './table-previous-page'
import { TableSearch } from './table-search'
import { TableSelectHeader } from './table-select-header'
import { TableSortList } from './table-sort-list'
import { TableSortMenu } from './table-sort-menu'
import { TableTextCell } from './table-text-cell'
import { TableToolbar } from './table-toolbar'
import { TableViewModeToggle } from './table-view-mode-toggle'
import { TableViewport } from './table-viewport'

const { createAppColumnHelper, useAppTable, useTableContext, useCellContext, useHeaderContext } =
  createTableHook({
    cellComponents: {
      TableBadgeCell,
      TableCheckboxCell,
      TableDateCell,
      TableImageCell,
      TableNumberCell,
      TableTextCell,
    },
    cellContext,
    features,
    getRowId: (row, index, parent) => {
      if (row.id !== undefined && row.id !== null) {
        return row.id
      }
      if (parent) {
        return `${parent.id}.${index}`
      }
      return String(index)
    },
    headerComponents: { TableSelectHeader },
    headerContext,
    tableComponents: {
      TableBody,
      TableColumnToggle,
      TableContainer,
      TableFilterList,
      TableFilterMenu,
      TableFirstPage,
      TableFooter,
      TableHeader,
      TableLastPage,
      TableNav,
      TableNextPage,
      TablePagination,
      TablePaging,
      TablePreviousPage,
      TableSearch,
      TableSortList,
      TableSortMenu,
      TableToolbar,
      TableViewModeToggle,
      TableViewport,
    },
    tableContext,
  })

export { createAppColumnHelper, useAppTable, useTableContext, useCellContext, useHeaderContext }
