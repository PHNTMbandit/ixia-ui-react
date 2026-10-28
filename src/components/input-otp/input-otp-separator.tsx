import { OTPField } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import type { InputOtpSeparatorProps } from './input-otp.types'

export function InputOtpSeparator({ className, children, ref, ...props }: InputOtpSeparatorProps) {
  return (
    <OTPField.Separator
      className={cn('flex items-center justify-center text-on-surface-variant', className)}
      ref={ref}
      {...props}
    >
      {children ?? <Icon name="minus" />}
    </OTPField.Separator>
  )
}
