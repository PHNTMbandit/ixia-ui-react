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
        <form.FormErrors />
        <form.FormSet>
          <form.FormSetContent>
            <form.AppField name="filterOperator">
              {(field) => (
                <Field>
                  <field.FieldErrors />
                  <field.FieldRadioGroup>
                    {numberFilterOperators.map((operator) => (
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
                                  <valueField.FieldInput
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
                                    <valueField.FieldErrors />
                                    <valueField.FieldInput
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
                      </field.FieldSet>
                    ))}
                  </field.FieldRadioGroup>
                </Field>
              )}
            </form.AppField>
          </form.FormSetContent>
        </form.FormSet>
        <form.FormFooter>
          <form.FormReset>{buttonLabels.reset}</form.FormReset>
          <form.FormSubmit>{buttonLabels.apply}</form.FormSubmit>
        </form.FormFooter>
      </form.AppForm>
    </Form>
  )
}
