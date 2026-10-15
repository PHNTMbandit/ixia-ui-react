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
    FieldCheckbox,
    FieldDescription,
    FieldErrors,
    FieldInput,
    FieldInputGroup,
    FieldInputGroupInput,
    FieldLabel,
    FieldRadio,
    FieldRadioGroup,
    FieldRow,
    FieldSelect,
    FieldSet,
    FieldSlider,
    FieldSwitch,
    FieldTextArea,
    FieldToggle,
  },
  fieldContext,
  formComponents: {
    FormErrors,
    FormFooter,
    FormReset,
    FormSet,
    FormSetContent,
    FormSetHeading,
    FormSubmit,
  },
  formContext,
})
