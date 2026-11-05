import { createContext, useContext } from 'react'

import type { ButtonGroupProps } from './button-group.types'

type ButtonGroupContextValue = Pick<ButtonGroupProps, 'size' | 'tone' | 'variant'>

const ButtonGroupContext = createContext<ButtonGroupContextValue | undefined>(undefined),
  useButtonGroupContext = () => useContext(ButtonGroupContext)

export { ButtonGroupContext, useButtonGroupContext }
