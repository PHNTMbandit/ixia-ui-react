import { Form as FormRoot } from './form'
import { FormErrors } from './form-errors'
import { FormFooter } from './form-footer'
import { FormReset } from './form-reset'
import { FormSet } from './form-set'
import { FormSetContent } from './form-set-content'
import { FormSetHeading } from './form-set-heading'
import { FormSubmit } from './form-submit'

const Form = Object.assign(FormRoot, {
  Errors: FormErrors,
  Footer: FormFooter,
  Reset: FormReset,
  Set: FormSet,
  SetContent: FormSetContent,
  SetHeading: FormSetHeading,
  Submit: FormSubmit,
})

export type { FormErrorsProps, FormProps, FormResetProps, FormSubmitProps } from './form.types'
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
export { FormFooter } from './form-footer'
export { FormSet } from './form-set'
export { FormSetContent } from './form-set-content'
export { FormSetHeading } from './form-set-heading'

export { Form }
