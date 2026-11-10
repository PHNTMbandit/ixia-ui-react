import { cn } from '@/utils/cn'

import { useFieldContext } from '../form/form-contexts'
import { fieldLabelVariants } from './field.types'
import type { FieldLabelProps } from './field.types'

const NO_ERRORS = 0

export function FieldLabel({
  size,
  variant,
  showRequired = false,
  className,
  children,
  ref,
  ...props
}: FieldLabelProps) {
  const field = useFieldContext(),
    fieldName = field.name
      .replace(/(?<letter>[A-Z])/g, ' $<letter>')
      .replace(/^./, (str) => str.toUpperCase()),
    isInvalid = field.state.meta.errors.length > NO_ERRORS

  return (
    <div
      className={cn(
        fieldLabelVariants({ size, variant }),
        className,
        isInvalid && 'text-error-on-surface',
      )}
      ref={ref}
      {...props}
    >
      {children || fieldName}
      {showRequired && <span className="ml-3xs text-error-on-surface">*</span>}
    </div>
  )
}
