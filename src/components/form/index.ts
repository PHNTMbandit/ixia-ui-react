import { Form as FormRoot } from './form'
import { FormErrors } from './form-errors'
import { FormActions } from './form-footer'
import { FormReset } from './form-reset'
import { FormSubmit } from './form-submit'

const Form = Object.assign(FormRoot, {
  Actions: FormActions,
  Errors: FormErrors,
  Footer: FormActions,
  Reset: FormReset,
  Submit: FormSubmit,
})

export type {
  FormErrorsProps,
  FormFooterProps,
  FormProps,
  FormResetProps,
  FormSubmitProps,
} from './form.types'
export type { FieldLegendProps, FieldSetProps } from '../field/field.types'
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
export { FormActions, FormFooter } from './form-footer'
export { FieldSet } from '../field/field-set'
export { FieldLegend } from '../field/field-legend'

export { Form }
