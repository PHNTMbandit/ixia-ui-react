import {
  constructFilterFn,
  functionalUpdate,
  makeStateUpdater,
  assignTableAPIs,
} from '@tanstack/react-table'
import type { OnChangeFn, TableFeature, Updater } from '@tanstack/react-table'

import type {
  DateFilterOperator,
  NumberFilterOperator,
  StringFilterOperator,
  TableSelectFilterOption,
  TableSelectFilterValue,
  ViewMode,
} from './table.types'

interface DateFilterValue {
  operator: DateFilterOperator
  date: [string, string]
}

interface StringFilterValue {
  operator: StringFilterOperator
  value: string
}

interface NumberFilterValue {
  operator: NumberFilterOperator
  number: [string, string]
}

interface ResolvedDateFilterValue {
  operator: DateFilterOperator
  from: number | undefined
  to: number | undefined
}

interface ResolvedNumberFilterValue {
  operator: NumberFilterOperator
  from: number | undefined
  to: number | undefined
}

interface TableState_ViewMode {
  viewMode: ViewMode
}

interface TableOptions_ViewMode {
  enableViewModeToggle?: boolean
  onViewModeChange?: OnChangeFn<ViewMode>
}

interface Table_ViewMode {
  setViewMode: (updater: Updater<ViewMode>) => void
  toggleViewMode: (value?: ViewMode) => void
}

function getColumnHeaderLabel(column: { id: string; columnDef: { header?: unknown } }): string {
  const { header } = column.columnDef
  if (typeof header === 'string' && header !== '') {
    return header
  }
  return column.id
}

// oxlint-disable-next-line typescript/no-unnecessary-type-parameters
function asFilterValue<TValue>(value: unknown): TValue {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return value as TValue
}

