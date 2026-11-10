import { OTPField } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { inputSurfaceVariants } from '../input/input.types'
import { useInputOTPVariant } from './input-otp-context'
import type { InputOTPSlotProps } from './input-otp.types'

export function InputOTPSlot({ className, ...props }: InputOTPSlotProps) {
  const variant = useInputOTPVariant()
  return (
    <OTPField.Input
      className={cn(
        'relative h-lg min-target w-md rounded-md text-center style-text-default-0 outline outline-transparent transition-colors hover:outline-border-strong focus:outline-brand-border-strong',
        inputSurfaceVariants[variant],
        className,
      )}
      {...props}
    />
  )
}
