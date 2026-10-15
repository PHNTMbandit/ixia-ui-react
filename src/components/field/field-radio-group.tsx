import { useFieldContext } from '../form/form-contexts'
import { RadioGroup } from '../radio-group'
import type { FieldRadioGroupProps } from './field.types'

export function FieldRadioGroup({ ...props }: FieldRadioGroupProps) {
  const field = useFieldContext<string>()

  return (
    <RadioGroup
      name={field.name}
      onValueChange={(value) => field.handleChange(String(value))}
      value={field.state.value}
      {...props}
    />
  )
}
