import type { Column, RowData, TableFeature, TableFeatures } from '@tanstack/react-table'
import type { VariantProps } from 'class-variance-authority'
import { z } from 'zod'

import type { BadgeProps } from '../badge'
import type { Button } from '../button'
import type { Checkbox } from '../checkbox'
import type { inputVariants } from '../input/input.types'
import type { MenuTrigger } from '../menu'
import type { features } from './table-feature-context'
import type { Table_ViewMode, TableOptions_ViewMode, TableState_ViewMode } from './table.utils'

type TableFirstPageProps = React.ComponentProps<typeof Button>
type TableFooterProps = React.ComponentProps<'tfoot'>
type TableHeaderProps = React.ComponentProps<'thead'>
type TableLastPageProps = React.ComponentProps<typeof Button>
type TablePaginationProps = React.ComponentProps<'div'> & {
  truncateFrom?: number
  truncateTo?: number
}
type TableNextPageProps = React.ComponentProps<typeof Button>
type TableResultsProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  children: (start: number, end: number, totalRows: number) => React.ReactElement
}
type TablePreviousPageProps = React.ComponentProps<typeof Button>
type TableRefreshProps = React.ComponentProps<typeof Button>
type TableSearchProps = React.ComponentProps<'input'> & VariantProps<typeof inputVariants>
type TableColumnToggleProps = React.ComponentProps<typeof MenuTrigger>
type TableRowProps = React.ComponentProps<'tr'>
type TableBodyProps = React.ComponentProps<'tbody'> & {
  showDivider?: boolean
}
type TableNavProps = React.ComponentProps<'div'> & {
  sticky?: boolean
}
type TableContentProps = React.ComponentProps<'div'>
type TablePagingProps = React.ComponentProps<'div'> & {
  min?: number
  max?: number
}
type TableContainerProps = React.ComponentProps<'div'>
type TableToolbarProps = React.ComponentProps<'div'> & {
  sticky?: boolean
}
type TableViewModeToggleProps = Omit<React.ComponentProps<typeof Button>, 'children'> & {
  children: (isGridView: boolean) => React.ReactNode
}
type TableFilterMenuProps = React.ComponentProps<'button'>
type TableFilterListProps = React.ComponentProps<'div'>
type TableDateFilterFormProps<TData extends RowData> = React.ComponentProps<'form'> & {
  column: Column<typeof features, TData>
}
type TableDateFilterChipProps<TData extends RowData> = React.ComponentProps<'button'> & {
  column: Column<typeof features, TData>
}
type TableStringFilterFormProps<TData extends RowData> = React.ComponentProps<'form'> & {
  column: Column<typeof features, TData>
}
type TableStringFilterChipProps<TData extends RowData> = React.ComponentProps<'button'> & {
  column: Column<typeof features, TData>
}
type TableNumberFilterFormProps<TData extends RowData> = React.ComponentProps<'form'> & {
  column: Column<typeof features, TData>
}
type TableNumberFilterChipProps<TData extends RowData> = React.ComponentProps<'button'> & {
  column: Column<typeof features, TData>
}
type TableSelectFilterFormProps<TData extends RowData> = React.ComponentProps<'form'> & {
  column: Column<typeof features, TData>
}
type TableSelectFilterChipProps<TData extends RowData> = React.ComponentProps<'button'> & {
  column: Column<typeof features, TData>
}
type TableSelectFilterOption = string | number | boolean
type TableSelectFilterValue = TableSelectFilterOption[]

type TableSortChipProps<TData extends RowData> = React.ComponentProps<'button'> & {
  column: Column<typeof features, TData>
}

type TableSortMenuProps = React.ComponentProps<typeof MenuTrigger>
type TableChangeViewProps = React.ComponentProps<typeof Button>
type TableCheckboxCellProps = React.ComponentProps<typeof Checkbox>
type TableSelectHeaderProps = React.ComponentProps<typeof Checkbox>
type TableTextCellProps = React.ComponentProps<'span'>
type TableDateCellProps = React.ComponentProps<'span'>
type TableNumberCellProps = React.ComponentProps<'span'>
type TableImageCellProps = React.ComponentProps<'img'>
type TableViewportProps = React.ComponentProps<'table'>
type TableSortListProps = React.ComponentProps<'div'>
type TableBadgeCellProps = Omit<BadgeProps, 'tone'> & {
  tone?: BadgeProps['tone'] | ((value: string) => BadgeProps['tone'])
}

