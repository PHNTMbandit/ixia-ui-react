import { Checkbox } from '../checkbox'
import { useFieldContext } from '../form/form-contexts'
import type { FieldCheckboxProps } from './field.types'

export function FieldCheckbox({ children, ...props }: FieldCheckboxProps) {
  const field = useFieldContext<boolean>()

  return (
    <Checkbox
      checked={field.state.value}
      id={field.name}
      name={field.name}
      onCheckedChange={(checked) => field.handleChange(checked)}
      {...props}
    >
      {children}
    </Checkbox>
  )
}
