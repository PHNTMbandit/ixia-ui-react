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
  FieldSet,
  FieldSlider,
  FieldSwitch,
  FieldTextArea,
  FieldToggle,
} from '../field'
import { FieldRow } from '../field/field-row'
import { fieldContext, formContext } from './form-contexts'
import { FormErrors } from './form-errors'
import { FormFooter } from './form-footer'
import { FormReset } from './form-reset'
import { FormSet } from './form-set'
import { FormSetContent } from './form-set-content'
import { FormSetHeading } from './form-set-heading'
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
    Row: FieldRow,
    Select: FieldSelect,
    Set: FieldSet,
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
    Set: FormSet,
    SetContent: FormSetContent,
    SetHeading: FormSetHeading,
    Submit: FormSubmit,
  },
  formContext,
})
