import type { OTPField } from '@base-ui/react'
import type { VariantProps } from 'class-variance-authority'

import type { inputVariants } from '../input/input.types'

type InputOTPProps = React.ComponentProps<typeof OTPField.Root> & {
  variant?: NonNullable<VariantProps<typeof inputVariants>['variant']>
}
type InputOTPSlotProps = React.ComponentProps<typeof OTPField.Input>
type InputOtpSeparatorProps = React.ComponentProps<typeof OTPField.Separator>

export type { InputOTPProps, InputOTPSlotProps, InputOtpSeparatorProps }
