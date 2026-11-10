import { createContext, useContext } from 'react'

import type { InputOTPProps } from './input-otp.types'

const InputOTPVariantContext = createContext<NonNullable<InputOTPProps['variant']>>('primary'),
  useInputOTPVariant = () => useContext(InputOTPVariantContext)

export { InputOTPVariantContext, useInputOTPVariant }
