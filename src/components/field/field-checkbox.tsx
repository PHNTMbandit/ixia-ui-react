import { Checkbox } from '../checkbox'
import { useFieldContext } from '../form/form-contexts'
import { Label } from '../label'
import type { FieldCheckboxProps } from './field.types'

export function FieldCheckbox({ ...props }: FieldCheckboxProps) {
  const field = useFieldContext<boolean>()

  return (
    <div className="flex items-center gap-xs">
      <Checkbox
        checked={field.state.value}
        id={field.name}
        name={field.name}
        onCheckedChange={(checked) => field.handleChange(checked)}
        {...props}
      />
      {props.label && <Label htmlFor={field.name}>{props.label}</Label>}
    </div>
  )
}