const stringFilterOperators = [
    'equals',
    'notEquals',
    'contains',
    'notContains',
    'startsWith',
    'endsWith',
  ] as const,
  numberFilterOperators = ['equals', 'notEquals', 'greaterThan', 'lessThan', 'between'] as const,
  dateFilterOperators = ['equals', 'notEquals', 'greaterThan', 'lessThan', 'between'] as const,
  defaultFilterOperatorLabels = {
    between: 'Is between',
    contains: 'Contains',
    endsWith: 'Ends with',
    equals: 'Is',
    greaterThan: 'Is greater than',
    lessThan: 'Is less than',
    notContains: 'Does not contain',
    notEquals: 'Is not',
    startsWith: 'Starts with',
  } satisfies Record<FilterOperator, string>,
  dateFilterSchema = z.object({
    filterOperator: z.enum(dateFilterOperators),
    filterValueFrom: z.union([z.literal(''), z.iso.date()]),
    filterValueTo: z.union([z.literal(''), z.iso.date()]),
  }),
  stringFilterSchema = z.object({
    filterOperator: z.enum(stringFilterOperators),
    filterValue: z.string(),
  }),
  numberFilterSchema = z.object({
    filterOperator: z.enum(numberFilterOperators),
    filterValueFrom: z.string(),
    filterValueTo: z.string(),
  })

type DateFilterOperator = (typeof dateFilterOperators)[number]
type StringFilterOperator = (typeof stringFilterOperators)[number]
type NumberFilterOperator = (typeof numberFilterOperators)[number]
type FilterOperator = StringFilterOperator | NumberFilterOperator

type ViewMode = 'list' | 'grid'

interface TableColumnMeta {
  filterVariant?: 'range' | 'select' | 'date' | 'string' | 'number'
}

interface TableMeta {
  translations?: {
    filterOperatorLabels?: Partial<Record<FilterOperator, string>>
    buttonLabels?: {
      reset?: string
      apply?: string
      ascending?: string
      descending?: string
    }
  }
}

declare module '@tanstack/react-table' {
  interface Plugins {
    viewModePlugin: TableFeature
  }

  interface TableState_FeatureMap {
    viewModePlugin: TableState_ViewMode
  }

  interface TableOptions_FeatureMap<TFeatures extends TableFeatures, TData extends RowData> {
    viewModePlugin: TableOptions_ViewMode
  }

  interface Table_FeatureMap<TFeatures extends TableFeatures, TData extends RowData> {
    viewModePlugin: Table_ViewMode
  }
}

export {
  dateFilterOperators,
  dateFilterSchema,
  defaultFilterOperatorLabels,
  numberFilterOperators,
  numberFilterSchema,
  stringFilterOperators,
  stringFilterSchema,
  type DateFilterOperator,
  type FilterOperator,
  type NumberFilterOperator,
  type StringFilterOperator,
  type TableBadgeCellProps,
  type TableBodyProps,
  type TableChangeViewProps,
  type TableCheckboxCellProps,
  type TableColumnMeta,
  type TableColumnToggleProps,
  type TableContainerProps,
  type TableContentProps,
  type TableDateCellProps,
  type TableDateFilterChipProps,
  type TableDateFilterFormProps,
  type TableFilterListProps,
  type TableFilterMenuProps,
  type TableFirstPageProps,
  type TableFooterProps,
  type TableHeaderProps,
  type TableImageCellProps,
  type TableLastPageProps,
  type TableNavProps,
  type TableNextPageProps,
  type TableNumberCellProps,
  type TableNumberFilterChipProps,
  type TableNumberFilterFormProps,
  type TablePaginationProps,
  type TablePagingProps,
  type TablePreviousPageProps,
  type TableRefreshProps,
  type TableResultsProps,
  type TableRowProps,
  type TableSearchProps,
  type TableSelectFilterChipProps,
  type TableSelectFilterFormProps,
  type TableSelectFilterOption,
  type TableSelectFilterValue,
  type TableSelectHeaderProps,
  type TableSortChipProps,
  type TableSortListProps,
  type TableSortMenuProps,
  type TableStringFilterChipProps,
  type TableStringFilterFormProps,
  type TableTextCellProps,
  type TableToolbarProps,
  type TableViewportProps,
  type TableViewModeToggleProps,
  type TableMeta,
  type ViewMode,
}
