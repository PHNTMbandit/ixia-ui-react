import { useFieldContext } from '../form/form-contexts'
import { Switch } from '../switch'
import type { FieldSwitchProps } from './field.types'

export function FieldSwitch({ children, ...props }: FieldSwitchProps) {
  const field = useFieldContext<boolean>()

  return (
    <Switch
      checked={field.state.value}
      id={field.name}
      name={field.name}
      onCheckedChange={(checked) => field.handleChange(checked)}
      {...props}
    >
      {children}
    </Switch>
  )
}
