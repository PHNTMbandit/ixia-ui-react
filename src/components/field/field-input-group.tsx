import { cn } from '@/utils/cn'

import { useFieldContext } from '../form/form-contexts'
import { InputGroup } from '../input-group'
import type { FieldInputGroupProps } from './field.types'

const NO_ERRORS = 0

export function FieldInputGroup({ className, ref, ...props }: FieldInputGroupProps) {
  const field = useFieldContext<string>(),
    isInvalid =
      field.state.meta.isTouched &&
      field.state.meta.errors.length > NO_ERRORS &&
      !field.state.meta.isValid

  return (
    <InputGroup
      aria-invalid={isInvalid}
      className={cn('', className)}
      id={field.name}
      ref={ref}
      {...props}
    />
  )
}
