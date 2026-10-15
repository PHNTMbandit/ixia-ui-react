import { CaretUpDownIcon } from '@phosphor-icons/react'
import type { RowData } from '@tanstack/react-table'
import { useState } from 'react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { Form, FormFooter } from '../form'
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTitle,
  SelectTrigger,
  SelectValue,
} from '../select'
import { useTableContext } from './table-feature-context'
import type {
  TableSelectFilterFormProps,
  TableSelectFilterOption,
  TableSelectFilterValue,
} from './table.types'

const EMPTY_FILTER_COUNT = 0,
  isSelectFilterOption = (value: unknown): value is TableSelectFilterOption =>
    typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean',
  isSelectFilterValue = (value: unknown): value is TableSelectFilterValue =>
    Array.isArray(value) && value.every(isSelectFilterOption),
  getSelectValueLabel = (value: unknown): string => {
    if (isSelectFilterValue(value)) {
      return value.map(String).join(', ')
    }
    return 'Select values'
  }

export function TableSelectFilterForm<TData extends RowData>({
  column,
  className,
  children,
  ref,
  ...props
}: TableSelectFilterFormProps<TData>) {
  const table = useTableContext(),
    currentFilter = column.getFilterValue(),
    buttonLabels = table.options.meta?.translations?.buttonLabels ?? {
      apply: 'Apply',
      reset: 'Reset',
    },
    [filterValue, setFilterValue] = useState<TableSelectFilterValue>(() => {
      if (isSelectFilterValue(currentFilter)) {
        return currentFilter
      }
      return []
    }),
    options = [...column.getFacetedUniqueValues().keys()]
      .filter(isSelectFilterOption)
      .toSorted((left, right) => String(left).localeCompare(String(right)))

  return (
    <Form
      className={cn('', className)}
      onReset={() => {
        column.setFilterValue(undefined)
        setFilterValue([])
      }}
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()

        if (filterValue.length > EMPTY_FILTER_COUNT) {
          column.setFilterValue(filterValue)
        }
      }}
      ref={ref}
      {...props}
    >
      {children}
      <Select
        multiple
        value={filterValue}
        onValueChange={(value) => {
          if (isSelectFilterValue(value)) {
            setFilterValue(value)
          }
        }}
      >
        <SelectTrigger aria-label={`${column.id} filter value`} variant="secondary">
          <SelectValue placeholder="Select values">
            {(value) => getSelectValueLabel(value)}
          </SelectValue>
          <SelectIcon>
            <CaretUpDownIcon weight="bold" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPopup alignItemWithTrigger={false} sideOffset={8}>
          <SelectList>
            {options.map((option) => (
              <SelectItem key={`${typeof option}:${String(option)}`} value={option}>
                <SelectTitle>{String(option)}</SelectTitle>
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </Select>
      <FormFooter>
        <Button className="w-full" tone="neutral" type="reset" variant="outline">
          {buttonLabels.reset}
        </Button>
        <Button
          className="w-full"
          disabled={filterValue.length === EMPTY_FILTER_COUNT}
          type="submit"
        >
          {buttonLabels.apply}
        </Button>
      </FormFooter>
    </Form>
  )
}
