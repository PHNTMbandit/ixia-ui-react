import type { RowData } from '@tanstack/react-table'

import { cn } from '@/utils/cn'

import { Field } from '../field'
import { Form, useAppForm } from '../form'
import { Radio } from '../radio-group'
import { useTableContext } from './table-feature-context'
import { dateFilterOperators, dateFilterSchema, defaultFilterOperatorLabels } from './table.types'
import type { TableDateFilterFormProps } from './table.types'
import { asFilterValue } from './table.utils'
import type { DateFilterValue } from './table.utils'

const FROM_DATE_INDEX = 0,
  TO_DATE_INDEX = 1

export function TableDateFilterForm<TData extends RowData>({
  column,
  className,
  children,
  ref,
  ...props
}: TableDateFilterFormProps<TData>) {
  const table = useTableContext(),
    filterOperatorLabels = table.options.meta?.translations?.filterOperatorLabels,
    buttonLabels = table.options.meta?.translations?.buttonLabels ?? {
      apply: 'Apply',
      reset: 'Reset',
    },
    currentFilter = asFilterValue<DateFilterValue | undefined>(column.getFilterValue()),
    form = useAppForm({
      defaultValues: {
        filterOperator: currentFilter?.operator ?? 'equals',
        filterValueFrom: currentFilter?.date[FROM_DATE_INDEX] ?? '',
        filterValueTo: currentFilter?.date[TO_DATE_INDEX] ?? '',
      },
      onSubmit: ({ value }) => {
        column.setFilterValue({
          date: [value.filterValueFrom, value.filterValueTo],
          operator: value.filterOperator,
        } satisfies DateFilterValue)
      },
      validators: {
        onSubmit: dateFilterSchema,
      },
    }),
    onReset = () => {
      column.setFilterValue(undefined)
      form.reset()
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
          <form.SetHeading>
            <form.SetContent>
              <Field>
                <form.AppField name="filterOperator">
                  {(field) => (
                    <Field>
                      <field.Errors />
                      <field.RadioGroup>
                        {dateFilterOperators.map((operator) => (
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
                                      <valueField.Input type="date" variant="secondary" />
                                    </Field>
                                  )}
                                </form.AppField>
                                {operator === 'between' && (
                                  <form.AppField name="filterValueTo">
                                    {(valueField) => (
                                      <Field>
                                        <valueField.Errors />
                                        <valueField.Input type="date" variant="secondary" />
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
              </Field>
            </form.SetContent>
          </form.SetHeading>
        </form.Set>
        <form.Footer>
          <form.Reset>{buttonLabels.reset}</form.Reset>
          <form.Submit>{buttonLabels.apply}</form.Submit>
        </form.Footer>
      </form.AppForm>
    </Form>
  )
}
