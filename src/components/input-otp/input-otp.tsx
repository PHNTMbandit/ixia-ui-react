import { OTPField } from '@base-ui/react'
import { useId } from 'react'

import { cn } from '@/utils/cn'

import { InputOTPVariantContext } from './input-otp-context'
import type { InputOTPProps } from './input-otp.types'

export function InputOTP({
  children,
  className,
  id,
  ref,
  variant = 'primary',
  ...props
}: InputOTPProps) {
  const generatedId = useId(),
    fieldId = id ?? generatedId
  return (
    <InputOTPVariantContext value={variant}>
      <label htmlFor={fieldId} className="sr-only">
        One-time password
      </label>
      <OTPField.Root
        data-variant={variant}
        id={fieldId}
        className={cn('group flex items-center gap-2xs has-disabled:opacity-30', className)}
        ref={ref}
        {...props}
      >
        {children}
      </OTPField.Root>
    </InputOTPVariantContext>
  )
}
