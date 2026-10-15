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
        <form.FormErrors />
        <form.FormSet>
          <form.FormSetHeading>
            <form.FormSetContent>
              <Field>
                <form.AppField name="filterOperator">
                  {(field) => (
                    <Field>
                      <field.FieldErrors />
                      <field.FieldRadioGroup>
                        {dateFilterOperators.map((operator) => (
                          <field.FieldSet key={operator}>
                            <Radio value={operator} variant="inSurface">
                              {filterOperatorLabels?.[operator] ??
                                defaultFilterOperatorLabels[operator]}
                            </Radio>
                            {field.state.value === operator && (
                              <>
                                <form.AppField name="filterValueFrom">
                                  {(valueField) => (
                                    <Field>
                                      <valueField.FieldErrors />
                                      <valueField.FieldInput type="date" variant="secondary" />
                                    </Field>
                                  )}
                                </form.AppField>
                                {operator === 'between' && (
                                  <form.AppField name="filterValueTo">
                                    {(valueField) => (
                                      <Field>
                                        <valueField.FieldErrors />
                                        <valueField.FieldInput type="date" variant="secondary" />
                                      </Field>
                                    )}
                                  </form.AppField>
                                )}
                              </>
                            )}
                          </field.FieldSet>
                        ))}
                      </field.FieldRadioGroup>
                    </Field>
                  )}
                </form.AppField>
              </Field>
            </form.FormSetContent>
          </form.FormSetHeading>
        </form.FormSet>
        <form.FormFooter>
          <form.FormReset>{buttonLabels.reset}</form.FormReset>
          <form.FormSubmit>{buttonLabels.apply}</form.FormSubmit>
        </form.FormFooter>
      </form.AppForm>
    </Form>
  )
}
