import { OTPField } from '@base-ui/react'
import { useId } from 'react'

import { cn } from '@/utils/cn'

import type { InputOTPProps } from './input-otp.types'

export function InputOTP({ children, className, id, ref, ...props }: InputOTPProps) {
  const generatedId = useId(),
    fieldId = id ?? generatedId
  return (
    <>
      <label htmlFor={fieldId} className="sr-only">
        One-time password
      </label>
      <OTPField.Root
        id={fieldId}
        className={cn('group flex items-center gap-2xs has-disabled:opacity-30', className)}
        ref={ref}
        {...props}
      >
        {children}
      </OTPField.Root>
    </>
  )
}
