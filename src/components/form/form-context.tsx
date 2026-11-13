import { createFormHook } from '@tanstack/react-form'

import {
  FieldCheckbox,
  FieldDescription,
  FieldErrors,
  FieldGroup,
  FieldInput,
  FieldInputGroup,
  FieldInputGroupInput,
  FieldLabel,
  FieldRadio,
  FieldRadioGroup,
  FieldSelect,
  FieldSlider,
  FieldSwitch,
  FieldTextArea,
  FieldToggle,
  FieldSet,
  FieldLegend,
} from '../field'
import { FormActions } from './form-actions'
import { fieldContext, formContext } from './form-contexts'
import { FormErrors } from './form-errors'
import { FormReset } from './form-reset'
import { FormSubmit } from './form-submit'

export { fieldContext, formContext, useFieldContext, useFormContext } from './form-contexts'

export const { useAppForm, withFieldGroup, withForm, useTypedAppFormContext } = createFormHook({
  fieldComponents: {
    Checkbox: FieldCheckbox,
    Description: FieldDescription,
    Errors: FieldErrors,
    Input: FieldInput,
    InputGroup: FieldInputGroup,
    InputGroupInput: FieldInputGroupInput,
    Label: FieldLabel,
    Radio: FieldRadio,
    RadioGroup: FieldRadioGroup,
    Select: FieldSelect,
    Slider: FieldSlider,
    Switch: FieldSwitch,
    TextArea: FieldTextArea,
    Toggle: FieldToggle,
  },
  fieldContext,
  formComponents: {
    Actions: FormActions,
    Errors: FormErrors,
    Footer: FormActions,
    Group: FieldGroup,
    Legend: FieldLegend,
    Reset: FormReset,
    Set: FieldSet,
    Submit: FormSubmit,
  },
  formContext,
})
