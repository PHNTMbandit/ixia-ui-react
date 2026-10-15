import { cn } from '@/utils/cn'

import { useFieldContext } from '../form/form-contexts'
import { TextArea } from '../text-area'
import type { FieldTextAreaProps } from './field.types'

const NO_ERRORS = 0

export function FieldTextArea({ className, ref, ...props }: FieldTextAreaProps) {
  const field = useFieldContext<string>(),
    isInvalid =
      field.state.meta.isTouched &&
      field.state.meta.errors.length > NO_ERRORS &&
      !field.state.meta.isValid

  return (
    <TextArea
      aria-invalid={isInvalid}
      className={cn('', className)}
      id={field.name}
      name={field.name}
      onChange={(event) => field.handleChange(event.target.value)}
      ref={ref}
      value={field.state.value}
      {...props}
    />
  )
}
