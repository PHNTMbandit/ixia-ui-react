import type { RowData } from '@tanstack/react-table'

import { cn } from '@/utils/cn'

import { Field } from '../field'
import { Form, useAppForm } from '../form'
import { Radio } from '../radio-group'
import { useTableContext } from './table-feature-context'
import {
  defaultFilterOperatorLabels,
  numberFilterOperators,
  numberFilterSchema,
} from './table.types'
import type { TableNumberFilterFormProps } from './table.types'
import { asFilterValue } from './table.utils'
import type { NumberFilterValue } from './table.utils'

const FROM_VALUE_INDEX = 0,
  TO_VALUE_INDEX = 1

export function TableNumberFilterForm<TData extends RowData>({
  column,
  className,
  children,
  ref,
  ...props
}: TableNumberFilterFormProps<TData>) {
  const table = useTableContext(),
    filterOperatorLabels = table.options.meta?.translations?.filterOperatorLabels,
    buttonLabels = table.options.meta?.translations?.buttonLabels ?? {
      apply: 'Apply',
      reset: 'Reset',
    },
    currentFilter = asFilterValue<NumberFilterValue | undefined>(column.getFilterValue()),
    form = useAppForm({
      defaultValues: {
        filterOperator: currentFilter?.operator ?? 'equals',
        filterValueFrom: currentFilter?.number[FROM_VALUE_INDEX] ?? '',
        filterValueTo: currentFilter?.number[TO_VALUE_INDEX] ?? '',
      },
      onSubmit: ({ value }) => {
        column.setFilterValue({
          number: [value.filterValueFrom, value.filterValueTo],
          operator: value.filterOperator,
        } satisfies NumberFilterValue)
      },
      validators: {
        onSubmit: numberFilterSchema,
      },
    }),
    onReset = () => {
      column.setFilterValue(undefined)
      form.reset({ filterOperator: 'equals', filterValueFrom: '', filterValueTo: '' })
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
        <form.Set>
          <form.SetContent>
            <form.AppField name="filterOperator">
              {(field) => (
                <Field>
                  <field.Errors />
                  <field.RadioGroup>
                    {numberFilterOperators.map((operator) => (
                      <field.Set key={operator}>
                        <Radio value={operator} variant="inSurface">
                          {filterOperatorLabels?.[operator] ??
                            defaultFilterOperatorLabels[operator]}
                        </Radio>
                        {field.state.value === operator && (
                          <>
                            <form.AppField name="filterValueFrom">
                              {(valueField) => (
                                <Field>
                                  <valueField.Errors />
                                  <valueField.Input
                                    aria-label={`${column.id} filter value`}
                                    type="number"
                                    variant="secondary"
                                  />
                                </Field>
                              )}
                            </form.AppField>
                            {operator === 'between' && (
                              <form.AppField name="filterValueTo">
                                {(valueField) => (
                                  <Field>
                                    <valueField.Errors />
                                    <valueField.Input
                                      aria-label={`${column.id} maximum filter value`}
                                      type="number"
                                      variant="secondary"
                                    />
                                  </Field>
                                )}
                              </form.AppField>
                            )}
                          </>
                        )}
                      </field.Set>
                    ))}
                  </field.RadioGroup>
                </Field>
              )}
            </form.AppField>
          </form.SetContent>
        </form.Set>
        <form.Footer>
          <form.Reset>{buttonLabels.reset}</form.Reset>
          <form.Submit>{buttonLabels.apply}</form.Submit>
        </form.Footer>
      </form.AppForm>
    </Form>
  )
}