const ZERO = 0,
  FIRST_RANGE_INDEX = 0,
  SECOND_RANGE_INDEX = 1,
  getDateTimestamp = (date: Date): number =>
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  selectFilterFn = constructFilterFn({
    autoRemove: (value: TableSelectFilterValue) => !value?.length,
    filter: (dataValue: TableSelectFilterOption, filterValue: TableSelectFilterValue) =>
      filterValue.includes(dataValue),
  }),
  parseToTimestamp = (value: string): number | undefined => {
    if (!value) {
      return undefined
    }
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) {
      return undefined
    }
    return getDateTimestamp(parsed)
  },
  normalizeDataValue = (value: unknown): number => {
    if (value instanceof Date) {
      return getDateTimestamp(value)
    }
    if (typeof value === 'number') {
      return getDateTimestamp(new Date(value))
    }
    if (typeof value === 'string') {
      return parseToTimestamp(value) ?? ZERO
    }
    return ZERO
  },
  dateFilterFn = constructFilterFn({
    autoRemove: (value: DateFilterValue) =>
      !value || (!value.date[FIRST_RANGE_INDEX] && !value.date[SECOND_RANGE_INDEX]),
    filter: (dataValue: number, filterValue: ResolvedDateFilterValue) => {
      const { operator, from, to } = filterValue

      switch (operator) {
        case 'equals': {
          return from !== undefined && dataValue === from
        }

        case 'notEquals': {
          return from !== undefined && dataValue !== from
        }

        case 'greaterThan': {
          return from !== undefined && dataValue > from
        }

        case 'lessThan': {
          return from !== undefined && dataValue < from
        }

        case 'between': {
          return from !== undefined && to !== undefined && dataValue >= from && dataValue <= to
        }

        default: {
          return true
        }
      }
    },
    resolveDataValue: normalizeDataValue,
    resolveFilterValue: (value: DateFilterValue): ResolvedDateFilterValue => ({
      from: parseToTimestamp(value.date[FIRST_RANGE_INDEX]),
      operator: value.operator,
      to: parseToTimestamp(value.date[SECOND_RANGE_INDEX]),
    }),
  }),
  stringFilterFn = constructFilterFn({
    autoRemove: (value: StringFilterValue) => !value || value.value === '',
    filter: (dataValue: string, filterValue: StringFilterValue) => {
      const { operator, value } = filterValue,
        normalizedDataValue = dataValue.toLocaleLowerCase(),
        normalizedFilterValue = value.toLocaleLowerCase()

      switch (operator) {
        case 'equals': {
          return normalizedDataValue === normalizedFilterValue
        }

        case 'notEquals': {
          return normalizedDataValue !== normalizedFilterValue
        }

        case 'contains': {
          return normalizedDataValue.includes(normalizedFilterValue)
        }

        case 'notContains': {
          return !normalizedDataValue.includes(normalizedFilterValue)
        }

        case 'startsWith': {
          return normalizedDataValue.startsWith(normalizedFilterValue)
        }

        case 'endsWith': {
          return normalizedDataValue.endsWith(normalizedFilterValue)
        }

        default: {
          return true
        }
      }
    },
    resolveDataValue: (value: unknown) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return String(value)
      }
      return ''
    },
  }),
  parseToNumber = (value: string): number | undefined => {
    if (value.trim() === '') {
      return undefined
    }
    const parsed = Number(value)
    if (!Number.isFinite(parsed)) {
      return undefined
    }
    return parsed
  },
  numberFilterFn = constructFilterFn({
    autoRemove: (value: NumberFilterValue) =>
      !value || (value.number[FIRST_RANGE_INDEX] === '' && value.number[SECOND_RANGE_INDEX] === ''),
    filter: (dataValue: number, filterValue: ResolvedNumberFilterValue) => {
      const { operator, from, to } = filterValue

      switch (operator) {
        case 'equals': {
          return from !== undefined && dataValue === from
        }

        case 'notEquals': {
          return from !== undefined && dataValue !== from
        }

        case 'greaterThan': {
          return from !== undefined && dataValue > from
        }

        case 'lessThan': {
          return from !== undefined && dataValue < from
        }

        case 'between': {
          return (from === undefined || dataValue >= from) && (to === undefined || dataValue <= to)
        }

        default: {
          return true
        }
      }
    },
    resolveDataValue: (value: unknown) => Number(value),
    resolveFilterValue: (value: NumberFilterValue): ResolvedNumberFilterValue => {
      const from = parseToNumber(value.number[FIRST_RANGE_INDEX]),
        to = parseToNumber(value.number[SECOND_RANGE_INDEX])

      if (from !== undefined && to !== undefined && from > to) {
        return { from: to, operator: value.operator, to: from }
      }

      return { from, operator: value.operator, to }
    },
  }),
  viewModePlugin: TableFeature = {
    constructTableAPIs: (table) => {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const options = table.options as TableOptions_ViewMode
      assignTableAPIs('viewModePlugin', table, {
        table_setViewMode: {
          fn: (updater: Updater<ViewMode>) => {
            const safeUpdater: Updater<ViewMode> = (old) => {
              const newState = functionalUpdate(updater, old)
              return newState
            }
            return options.onViewModeChange?.(safeUpdater)
          },
        },
        table_toggleViewMode: {
          fn: (value?: ViewMode) => {
            const safeUpdater: Updater<ViewMode> = (old) => {
              if (value) {
                return value
              }
              if (old === 'list') {
                return 'grid'
              }
              return 'list'
            }
            return options.onViewModeChange?.(safeUpdater)
          },
        },
      })
    },

    getDefaultTableOptions: (table) => ({
      enableViewModeToggle: true,
      onViewModeChange: makeStateUpdater('viewMode', table),
    }),

    getInitialState: (initialState) => ({
      viewMode: 'list',
      ...initialState,
    }),
  }

export {
  asFilterValue,
  dateFilterFn,
  getColumnHeaderLabel,
  numberFilterFn,
  selectFilterFn,
  stringFilterFn,
  viewModePlugin,
  type DateFilterValue,
  type NumberFilterValue,
  type StringFilterValue,
  type TableOptions_ViewMode,
  type TableState_ViewMode,
  type Table_ViewMode,
}
