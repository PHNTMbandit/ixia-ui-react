import { cn } from '@/utils/cn'

import { useFieldContext } from '../form/form-contexts'
import type { FieldErrorProps } from './field.types'

const NO_ERRORS = 0

export function FieldErrors({ className, children, ref, ...props }: FieldErrorProps) {
  const field = useFieldContext()

  if (field.state.meta.errors.length === NO_ERRORS) {
    return undefined
  }

  return (
    <ul className={cn('space-y-3xs', className)} ref={ref} {...props}>
      {field.state.meta.errors.map((error) => (
        <li
          className="flex items-center gap-2xs style-text-strong--1 text-error-default"
          key={error.message}
        >
          {error.message}
        </li>
      ))}
      {children}
    </ul>
  )
}
