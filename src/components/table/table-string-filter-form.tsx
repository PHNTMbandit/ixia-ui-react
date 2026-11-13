import type { RowData } from '@tanstack/react-table'

import { cn } from '@/utils/cn'

import { Field } from '../field'
import { Form, useAppForm } from '../form'
import { Radio } from '../radio-group'
import { useTableContext } from './table-feature-context'
import {
  defaultFilterOperatorLabels,
  stringFilterOperators,
  stringFilterSchema,
} from './table.types'
import type { TableStringFilterFormProps } from './table.types'
import { asFilterValue } from './table.utils'
import type { StringFilterValue } from './table.utils'

export function TableStringFilterForm<TData extends RowData>({
  column,
  className,
  children,
  ref,
  ...props
}: TableStringFilterFormProps<TData>) {
  const table = useTableContext(),
    filterOperatorLabels = table.options.meta?.translations?.filterOperatorLabels,
    buttonLabels = table.options.meta?.translations?.buttonLabels ?? {
      apply: 'Apply',
      reset: 'Reset',
    },
    currentFilter = asFilterValue<StringFilterValue | undefined>(column.getFilterValue()),
    form = useAppForm({
      defaultValues: {
        filterOperator: currentFilter?.operator ?? 'contains',
        filterValue: currentFilter?.value ?? '',
      },
      onSubmit: ({ value }) => {
        column.setFilterValue({
          operator: value.filterOperator,
          value: value.filterValue,
        } satisfies StringFilterValue)
      },
      validators: {
        onSubmit: stringFilterSchema,
      },
    }),
    onReset = () => {
      column.setFilterValue(undefined)
      form.reset({ filterOperator: 'contains', filterValue: '' })
    }

  return (
    <Form
      onSubmit={async (event) => {
        event.preventDefault()
        event.stopPropagation()
        await form.handleSubmit()
      }}
      onReset={onReset}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      <form.AppForm>
        {children}
        <form.Errors />
        <form.AppField name="filterOperator">
          {(field) => (
            <Field>
              <field.Errors />
              <field.RadioGroup>
                {stringFilterOperators.map((operator) => (
                  <div className="flex w-full flex-col gap-2xs" key={operator}>
                    <Radio value={operator} variant="inSurface">
                      {filterOperatorLabels?.[operator] ?? defaultFilterOperatorLabels[operator]}
                    </Radio>
                    {field.state.value === operator && (
                      <form.AppField name="filterValue">
                        {(valueField) => (
                          <Field>
                            <valueField.Errors />
                            <valueField.Input
                              aria-label={`${column.id} filter value`}
                              variant="secondary"
                            />
                          </Field>
                        )}
                      </form.AppField>
                    )}
                  </div>
                ))}
              </field.RadioGroup>
            </Field>
          )}
        </form.AppField>
        <form.Actions>
          <form.Reset>{buttonLabels.reset}</form.Reset>
          <form.Submit>{buttonLabels.apply}</form.Submit>
        </form.Actions>
      </form.AppForm>
    </Form>
  )
}
