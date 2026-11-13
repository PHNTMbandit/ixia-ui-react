import { Form as FormRoot } from './form'
import { FormActions } from './form-actions'
import { FormErrors } from './form-errors'
import { FormReset } from './form-reset'
import { FormSubmit } from './form-submit'

const Form = Object.assign(FormRoot, {
  Actions: FormActions,
  Errors: FormErrors,
  Reset: FormReset,
  Submit: FormSubmit,
})

export type {
  FormErrorsProps,
  FormActionsProps,
  FormProps,
  FormResetProps,
  FormSubmitProps,
} from './form.types'
export type { FieldGroupProps, FieldLegendProps, FieldSetProps } from '../field/field.types'
export {
  fieldContext,
  formContext,
  useAppForm,
  useFieldContext,
  useFormContext,
  useTypedAppFormContext,
  withFieldGroup,
  withForm,
} from './form-context'
export { FormErrors } from './form-errors'
export { FormReset } from './form-reset'
export { FormSubmit } from './form-submit'
export { FormActions } from './form-actions'
export { FieldGroup } from '../field/field-group'
export { FieldSet } from '../field/field-set'
export { FieldLegend } from '../field/field-legend'

export { Form }
