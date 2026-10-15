import { OTPField } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { InputOTPSlotProps } from './input-otp.types'

export function InputOTPSlot({ className, ...props }: InputOTPSlotProps) {
  return (
    <OTPField.Input
      className={cn(
        'relative h-lg w-md rounded-md bg-surface text-center style-text-default-0 shadow-2xs outline outline-transparent transition-colors hover:outline-border-strong focus:outline-brand-border-strong',
        className,
      )}
      {...props}
    />
  )
}
