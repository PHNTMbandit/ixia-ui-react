import { cn } from '@/utils/cn'

import { useFieldContext } from '../form/form-contexts'
import { fieldLabelVariants } from './field.types'
import type { FieldLabelProps } from './field.types'

const NO_ERRORS = 0

function toTitleCase(str: string): string {
  return str.replace(/(?<letter>[A-Z])/g, ' $<letter>').replace(/^./, (ch) => ch.toUpperCase())
}

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
    isInvalid = field.state.meta.errors.length > NO_ERRORS

  return (
    <label
      className={cn(
        fieldLabelVariants({ size, variant }),
        className,
        isInvalid && 'text-error-on-surface',
      )}
      data-slot="field-label"
      htmlFor={field.name}
      ref={ref}
      {...props}
    >
      {children || toTitleCase(field.name)}
      {showRequired && <span className="ml-3xs text-error-on-surface">*</span>}
    </label>
  )
}
