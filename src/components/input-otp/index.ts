import { InputOTP as InputOTPRoot } from './input-otp'
import { InputOtpSeparator } from './input-otp-separator'
import { InputOTPSlot } from './input-otp-slot'

const InputOTP = Object.assign(InputOTPRoot, {
  Separator: InputOtpSeparator,
  Slot: InputOTPSlot,
})

export type { InputOTPProps, InputOTPSlotProps, InputOtpSeparatorProps } from './input-otp.types'
export { InputOTPSlot } from './input-otp-slot'
export { InputOtpSeparator } from './input-otp-separator'

export { InputOTP }
