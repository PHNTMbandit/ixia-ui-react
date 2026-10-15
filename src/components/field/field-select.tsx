import { useFieldContext } from '../form/form-contexts'
import { Select } from '../select'
import type { FieldSelectProps } from './field.types'

export function FieldSelect({ children, ...props }: FieldSelectProps) {
  const field = useFieldContext()

  return (
    <Select value={field.state.value} onValueChange={(value) => field.setValue(value)} {...props}>
      {children}
    </Select>
  )
}
