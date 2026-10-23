import { createTableHook } from '@tanstack/react-table'

import { TableAvatarCell } from './table-avatar-cell'
import { TableBadgeCell } from './table-badge-cell'
import { TableBody } from './table-body'
import { TableBooleanCell } from './table-boolean-cell'
import { TableBottomBar } from './table-bottom-bar'
import { TableCheckboxCell } from './table-checkbox-cell'
import { TableCheckboxHeader } from './table-checkbox-header'
import { TableColumnToggle } from './table-column-toggle'
import { TableContainer } from './table-container'
import { TableCurrencyCell } from './table-currency-cell'
import { TableDatasetTab } from './table-dataset-tab'
import { TableDateTimeCell } from './table-date-time-cell'
import { TableEmpty } from './table-empty'
import { TableEmptyContent } from './table-empty-content'
import { TableEmptyDescription } from './table-empty-description'
import { TableEmptyFooter } from './table-empty-footer'
import { TableEmptyHeader } from './table-empty-header'
import { TableEmptyTitle } from './table-empty-title'
import { cellContext, features, headerContext, tableContext } from './table-feature-context'
import { TableFilterList } from './table-filter-list'
import { TableFilterMenu } from './table-filter-menu'
import { TableFirstPage } from './table-first-page'
import { TableFooter } from './table-footer'
import { TableHeader } from './table-header'
import { TableImageCell } from './table-image-cell'
import { TableLastPage } from './table-last-page'
import { TableLayout } from './table-layout'
import { TableLinkCell } from './table-link-cell'
import { TableNextPage } from './table-next-page'
import { TableNumberCell } from './table-number-cell'
import { TablePagination } from './table-pagination'
import { TablePaging } from './table-paging'
import { TablePercentCell } from './table-percent-cell'
import { TablePreviousPage } from './table-previous-page'
import { TableProgressCell } from './table-progress-cell'
import { TableRelativeTimeCell } from './table-relative-time-cell'
import { TableResults } from './table-results'
import { TableSearch } from './table-search'
import { TableSortList } from './table-sort-list'
import { TableSortMenu } from './table-sort-menu'
import { TableTagsCell } from './table-tags-cell'
import { TableTextCell } from './table-text-cell'
import { TableToolbar } from './table-toolbar'
import { TableTopBar } from './table-top-bar'
import { TableViewModeToggle } from './table-view-mode-toggle'
import { TableViewport } from './table-viewport'

const { createAppColumnHelper, useAppTable, useTableContext, useCellContext, useHeaderContext } =
  createTableHook({
    cellComponents: {
      AvatarCell: TableAvatarCell,
      BadgeCell: TableBadgeCell,
      BooleanCell: TableBooleanCell,
      CheckboxCell: TableCheckboxCell,
      CurrencyCell: TableCurrencyCell,
      DateTimeCell: TableDateTimeCell,
      ImageCell: TableImageCell,
      LinkCell: TableLinkCell,
      NumberCell: TableNumberCell,
      PercentCell: TablePercentCell,
      ProgressCell: TableProgressCell,
      RelativeTimeCell: TableRelativeTimeCell,
      TagsCell: TableTagsCell,
      TextCell: TableTextCell,
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
    headerComponents: { TableCheckboxHeader },
    headerContext,
    tableComponents: {
      Body: TableBody,
      BottomBar: TableBottomBar,
      ColumnToggle: TableColumnToggle,
      Container: TableContainer,
      DatasetTab: TableDatasetTab,
      Empty: TableEmpty,
      EmptyContent: TableEmptyContent,
      EmptyDescription: TableEmptyDescription,
      EmptyFooter: TableEmptyFooter,
      EmptyHeader: TableEmptyHeader,
      EmptyTitle: TableEmptyTitle,
      FilterList: TableFilterList,
      FilterMenu: TableFilterMenu,
      FirstPage: TableFirstPage,
      Footer: TableFooter,
      Header: TableHeader,
      LastPage: TableLastPage,
      Layout: TableLayout,
      NextPage: TableNextPage,
      Pagination: TablePagination,
      Paging: TablePaging,
      PreviousPage: TablePreviousPage,
      Results: TableResults,
      Search: TableSearch,
      SortList: TableSortList,
      SortMenu: TableSortMenu,
      Toolbar: TableToolbar,
      TopBar: TableTopBar,
      ViewModeToggle: TableViewModeToggle,
      Viewport: TableViewport,
    },
    tableContext,
  })

export { createAppColumnHelper, useAppTable, useTableContext, useCellContext, useHeaderContext }
