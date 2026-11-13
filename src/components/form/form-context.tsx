import { createFormHook } from '@tanstack/react-form'

import {
  FieldCheckbox,
  FieldDescription,
  FieldErrors,
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
import { fieldContext, formContext } from './form-contexts'
import { FormErrors } from './form-errors'
import { FormFooter } from './form-footer'
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
    Errors: FormErrors,
    Footer: FormFooter,
    Reset: FormReset,
    Set: FieldSet,
    SetHeading: FieldLegend,
    Submit: FormSubmit,
  },
  formContext,
})
