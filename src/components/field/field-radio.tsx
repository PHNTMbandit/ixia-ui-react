import { useFieldContext } from '../form/form-contexts'
import { Radio } from '../radio-group'
import type { FieldRadioProps } from './field.types'

export function FieldRadio({ ...props }: FieldRadioProps) {
  const field = useFieldContext<string>()

  return (
    <Radio
      {...props}
      onChange={(event) => {
        if (event.target instanceof HTMLInputElement) {
          field.handleChange(event.target.value)
        }
      }}
      value={field.state.value}
    />
  )
}
