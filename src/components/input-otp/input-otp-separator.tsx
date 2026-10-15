import { OTPField } from '@base-ui/react'
import { MinusIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import type { InputOtpSeparatorProps } from './input-otp.types'

export function InputOtpSeparator({ className, ref, ...props }: InputOtpSeparatorProps) {
  return (
    <OTPField.Separator
      className={cn('flex items-center justify-center text-on-surface-variant', className)}
      ref={ref}
      {...props}
    >
      <MinusIcon weight="bold" />
    </OTPField.Separator>
  )
}
