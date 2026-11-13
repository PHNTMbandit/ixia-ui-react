import type { Button } from '../button'

type FormProps = React.ComponentProps<'form'>
type FormSubmitProps = React.ComponentProps<typeof Button>
type FormResetProps = React.ComponentProps<typeof Button>
type FormErrorsProps = React.ComponentProps<'div'> & {
  headerLabel?: string
}
type FormActionsProps = React.ComponentProps<'div'> & {
  orientation?: 'horizontal' | 'vertical'
}

export type { FormProps, FormSubmitProps, FormResetProps, FormErrorsProps, FormActionsProps }
export type { FieldSetProps, FieldLegendProps } from '../field/field.types'
