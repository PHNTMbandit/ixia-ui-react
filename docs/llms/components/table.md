# Table

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

A composition-first data table built on TanStack Table. Every part is a small component you place yourself, so the same pieces build a static list, a searchable directory, a bulk-action list, or a finance ledger.

```text
AppTable
└─ Container
   ├─ TopBar
   │  ├─ Toolbar        Search, FilterMenu, SortMenu, ColumnToggle, ViewModeToggle
   │  ├─ FilterList     Removable chips for active filters
   │  └─ SortList       Removable chips for active sorts
   ├─ Viewport          Header, Body, Footer
   └─ BottomBar         Results, Pagination
```

`Layout` is the outer vertical stack. `Container` is an optional frame, not a required parent for controls. Put bars inside the container to include them in its border, or beside it in a `Layout` to keep them outside. Both stacks provide `gap-md`; containers have no outer margins.

Outlined containers automatically inset their direct `TopBar`, `Toolbar`, and `BottomBar` children. Bars outside a frame and bars in a ghost container stay flush. A toolbar nested in a top bar is not padded twice. Use `className` to override gaps or insets, and use a nested `Layout` when adding your own grouping.

```tsx
<table.AppTable>
  <table.Layout>
    <table.TopBar><table.Toolbar>...</table.Toolbar></table.TopBar>
    <table.Container>
      <table.Viewport><table.Header /><table.Body /></table.Viewport>
    </table.Container>
    <table.BottomBar>...</table.BottomBar>
  </table.Layout>
</table.AppTable>
```

Columns are declared with `createAppColumnHelper`, and cells render through registered cell components such as `cell.TextCell` and `cell.BadgeCell`. Every part is optional: leave out what a situation does not need.

## Import

```tsx
import { TableBody } from 'ixia-ui-react/table'
```

## Runtime exports

- `defaultFilterOperatorLabels`
- `createAppColumnHelper`
- `useAppTable`
- `useCellContext`
- `useHeaderContext`
- `useTableContext`
- `features`
- `TableBody`
- `TableBadgeCell`
- `TableAvatarCell`
- `TableLinkCell`
- `TableBooleanCell`
- `TableCurrencyCell`
- `TablePercentCell`
- `TableProgressCell`
- `TableRelativeTimeCell`
- `TableTagsCell`
- `TableColumnToggle`
- `TableContainer`
- `TableLayout`
- `TableFilterMenu`
- `TableDateFilterForm`
- `TableNumberFilterForm`
- `TableSelectFilterForm`
- `TableStringFilterForm`
- `TableFilterList`
- `TableFirstPage`
- `TableFooter`
- `TableHeader`
- `TableImageCell`
- `TableLastPage`
- `TableBottomBar`
- `TableNextPage`
- `TableNumberCell`
- `TablePagination`
- `TablePaging`
- `TablePreviousPage`
- `TableResults`
- `TableSearch`
- `TableCheckboxCell`
- `TableCheckboxHeader`
- `TableSortMenu`
- `TableSortList`
- `TableSortChip`
- `TableTextCell`
- `TableTopBar`
- `TableViewport`
- `TableDateFilterChip`
- `TableNumberFilterChip`
- `TableSelectFilterChip`
- `TableStringFilterChip`
- `TableToolbar`
- `TableViewModeToggle`
- `TableEmptyMessage`
- `TableEmptyContent`
- `TableEmptyDescription`
- `TableEmptyFooter`
- `TableEmptyHeader`
- `TableEmptyTitle`
- `TableDatasetTab`
- `TableDateTimeCell`
- `dateFilterFn`
- `numberFilterFn`
- `selectFilterFn`
- `stringFilterFn`

## Type exports

- `TableAvatarCellProps`
- `TableLinkCellProps`
- `TableBooleanCellProps`
- `TableCurrencyCellProps`
- `TablePercentCellProps`
- `TableProgressCellProps`
- `TableRelativeTimeCellProps`
- `TableTagsCellProps`
- `TableBadgeCellProps`
- `TableBodyProps`
- `TableChangeViewProps`
- `TableColumnToggleProps`
- `TableContainerProps`
- `TableLayoutProps`
- `TableContentProps`
- `TableDateCellProps`
- `TableDateFilterChipProps`
- `TableDateFilterFormProps`
- `TableNumberFilterChipProps`
- `TableNumberFilterFormProps`
- `TableSelectFilterChipProps`
- `TableSelectFilterFormProps`
- `TableSelectFilterOption`
- `TableSelectFilterValue`
- `TableFilterListProps`
- `TableFilterMenuProps`
- `TableFirstPageProps`
- `TableFooterProps`
- `TableHeaderProps`
- `TableImageCellProps`
- `TableLastPageProps`
- `TableBottomBarProps`
- `TableNextPageProps`
- `TableNumberCellProps`
- `TablePaginationProps`
- `TablePagingProps`
- `TablePreviousPageProps`
- `TableRefreshProps`
- `TableResultsProps`
- `TableRowProps`
- `TableSearchProps`
- `TableCheckboxCellProps`
- `TableCheckboxHeaderProps`
- `TableStringFilterChipProps`
- `TableStringFilterFormProps`
- `TableSortMenuProps`
- `TableTextCellProps`
- `TableTopBarProps`
- `TableViewportProps`
- `TableSortChipProps`
- `TableSortListProps`
- `TableToolbarProps`
- `TableViewModeToggleProps`
- `TableDataset`
- `TableDatasetTabProps`
- `TableEmptyProps`
- `TableEmptyContentProps`
- `TableEmptyDescriptionProps`
- `TableEmptyFooterProps`
- `TableEmptyHeaderProps`
- `TableEmptyTitleProps`
- `TableColumnMeta`
- `TableMeta`
- `ViewMode`
- `FilterOperator`
- `DateFilterOperator`
- `NumberFilterOperator`
- `StringFilterOperator`
- `DateFilterValue`
- `NumberFilterValue`
- `StringFilterValue`

## Optional peer dependencies

`@tanstack/react-table` `@tanstack/react-store` `@tanstack/react-form` `zod`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/table/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/table/table.stories.tsx)
- [Getting started](../guides/getting-started.md)
